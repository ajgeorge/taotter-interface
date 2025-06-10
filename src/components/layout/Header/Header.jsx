import { useState } from 'react'
import PropTypes from 'prop-types'
import { Icon } from '../../ui'
import './Header.css'

const Header = ({ 
  logo = "Taotter",
  logoImage,
  onMenuToggle,
  menuItems = [],
  className = ''
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
    onMenuToggle && onMenuToggle(!isMenuOpen)
  }

  return (
    <>
      <header className={`header ${className}`}>
        <div className="header__container">
          {/* Logo */}
          <div className="header__logo">
            <a href="/" className="header__logo-link">
              {logoImage ? (
                <img 
                  src={logoImage} 
                  alt={logo} 
                  className="header__logo-image"
                />
              ) : (
                logo
              )}
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="header__menu-toggle"
            onClick={handleMenuToggle}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <Icon 
              name={isMenuOpen ? 'close' : 'Menu-1'} 
              size={24} 
            />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div 
            className="header__menu-overlay"
            onClick={handleMenuToggle}
            aria-hidden="true"
          />
        )}

        {/* Mobile Menu */}
        <nav 
          id="mobile-menu"
          className={`header__menu ${isMenuOpen ? 'header__menu--open' : ''}`}
          aria-hidden={!isMenuOpen}
        >
          <ul className="header__menu-list">
            {menuItems.map((item, index) => (
              <li key={index} className="header__menu-item">
                <a 
                  href={item.href || '#'}
                  className="header__menu-link"
                  onClick={() => {
                    setIsMenuOpen(false)
                    item.onClick && item.onClick()
                  }}
                >
                  {item.icon && (
                    <Icon 
                      name={item.icon} 
                      size={20} 
                      className="header__menu-icon"
                    />
                  )}
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  )
}

Header.propTypes = {
  logo: PropTypes.string,
  logoImage: PropTypes.string,
  onMenuToggle: PropTypes.func,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
      onClick: PropTypes.func,
      icon: PropTypes.string,
    })
  ),
  className: PropTypes.string,
}

export default Header
