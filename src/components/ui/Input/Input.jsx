import { useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon'
import './Input.css'

const Input = forwardRef(({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  error,
  helperText,
  disabled = false,
  required = false,
  size = 'medium',
  variant = 'outlined',
  startIcon,
  endIcon,
  onEndIconClick,
  maxLength,
  showCharCount = false,
  autoComplete,
  id,
  name,
  className = '',
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const getInputClasses = () => {
    const baseClasses = 'input'
    const sizeClass = `input--${size}`
    const variantClass = `input--${variant}`
    const errorClass = error ? 'input--error' : ''
    const disabledClass = disabled ? 'input--disabled' : ''
    const focusedClass = isFocused ? 'input--focused' : ''
    const filledClass = value ? 'input--filled' : ''
    
    return [baseClasses, sizeClass, variantClass, errorClass, disabledClass, focusedClass, filledClass, className]
      .filter(Boolean)
      .join(' ')
  }

  const handleFocus = (e) => {
    setIsFocused(true)
    onFocus && onFocus(e)
  }

  const handleBlur = (e) => {
    setIsFocused(false)
    onBlur && onBlur(e)
  }

  const handleChange = (e) => {
    onChange && onChange(e)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const inputId = id || `input-${name || Math.random().toString(36).substr(2, 9)}`
  const inputType = type === 'password' && showPassword ? 'text' : type
  const characterCount = value ? value.length : 0
  const isPasswordType = type === 'password'

  return (
    <div className={`input-wrapper ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input__label">
          {label}
          {required && <span className="input__required" aria-label="required">*</span>}
        </label>
      )}
      
      <div className={getInputClasses()}>
        {startIcon && (
          <div className="input__start-icon">
            {typeof startIcon === 'string' ? (
              <Icon name={startIcon} size={20} />
            ) : (
              startIcon
            )}
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          name={name}
          type={inputType}
          value={value || ''}
          placeholder={placeholder}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          autoComplete={autoComplete}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            [
              error && `${inputId}-error`,
              helperText && `${inputId}-helper`,
              showCharCount && maxLength && `${inputId}-count`
            ].filter(Boolean).join(' ') || undefined
          }
          className="input__field"
          {...props}
        />
        
        {(endIcon || isPasswordType) && (
          <div className="input__end-icon">
            {isPasswordType ? (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="input__password-toggle"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                <Icon name={showPassword ? 'eye-disabled' : 'Eye'} size={20} />
              </button>
            ) : endIcon ? (
              <div 
                className={onEndIconClick ? 'input__end-icon--clickable' : ''}
                onClick={onEndIconClick}
                role={onEndIconClick ? 'button' : undefined}
                tabIndex={onEndIconClick ? 0 : undefined}
                onKeyDown={onEndIconClick ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onEndIconClick(e)
                  }
                } : undefined}
              >
                {typeof endIcon === 'string' ? (
                  <Icon name={endIcon} size={20} />
                ) : (
                  endIcon
                )}
              </div>
            ) : null}
          </div>
        )}
      </div>
      
      <div className="input__footer">
        <div className="input__messages">
          {error && (
            <p id={`${inputId}-error`} className="input__error" role="alert">
              <Icon name="error" size={16} />
              {error}
            </p>
          )}
          
          {helperText && !error && (
            <p id={`${inputId}-helper`} className="input__helper">
              {helperText}
            </p>
          )}
        </div>
        
        {showCharCount && maxLength && (
          <div id={`${inputId}-count`} className="input__char-count">
            {characterCount}/{maxLength}
          </div>
        )}
      </div>
    </div>
  )
})

Input.displayName = 'Input'

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'email', 'password', 'tel', 'url', 'search', 'number']),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  error: PropTypes.string,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['outlined', 'filled']),
  startIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  endIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onEndIconClick: PropTypes.func,
  maxLength: PropTypes.number,
  showCharCount: PropTypes.bool,
  autoComplete: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
}

export default Input
