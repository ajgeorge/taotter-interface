import './RadioButton.css'

const RadioButton = ({ 
  label, 
  value, 
  checked, 
  onChange, 
  name,
  className = "",
  disabled = false,
  ...props 
}) => {
  const handleChange = () => {
    if (!disabled && onChange) {
      onChange(value)
    }
  }

  return (
    <label className={`radio-button ${className} ${disabled ? 'disabled' : ''}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className="radio-input"
        {...props}
      />
      <span className="radio-custom">
        <span className="radio-indicator"></span>
      </span>
      <span className="radio-label">{label}</span>
    </label>
  )
}

export default RadioButton
