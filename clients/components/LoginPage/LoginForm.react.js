import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import Input from '../common/Input.react'
import Forms from '../../constants/form'
import { reduxForm, Field, submit } from 'redux-form'
import './login-form.scss'

const validate = (values, props) => {
  const error = {}
  if (!values.email) {
    error.email = 'Please input email'
  }
  if (!values.password) {
    error.password = 'Please input password'
  }
  return error
}

class LoginForm extends React.Component {
  render() {
    const { invalid, handleSubmit } = this.props
    return (
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <Field
            name="email"
            placeholder="Email"
            label="Email"
            required
            component={Input}
          />
          <Field
            type="password"
            name="password"
            placeholder="Password"
            label="Password"
            required
            component={Input}
          />
          <Button
            disabled={invalid}
            type="submit"
            color="primary"
            className="mt-3"
          >Login</Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  session: state.session
})

export default connect(mapStateToProps)(
  reduxForm({
    form: Forms.LOGIN_FORM,
    enableReinitialize: true,
    validate
  })(LoginForm)
)
