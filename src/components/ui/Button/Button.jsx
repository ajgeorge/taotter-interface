import PropTypes from 'prop-types'
import { getColor } from '../../../utils/colors'
import './Button.css'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  color, 
  onClick, 
  disabled = false,
  loading = false,
  type = 'button',
  className = '',
  icon = null,
  ...props 
}) => {
  const getButtonClasses = () => {
    const baseClasses = 'btn'
    const variantClass = `btn--${variant}`
    const sizeClass = `btn--${size}`
    const loadingClass = loading ? 'btn--loading' : ''
    const disabledClass = disabled ? 'btn--disabled' : ''
    
    return [baseClasses, variantClass, sizeClass, loadingClass, disabledClass, className]
      .filter(Boolean)
      .join(' ')
  }

  const getButtonStyle = () => {
    if (color && variant === 'primary') {
      return {
        backgroundColor: color,
        borderColor: color,
      }
    }
    if (color && variant === 'secondary') {
      return {
        color: color,
        borderColor: color,
      }
    }
    return {}
  }

  const handleClick = (e) => {
    if (disabled || loading) return
    onClick && onClick(e)
  }

  return (
    <button
      type={type}
      className={getButtonClasses()}
      style={getButtonStyle()}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="btn__spinner" aria-hidden="true">
          <svg className="btn__spinner-icon" viewBox="0 0 24 24">
            <circle 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4" 
              fill="none"
              strokeLinecap="round"
              strokeDasharray="31.416"
              strokeDashoffset="31.416"
            />
          </svg>
        </span>
      )}
      
      {icon && !loading && (
        <span className="btn__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      
      <span className={`btn__content ${loading ? 'btn__content--loading' : ''}`}>
        {children}
      </span>
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'floating']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  icon: PropTypes.node,
}

export default Button
