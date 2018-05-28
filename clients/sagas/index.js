import { all, put } from 'redux-saga/effects'
import 'babel-polyfill'

import sessionSaga from './sessionSaga'
import postSaga from './postSaga'

export default function* rootSaga() {
  yield all([
    sessionSaga(),
    postSaga()
  ])
}
