import { put, call, takeLatest, all, select } from 'redux-saga/effects'
import Constants from '../constants/constants'
import * as actions from '../ducks/post'
import * as api from '../api'

export function* handleGetPosts(action) {
  try {
    const postStates = yield select(actions.getPostStates)
    const { page, perPage } = postStates
    const oldPosts = postStates.posts
    const payload = yield call(api.getPosts, { page, per_page: perPage })
    yield put(actions.getPostsSuccess({ ...payload, posts: [...oldPosts, ...payload.posts] }))
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
