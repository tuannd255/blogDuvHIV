import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../../ducks/session'

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <input type="button" onClick={e => this.props.logout()} value="logout" />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(null, mapDispatchToProps)(HomePage)
