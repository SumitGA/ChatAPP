import React from 'react'
import { useSelector } from 'react-redux'
import ChatHeader from '../ChatHeader/ChatHeader'
import MessageBox from '../MessageBox/MessageBox'
import MessageInput from '../MessageInput/MessageInput'
import './Messenger.scss'

const Messenger = () => {
  const chat = useSelector((state) => state.chatReducer.currentChat)

  const activeChat = () => {
    return Object.keys(chat).length > 0
  }

  return (
    <div id="messenger" className="shadow-light">
      {activeChat() ? (
        <div id="messenger-wrap">
          <ChatHeader />
          <br />
          <MessageBox chat={chat} />
          <MessageBox chat={chat} />
        </div>
      ) : (
        <p>No active chat</p>
      )}
    </div>
  )
}

export default Messenger
