import PropTypes from 'prop-types'
import Icon from '../../ui/Icon'
import './FeatureCard.css'

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  onClick,
  className = '',
  variant = 'default',
  ...props 
}) => {
  const getCardClasses = () => {
    const baseClasses = 'feature-card'
    const variantClass = `feature-card--${variant}`
    const clickableClass = onClick ? 'feature-card--clickable' : ''
    
    return [baseClasses, variantClass, clickableClass, className]
      .filter(Boolean)
      .join(' ')
  }

  const handleClick = (e) => {
    if (onClick) {
      onClick(e)
    }
  }

  const handleKeyDown = (e) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      onClick(e)
    }
  }

  const CardContent = () => (
    <>
      <div className="feature-card__icon">
        {typeof icon === 'string' ? (
          <Icon name={icon} size={48} />
        ) : (
          icon
        )}
      </div>
      
      <div className="feature-card__content">
        <h2 className="feature-card__title">{title}</h2>
        <p className="feature-card__description">{description}</p>
      </div>
    </>
  )

  if (onClick) {
    return (
      <button
        className={getCardClasses()}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        type="button"
        {...props}
      >
        <CardContent />
      </button>
    )
  }

  return (
    <div className={getCardClasses()} {...props}>
      <CardContent />
    </div>
  )
}

FeatureCard.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'outlined', 'elevated']),
}

export default FeatureCard
