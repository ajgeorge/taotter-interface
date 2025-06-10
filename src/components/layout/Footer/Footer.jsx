import { useState } from 'react'
import PropTypes from 'prop-types'
import { Icon } from '../../ui'
import './Footer.css'

const Footer = ({ 
  logo = "Taotter",
  className = ''
}) => {
  const [isClientsOpen, setIsClientsOpen] = useState(false)
  const [isTalentsOpen, setIsTalentsOpen] = useState(false)
  const [isCompanyOpen, setIsCompanyOpen] = useState(false)

  const socialLinks = [
    { name: 'Facebook', icon: 'facebook', href: '#' },
    { name: 'Instagram', icon: 'instagram', href: '#' },
    { name: 'X (Twitter)', icon: 'x , twitter', href: '#' },
    { name: 'LinkedIn', icon: 'linkedin', href: '#' }
  ]

  const clientsLinks = [
    { label: 'Find Talent', href: '#' },
    { label: 'Post a Job', href: '#' },
    { label: 'How it Works', href: '#' },
    { label: 'Success Stories', href: '#' }
  ]

  const talentsLinks = [
    { label: 'Find Work', href: '#' },
    { label: 'Create Profile', href: '#' },
    { label: 'Build Portfolio', href: '#' },
    { label: 'Career Tips', href: '#' }
  ]

  const companyLinks = [
    { label: 'About Us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
    { label: 'Contact', href: '#' }
  ]

  const footerLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Settings', href: '#' }
  ]

  return (
    <footer className={`footer ${className}`}>
      <div className="footer__container">
        
        {/* Collapsible Sections */}
        <div className="footer__sections">
          
          {/* For Clients */}
          <div className="footer__section">
            <button 
              className="footer__section-toggle"
              onClick={() => setIsClientsOpen(!isClientsOpen)}
              aria-expanded={isClientsOpen}
              aria-controls="clients-menu"
            >
              <span>For Clients</span>
              <Icon 
                name={isClientsOpen ? 'Arrow-up' : 'Arrow-down'} 
                size={16} 
                className="footer__section-icon"
              />
            </button>
            <div 
              id="clients-menu"
              className={`footer__section-content ${isClientsOpen ? 'footer__section-content--open' : ''}`}
              aria-hidden={!isClientsOpen}
            >
              <ul className="footer__links">
                {clientsLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="footer__link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* For Talents */}
          <div className="footer__section">
            <button 
              className="footer__section-toggle"
              onClick={() => setIsTalentsOpen(!isTalentsOpen)}
              aria-expanded={isTalentsOpen}
              aria-controls="talents-menu"
            >
              <span>For Talents</span>
              <Icon 
                name={isTalentsOpen ? 'Arrow-up' : 'Arrow-down'} 
                size={16} 
                className="footer__section-icon"
              />
            </button>
            <div 
              id="talents-menu"
              className={`footer__section-content ${isTalentsOpen ? 'footer__section-content--open' : ''}`}
              aria-hidden={!isTalentsOpen}
            >
              <ul className="footer__links">
                {talentsLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="footer__link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Company */}
          <div className="footer__section">
            <button 
              className="footer__section-toggle"
              onClick={() => setIsCompanyOpen(!isCompanyOpen)}
              aria-expanded={isCompanyOpen}
              aria-controls="company-menu"
            >
              <span>Company</span>
              <Icon 
                name={isCompanyOpen ? 'Arrow-up' : 'Arrow-down'} 
                size={16} 
                className="footer__section-icon"
              />
            </button>
            <div 
              id="company-menu"
              className={`footer__section-content ${isCompanyOpen ? 'footer__section-content--open' : ''}`}
              aria-hidden={!isCompanyOpen}
            >
              <ul className="footer__links">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="footer__link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Get in Touch Section */}
        <div className="footer__contact">
          <h3 className="footer__contact-title">Get in Touch</h3>
          <p className="footer__contact-info">
            Have questions? We'd love to hear from you.
          </p>
        </div>

        {/* Follow Us Section */}
        <div className="footer__social">
          <h3 className="footer__social-title">Follow Us</h3>
          <div className="footer__social-links">
            {socialLinks.map((social, index) => (
              <a 
                key={index}
                href={social.href}
                className="footer__social-link"
                aria-label={`Follow us on ${social.name}`}
              >
                <Icon name={social.icon} size={24} />
              </a>
            ))}
          </div>
        </div>

        {/* Logo */}
        <div className="footer__logo">
          <div className="footer__logo-text">{logo}</div>
        </div>

        {/* Footer Links */}
        <div className="footer__legal">
          <ul className="footer__legal-links">
            {footerLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href} className="footer__legal-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Copyright */}
        <div className="footer__copyright">
          <p>&copy; {logo} 2024. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  logo: PropTypes.string,
  className: PropTypes.string,
}

export default Footer
