import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_BALANCE_REQUEST,
  USER_UPDATE_BALANCE_SUCCESS,
  USER_UPDATE_BALANCE_FAIL,
  USER_UPDATE_BALANCE_RESET,
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case USER_DETAILS_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case USER_DETAILS_RESET:
      return {}
    default:
      return state
  }
}

export const userUpdateBalanceReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_BALANCE_REQUEST:
      return { loading: true }
    case USER_UPDATE_BALANCE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }
    case USER_UPDATE_BALANCE_FAIL:
      return { loading: false, error: action.payload }
    case USER_UPDATE_BALANCE_RESET:
      return {}

    default:
      return state
  }
}
