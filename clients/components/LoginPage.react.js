import React from 'react'
import { connect } from 'react-redux'
import { login } from '../ducks/session'
import { Button } from 'reactstrap'

class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChangeInput = (e) => {
    const { target: { name, value }} = e
    this.setState({ [name]: value })
  }

  handleLogin = (e) => {
    const { email, password } = this.state
    this.props.login({ email, password })
  }

  render() {
    const  { email, password } = this.state
    return (
      <div>
        <form>
          <input type="text" name="email" value={email || ''} onChange={e => this.handleChangeInput(e)} />
          <input type="password" name="password" value={password || ''} onChange={e => this.handleChangeInput(e)} />
          <Button onClick={this.handleLogin}>Login</Button>
        </form>
        <div className="auth-messages">
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  session: state.session
})

const mapDispatchToProps = dispatch => ({
  login: (session) => dispatch(login(session))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
