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
    yield put(addSuccessMessage("ecec"))
    const payload = yield call(api.login, action.payload)
    slocalStorage.setItem(ConstantConfig.TOKEN_KEY, token)
    history.push("/")
    yield put(actions.loginSuccess(payload.user))
  } catch (e) {
    yield put(actions.loginFail(payload))
    history.push("/login")
    console.log(e)
  }
}

export function* handleLogout(action) {
  try {
    const payload = yield call(api.logout, action.payload)
    localStorage.removeItem(ConstantConfig.TOKEN_KEY)
    history.push("/home_page")
    yield put(actions.logoutSuccess(payload))
  } catch (e) {
    yield put(actions.logoutFail(payload))
    history.push("/")
    console.log(e)
  }
}

export default function* diarySaga() {
  yield all([
    takeLatest(Constants.LOGIN, handleLogin),
    takeLatest(Constants.LOGOUT, handleLogout),
  ])
}
