import React from 'react'
import { useSelector } from 'react-redux'
import './NavBar.scss'

const NavBar = () => {
  const user = useSelector((state) => state.authReducer.user)

  return (
    <div id="navbar" className="card-shadow">
      <h2>Chat.io</h2>
      <div id="profile-menu">
        <img src="" alt="Avatar"></img>
        <p>
          {user.firstName} {user.lastName}
        </p>
      </div>
    </div>
  )
}

export default NavBar
