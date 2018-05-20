import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers/root_reducer'
import thunkMiddleware from '../middleware/thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootSaga from '../sagas'
import { saveState } from '../middleware/localStorage'
import { logger } from 'redux-logger'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
if (process.env.ENV !== 'production') {
  middlewares.push(logger)
}
if (process.env.REVISION_ID) {
  console.info(process.env.REVISION_ID)
}
middlewares.push(thunkMiddleware)
const routerMdw = routerMiddleware(createBrowserHistory())
middlewares.push(routerMdw)
export default function configureStore(initialState = {}) {
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  )
  store.subscribe(
    _.throttle(() => {
      saveState({
        frontLocales: store.getState().locales
      })
    }, 1000)
  )
  sagaMiddleware.run(rootSaga)
  return store
}
