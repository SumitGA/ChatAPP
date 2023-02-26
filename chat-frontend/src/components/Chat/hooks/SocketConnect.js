import { useEffect } from 'react'
import socketIOClient from 'socket.io-client'
import {
  fetchChats,
  onlineFriends,
  onlineFriend,
  offlineFriend,
} from '../../../store/actions/chat'

function useSocket(user, dispatch) {
  useEffect(() => {
    dispatch(fetchChats())
      .then((res) => {
        const socket = socketIOClient.connect('http://localhost:3001', {
          transports: ['websocket'],
          upgrade: false,
        })
        socket.emit('join', user)
        socket.on('typing', (user) => {
          console.log('Event', user)
        })

        socket.on('friends', (friends) => {
          dispatch(onlineFriends(friends))
          console.log('Friends', friends)
        })

        socket.on('online', (user) => {
          dispatch(onlineFriend(user))
          console.log('Online', user)
        })

        socket.on('offline', (user) => {
          dispatch(offlineFriend(user))
          console.log('Offine', user)
        })
        console.log(res)
      })
      .catch((err) => console.log(err))
  }, [user, dispatch])
}

export default useSocket
