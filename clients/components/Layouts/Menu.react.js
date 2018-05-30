import React, { Component } from 'react'

class Menu extends Component {
  render() {
    return (
      <div className="nav-scroller py-1 mb-2">
        <nav className="nav d-flex justify-content-between">
          <a className="p-2 text-muted" href="#">Rails</a>
          <a className="p-2 text-muted" href="#">IOS</a>
          <a className="p-2 text-muted" href="#">Taks</a>
          <a className="p-2 text-muted" href="#">Who i am?</a>
        </nav>
      </div>
    )
  }
}

export default Menu
