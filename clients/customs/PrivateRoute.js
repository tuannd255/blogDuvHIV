import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../helpers/Helpers'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    isLogin() ? <Component {...props} /> : <Redirect to={{ pathname: '/home_page', state: { from: props.location } }} />
  )} />
)

export default PrivateRoute
