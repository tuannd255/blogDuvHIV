import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { routerReducer } from 'react-router-redux'

const appReducer = combineReducers({
  form,
  routing: routerReducer,
})

const rootReducer = (state, action) => {
  if (action.type === 'CLEAR_CURRENT_USER_SUCCESS') {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer
