import { useState, forwardRef, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon'
import './TextArea.css'

const TextArea = forwardRef(({
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
  rows = 4,
  minRows = 2,
  maxRows = 10,
  autoResize = false,
  maxLength,
  showCharCount = false,
  resize = 'vertical',
  id,
  name,
  className = '',
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false)
  const internalRef = useRef(null)
  const textareaRef = ref || internalRef

  // Auto-resize functionality
  useEffect(() => {
    if (autoResize && textareaRef.current) {
      const textarea = textareaRef.current
      
      // Reset height to get accurate scrollHeight
      textarea.style.height = 'auto'
      
      // Calculate new height based on content
      const scrollHeight = textarea.scrollHeight
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight)
      const paddingTop = parseInt(getComputedStyle(textarea).paddingTop)
      const paddingBottom = parseInt(getComputedStyle(textarea).paddingBottom)
      
      const minHeight = (lineHeight * minRows) + paddingTop + paddingBottom
      const maxHeight = (lineHeight * maxRows) + paddingTop + paddingBottom
      
      const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight)
      
      textarea.style.height = `${newHeight}px`
    }
  }, [value, autoResize, minRows, maxRows])

  const getTextAreaClasses = () => {
    const baseClasses = 'textarea'
    const sizeClass = `textarea--${size}`
    const variantClass = `textarea--${variant}`
    const errorClass = error ? 'textarea--error' : ''
    const disabledClass = disabled ? 'textarea--disabled' : ''
    const focusedClass = isFocused ? 'textarea--focused' : ''
    const filledClass = value ? 'textarea--filled' : ''
    const resizeClass = `textarea--resize-${resize}`
    
    return [baseClasses, sizeClass, variantClass, errorClass, disabledClass, focusedClass, filledClass, resizeClass, className]
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

  const textareaId = id || `textarea-${name || Math.random().toString(36).substr(2, 9)}`
  const characterCount = value ? value.length : 0
  const isOverLimit = maxLength && characterCount > maxLength

  return (
    <div className={`textarea-wrapper ${className}`}>
      {label && (
        <label htmlFor={textareaId} className="textarea__label">
          {label}
          {required && <span className="textarea__required" aria-label="required">*</span>}
        </label>
      )}
      
      <div className={getTextAreaClasses()}>
        <textarea
          ref={textareaRef}
          id={textareaId}
          name={name}
          value={value || ''}
          placeholder={placeholder}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          rows={autoResize ? minRows : rows}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            [
              error && `${textareaId}-error`,
              helperText && `${textareaId}-helper`,
              showCharCount && maxLength && `${textareaId}-count`
            ].filter(Boolean).join(' ') || undefined
          }
          className="textarea__field"
          style={{
            resize: autoResize ? 'none' : resize
          }}
          {...props}
        />
      </div>
      
      <div className="textarea__footer">
        <div className="textarea__messages">
          {error && (
            <p id={`${textareaId}-error`} className="textarea__error" role="alert">
              <Icon name="error" size={16} />
              {error}
            </p>
          )}
          
          {helperText && !error && (
            <p id={`${textareaId}-helper`} className="textarea__helper">
              {helperText}
            </p>
          )}
        </div>
        
        {showCharCount && maxLength && (
          <div 
            id={`${textareaId}-count`} 
            className={`textarea__char-count ${isOverLimit ? 'textarea__char-count--over-limit' : ''}`}
          >
            {characterCount}/{maxLength}
          </div>
        )}
      </div>
    </div>
  )
})

TextArea.displayName = 'TextArea'

TextArea.propTypes = {
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
  rows: PropTypes.number,
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
  autoResize: PropTypes.bool,
  maxLength: PropTypes.number,
  showCharCount: PropTypes.bool,
  resize: PropTypes.oneOf(['none', 'vertical', 'horizontal', 'both']),
  id: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
}

export default TextArea
