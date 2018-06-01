import { put, call, takeLatest, all } from 'redux-saga/effects'
import Constants from '../constants/constants'
import * as ConstantConfig from '../constants/AppConfig'
import * as api from '../api'
import * as actions from '../ducks/session'
import history from '../history'
import {
  addWarningMessage,
  addSuccessMessage,
  removeAllMessages
} from '../ducks/flashMessages'

export function* handleLogin(action) {
  try {
    const payload = yield call(api.login, action.payload)
    yield put(actions.loginSuccess(payload.user))
    yield put(addSuccessMessage('login success'))
    localStorage.setItem(ConstantConfig.TOKEN_KEY, payload.auth_token)
    history.push('/posts')
  } catch (e) {
    yield put(addWarningMessage('login fail'))
    yield put(actions.loginFail())
    console.log(e)
  }
}

export function* handleLogout(action) {
  try {
    const payload = yield call(api.logout)
    yield put(addSuccessMessage('logout success'))
    localStorage.removeItem(ConstantConfig.TOKEN_KEY)
    history.push('/home_page')
    yield put(actions.logoutSuccess(payload))
  } catch (e) {
    yield put(addWarningMessage('logout fail'))
    yield put(actions.logoutFail())
    history.push('/')
    console.log(e)
  }
}

export default function* diarySaga() {
  yield all([
    takeLatest(Constants.LOGIN, handleLogin),
    takeLatest(Constants.LOGOUT, handleLogout),
  ])
}
