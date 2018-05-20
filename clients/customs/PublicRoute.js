import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../helpers/Helpers'

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    isLogin() ? <Redirect to={{ pathname: '/', state: { from: props.location } }} /> : <Component {...props} />
  )} />
)

export default PublicRoute
