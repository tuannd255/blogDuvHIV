import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../../ducks/session'
import { Button } from 'reactstrap'

class LogoutBtn extends React.Component {
  render() {
    return (
      <div>
        <Button onClick={this.props.logout} className="ml-3">
          Logout
        </Button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(null, mapDispatchToProps)(LogoutBtn)
