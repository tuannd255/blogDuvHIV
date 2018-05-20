import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { routerReducer } from 'react-router-redux'

import session from '../ducks/session'
import flashMessages from '../ducks/flashMessages'

const appReducer = combineReducers({
  form,
  routing: routerReducer,
  session,
  flashMessages
})

const rootReducer = (state, action) => {
  if (action.type === 'CLEAR_CURRENT_USER_SUCCESS') {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer
