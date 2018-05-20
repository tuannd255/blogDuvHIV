import React, { Component } from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';

export default class Flash extends Component {
  componentDidMount() {
    // setTimeout(this.handleClose, 3000);
  }

  handleClose = () => this.props.removeFlashMessage(this.props.message.id);

  render() {
    const { type, messages } = this.props.message;
    const flashClass = classNames({
      fa: true,
      'fa-hx': true,
      'fa-check': type === 'success',
      'fa-info-circle': type === 'info',
      'fa-exclamation-triangle': type === 'warning',
      'fa-times': type === 'error'
    });

    return (
      <CSSTransition
        in={this.props.in}
        onExited={this.props.onExited}
        timeout={300}
        classNames="animate"
      >
        <div className={`flash flash--${type} ${this.props.className}`}>
          <i className={flashClass} />
          <div className="flash__message">{messages}</div>
          <div className="flash__close" onClick={this.handleClose}>
            ×
          </div>
        </div>
      </CSSTransition>
    );
  }
}
