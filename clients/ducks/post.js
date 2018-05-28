import { createAction, handleActions } from 'redux-actions'
import Constants from '../constants/constants'

export const getPosts = createAction(Constants.GET_POSTS)
export const getPostsSuccess = createAction(Constants.GET_POSTS_SUCCESS)
export const getPostsFail = createAction(Constants.GET_POSTS_FAIL)

const initialPostsState = {
  isLoading: false,
  posts: [],
  page: 0,
  perPage: 0
}

const postsAction = handleActions(
  {
    [Constants.GET_POSTS]: (state, action) => ({
      ...state,
      isLoading: true
    }),
    [Constants.GET_POSTS_SUCCESS]: (state, action) => {
      let payload = action.payload
      return ({
          ...state,
          isLoading: false,
          posts: payload.posts,
          page: payload.page,
          perPage: payload.per_page
        }
      )
    },
    [Constants.GET_POSTS_FAIL]: (state, action) => ({
      ...state,
      isLoading: false,
      posts: []
    })
  }, initialPostsState
)

export default postsAction
