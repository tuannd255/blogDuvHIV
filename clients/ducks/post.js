import { createAction, handleActions } from 'redux-actions'
import Constants from '../constants/constants'

export const getPosts = createAction(Constants.GET_POSTS)
export const getPostsSuccess = createAction(Constants.GET_POSTS_SUCCESS)
export const getPostsFail = createAction(Constants.GET_POSTS_FAIL)
export const updatePagePost = createAction(Constants.UPDATE_PAGE_POST)

export const getPostStates = state => state.post

const initialPostsState = {
  isLoading: false,
  posts: [],
  page: 1,
  perPage: 0,
  totalPages: 0
}

const post = handleActions(
  {
    [Constants.GET_POSTS]: (state, action) => ({
      ...state,
      isLoading: true
    }),
    [Constants.GET_POSTS_SUCCESS]: (state, action) => {
      const { posts, page, per_page, total_pages } = action.payload
      return ({
        ...state,
        isLoading: false,
        posts: posts,
        page: page,
        perPage: per_page,
        totalPages: total_pages
        }
      )
    },
    [Constants.GET_POSTS_FAIL]: (state, action) => ({
      ...state,
      isLoading: false,
      posts: []
    }),
    [Constants.UPDATE_PAGE_POST]: (state, action) => ({
      ...state, page: action.payload
    })
  }, initialPostsState
)

export default post
