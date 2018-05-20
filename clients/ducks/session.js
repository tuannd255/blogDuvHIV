import { createAction, handleActions } from 'redux-actions'
import { combineReducers } from 'redux'
import Constants from '../constants/constants'

export const login = createAction(Constants.LOGIN)
export const loginSuccess = createAction(Constants.LOGIN_SUCCESS)
export const loginFail = createAction(Constants.LOGIN_FAIL)

const initialSessionState = {
  isLoading: false,
  currentUser: null
}

const session = handleActions(
  {
    [Constants.LOGIN]: (state, action) => ({
      ...state, isLoading: true
    }),
    [Constants.LOGIN_SUCCESS]: (state, action) => ({
      ...state, isLoading: false
    }),
    [Constants.LOGIN_FAIL]: (state, action) => ({
      ...state, isLoading: false
    }),
  }, initialSessionState
)

export default session
