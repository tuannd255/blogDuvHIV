import React from 'react'
import { Input as InputReactStrap } from 'reactstrap'

export default class Input extends React.Component {
  render() {
    const {
      input,
      label,
      meta: { touched, error },
      type,
      placeholder,
      required,
      className,
      maxLength,
      disabled
    } = this.props
    return (
      <div className={`mb-3 ${className || ''}`}>
        <b>{required && <span className="text-danger">*</span>} {label}</b>
        <div>
          <InputReactStrap
            {...input}
            type={type || 'text'}
            maxLength={maxLength}
            placeholder={placeholder}
            disabled={disabled}
          />
          {touched && (error && <span className="text-danger">{error}</span>)}
        </div>
      </div>
    )
  }
}
