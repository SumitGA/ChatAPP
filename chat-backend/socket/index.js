const socketIo = require('socket.io')
const { sequelize } = require('../models')
const Message = require('../models').Message

const users = new Map()
const userSockets = new Map()

const SocketServer = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: '*',
      methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    },
  })

  io.on('connection', (socket) => {
    socket.on('join', async (user) => {
      let sockets = []

      if (users.has(user.id)) {
        const existingUser = users.get(user.id)
        existingUser.sockets = [...existingUser.sockets, ...[socket.id]]
        users.set(user.id, existingUser)
        sockets = [...existingUser.sockets, ...[socket.id]]
        userSockets.set(socket.id, user.id)
      } else {
        users.set(user.id, { id: user.id, sockets: [socket.id] })
        sockets.push(socket.id)
        userSockets.set(socket.id, user.id)
      }

      const onlineFriends = [] //ids

      const chatters = await getChatters(user.id) //query

      console.log(chatters)

      // Notify his friends that user is now online
      for (let i = 0; i < chatters.length; i++) {
        if (users.has(chatters[i])) {
          const chatter = users.get(chatters[i])
          chatter.sockets.forEach((socket) => {
            try {
              io.to(socket).emit('online', user)
            } catch (err) {
              throw err
            }
          })
          onlineFriends.push(chatter.id)
        }
      }

      // send to user sockets which of his friends are online
      sockets.forEach((socket) => {
        try {
          io.to(socket).emit('friends', onlineFriends)
        } catch (err) {
          throw err
        }
      })
      console.log('New User joins', user.firstName)
      io.to(socket.id).emit('typing', 'User typing...')
    })

    socket.on('message', async (message) => {
      let sockets = []
      if (users.has(message.fromUser.id)) {
        sockets = users.get(message.fromUser.id).sockets
      }

      message.toUserId.forEach((id) => {
        if (users.has(id)) {
          sockets = [...sockets, ...users.get(id).sockets]
        }
      })

      try {
        const msg = {
          type: message.type,
          fromUserId: message.fromUser.id,
          chatId: message.chatId,
          message: message.message,
        }

        await Message.create(msg)

        message.User = message.fromUser
        message.fromUserId = message.fromUser.id
        delete message.fromUser

        sockets.forEach((socket) => {
          io.to(socket).emit('received', message)
        })
      } catch (err) {}
    })

    socket.on('disconnect', async () => {
      if (userSockets.has(socket.id)) {
        const user = users.get(userSockets.get(socket.id))

        if (user.sockets.length > 1) {
          user.sockets = user.sockets.filter((sock) => {
            if (sock !== socket.id) return true

            userSockets.delete(sock)
            return false
          })

          users.set(user.id, user)
        } else {
          const chatters = await getChatters(user.id)

          // Notify his friends that user is now offline
          for (let i = 0; i < chatters.length; i++) {
            if (users.has(chatters[i])) {
              users.get(chatters[i]).sockets.forEach((socket) => {
                try {
                  io.to(socket).emit('offline', user)
                } catch (err) {
                  throw err
                }
              })
            }
          }

          userSockets.delete(socket.id)
          users.delete(user.id)
        }
      }
    })
  })
}

// Execute raw query
const getChatters = async (userId) => {
  try {
    const [results, metadata] = await sequelize.query(`
      select "cu"."userId" from "ChatUsers" as cu
      inner join(
        select "c"."id" from "Chats" as c
        where exists(
          select "u"."id" from "Users" as u
          inner join "ChatUsers" on u.id = "ChatUsers"."userId"
          where u.id = ${parseInt(userId)}  and c.id = "ChatUsers"."chatId"
        )
      ) as cjoin on cjoin.id = "cu"."chatId"
      where "cu"."userId" != ${parseInt(userId)}
    `)

    return results.length > 0 ? results.map((el) => el.userId) : []
  } catch (err) {
    console.log(err)
    return []
  }
}
module.exports = SocketServer
