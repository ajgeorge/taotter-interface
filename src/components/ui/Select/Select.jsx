import { useState } from 'react'
import { SvgIcon } from '../Icon'
import './Select.css'

const Select = ({ 
  label, 
  value, 
  onChange, 
  options = [], 
  placeholder = "Select an option", 
  error,
  className = "",
  required = false,
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (optionValue) => {
    onChange(optionValue)
    setIsOpen(false)
  }

  const selectedOption = options.find(option => option.value === value)

  return (
    <div className={`select-container ${className}`}>
      {label && (
        <label className="select-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      
      <div className={`select-wrapper ${error ? 'error' : ''} ${isOpen ? 'open' : ''}`}>
        <div 
          className="select-trigger"
          onClick={() => setIsOpen(!isOpen)}
          {...props}
        >
          <span className={`select-value ${!selectedOption ? 'placeholder' : ''}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <SvgIcon 
            name="Arrow-down" 
            size={16} 
            className={`select-icon ${isOpen ? 'rotated' : ''}`}
          />
        </div>
        
        {isOpen && (
          <div className="select-dropdown">
            {options.map((option) => (
              <div
                key={option.value}
                className={`select-option ${value === option.value ? 'selected' : ''}`}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {error && <span className="select-error">{error}</span>}
    </div>
  )
}

export default Select
