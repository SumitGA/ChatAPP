import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { logout } from '../../../../store/actions/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './NavBar.scss'

const NavBar = () => {
  const user = useSelector((state) => state.authReducer.user)
  const dispatch = useDispatch()
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
            <p onClick={() => dispatch(logout())}>Logout</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default NavBar
