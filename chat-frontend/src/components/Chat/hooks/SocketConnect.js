import { useEffect } from 'react'
import socketIOClient from 'socket.io-client'

function useSocket(user, dispatch) {
  useEffect(() => {
    const socket = socketIOClient.connect('http://localhost:3001', {
      transports: ['websocket'],
      upgrade: false,
    })
    socket.emit('join', user)
    socket.on('typing', (user) => {
      console.log('Event', user)
    })
  }, [user, dispatch])
}

export default useSocket
