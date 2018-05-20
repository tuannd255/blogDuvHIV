import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, Switch} from 'react-router-dom'
import history from './history'
import { Provider } from 'react-redux'
import configureStore from './stores/store'
import { ThroughProvider } from 'react-through'
import Main from './components/Main.react'
import LoginPage from './components/LoginPage.react'
import FlashMessages from './components/FlashMessages'

import PrivateRoute from './customs/PrivateRoute'
import PublicRoute from './customs/PublicRoute'
import HomePage from './components/HomePage/HomePage.react'

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
      <Router history={history}>
        <div className="page-wrapper">
          <FlashMessages />
          <Switch>
            <PrivateRoute path="/" component={HomePage} exact />
            <Route path="/home_page" component={Main} exact />
            <PublicRoute path="/login" component={LoginPage} exact />
          </Switch>
        </div>
      </Router>
    </ThroughProvider>
  </Provider>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(App, document.getElementById('root'))
})
