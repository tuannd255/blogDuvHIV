import React from 'react'
import { connect } from 'react-redux'
import { login } from '../../ducks/session'
import LoginForm from './LoginForm.react'
import './login-form.scss'

class LoginPage extends React.Component {
  render() {
    return (
      <div className="login-form">
        <LoginForm
          onSubmit={this.props.login}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  login: (session) => dispatch(login(session)),
})

export default connect(null, mapDispatchToProps)(LoginPage)
