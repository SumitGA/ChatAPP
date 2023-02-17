import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn)
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default ProtectedRoute
