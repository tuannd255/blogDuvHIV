import { all, put } from 'redux-saga/effects'
import 'babel-polyfill'

import sessionSaga from './sessionSaga'

export default function* rootSaga() {
  yield all([
    sessionSaga()
  ])
}
