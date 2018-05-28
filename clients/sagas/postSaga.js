import { put, call, takeLatest, all } from 'redux-saga/effects'
import Constants from '../constants/constants'
import * as actions from '../ducks/post'
import * as api from '../api'

export function* handleGetPosts(action) {
  try {
    const payload = yield call(api.getPosts, action.payload)
    yield put(actions.getPostsSuccess(payload))
  } catch (e) {
    yield put(actions.getPostsFail())
    console.log(e)
  }
}

export default function* diarySaga() {
  yield all([
    takeLatest(Constants.GET_POSTS, handleGetPosts)
  ])
}
