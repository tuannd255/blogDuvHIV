const thunkMiddlware = ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function') {
    return action(dispatch, getState)
  }
  return next(action, getState)
}

export default thunkMiddlware
