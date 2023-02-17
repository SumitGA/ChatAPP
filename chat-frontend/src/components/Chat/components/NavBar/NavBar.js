import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './NavBar.scss'

const NavBar = () => {
  const user = useSelector((state) => state.authReducer.user)
  const [showProfileOptions, setShowProfileOptions] = useState(false)

  return (
    <div id="navbar" className="card-shadow">
      <h2>Chat.io</h2>
      <div
        onClick={() => setShowProfileOptions(!showProfileOptions)}
        id="profile-menu"
      >
        <img width="40" height="40" src={user.avatar} alt="Avatar"></img>
        <p>
          {user.firstName} {user.lastName}
        </p>
        <FontAwesomeIcon icon="caret-down" className="fa-icon" />
        {showProfileOptions && (
          <div id="profile-options">
            <p>Update Profile</p>
            <p>Logout</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default NavBar
