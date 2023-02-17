import React from 'react'
import { useSelector } from 'react-redux'
import NavBar from './components/NavBar/NavBar'
import './Chat.scss'

const Chat = () => {
  const user = useSelector((state) => state.authReducer.user)
  console.log(user)
  return (
    <div id="chat-container">
      <NavBar />
      <div id="chat-wrap">DATA</div>
    </div>
  )
}

export default Chat
