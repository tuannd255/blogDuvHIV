import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LoginPage from './LoginPage/LoginPage.react'
import FlashMessages from './FlashMessages'
import PrivateRoute from './customs/PrivateRoute'
import PublicRoute from './customs/PublicRoute'
import Posts from './Posts/Posts.react'
import Header from './Layouts/Header.react'
import Menu from './Layouts/Menu.react'
import Footer from './Layouts/Footer.react'

export default class Main extends React.Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Menu />
        <FlashMessages />
        <Switch>
          <Route path="/posts" component={Posts} exact />
          <PublicRoute path="/login" component={LoginPage} exact />
        </Switch>
        <Footer />
      </div>
    )
  }
}
