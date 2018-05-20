import { put, call, takeLatest, all } from 'redux-saga/effects'
import Constants from '../constants/constants'
import * as api from '../api'
import * as actions from '../ducks/session'
import {
  addWarningMessage,
  addSuccessMessage,
  removeAllMessages
} from '../ducks/flashMessages'

export function* handleLogin(action) {
  try {
    yield put(addSuccessMessage("ecec"))
    const payload = yield call(api.login, action.payload)
    yield put(actions.loginSuccess(payload))
  } catch (e) {
    yield put(actions.loginFail(payload))
    console.log(e)
  }
}

export default function* diarySaga() {
  yield all([
    takeLatest(Constants.LOGIN, handleLogin)
  ])
}
