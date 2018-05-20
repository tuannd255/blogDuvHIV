import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { TransitionGroup } from 'react-transition-group';
import { removeFlashMessage } from '../../ducks/flashMessages';
import Flash from './Flash.react';
import './style.scss';

class FlashMessages extends Component {
  render() {
    const containerClass = classNames({
      'flash-container': true,
      'flash-container--front': this.props.front,
      'flash-container--noheader': this.props.noheader
    });
    const flashMessageClass = classNames({
      'flash--front': this.props.front
    });

    return (
      <TransitionGroup className={containerClass}>
        {this.props.flashMessages.map(message => (
          <Flash
            key={message.id}
            className={flashMessageClass}
            removeFlashMessage={this.props.removeFlashMessage}
            message={message}
          />
        ))}
      </TransitionGroup>
    );
  }
}

export default connect(
  ({ flashMessages }) => ({
    flashMessages
  }),
  dispatch => ({
    removeFlashMessage: id => dispatch(removeFlashMessage(id))
  })
)(FlashMessages);
