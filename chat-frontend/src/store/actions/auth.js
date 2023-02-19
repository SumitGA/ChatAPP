import AuthService from '../../services/authService'
import { LOGIN, REGISTER, LOGOUT, UPDATE_PROFILE } from '../types/index'

export const login = (params, history) => (dispatch) => {
  return AuthService.login(params)
    .then((data) => {
      dispatch({ type: LOGIN, payload: data })
      history('/')
    })
    .catch((err) => {
      throw err
    })
}

export const register = (params, history) => (dispatch) => {
  return AuthService.register(params)
    .then((data) => {
      dispatch({ type: REGISTER, payload: data })
      history('/')
    })
    .catch((err) => {
      throw err
    })
}

export const logout = () => (dispatch) => {
  AuthService.logout()
  dispatch({ type: LOGOUT })
}

export const updateProfile = (params, history) => (dispatch) => {
  return AuthService.updateProfile(params)
    .then((data) => {
      dispatch({ type: UPDATE_PROFILE, payload: data })
    })
    .catch((err) => {
      throw err
    })
}
