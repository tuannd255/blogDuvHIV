import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, Switch} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import { Provider } from 'react-redux'
import configureStore from './stores/store'
import { ThroughProvider } from 'react-through'
import Main from './components/Main.react'
import Login from './components/Login.react'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-select/dist/react-select.css'
import 'font-awesome/css/font-awesome.min.css'
import 'react-datepicker/dist/react-datepicker.css'
import './scss/style.scss'
import _ from 'lodash'
import moment from 'moment'
moment.locale('ja')

const App = (
  <Provider store={configureStore()}>
    <ThroughProvider>
      <Router history={createBrowserHistory()}>
        <div className="page-wrapper">
          <Switch>
            <Route path="/" component={Main} exact />
            <Route path="/login" component={Login} exact />
          </Switch>
        </div>
      </Router>
    </ThroughProvider>
  </Provider>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(App, document.getElementById('root'))
})
