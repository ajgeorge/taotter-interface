import { useState, useRef, useEffect } from 'react'
import './BudgetSlider.css'

const BudgetSlider = ({ 
  label, 
  value = 0, 
  onChange, 
  min = 0, 
  max = 24000, 
  step = 1000,
  className = "",
  ...props 
}) => {
  const sliderRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  // Generate labels for display
  const generateLabels = () => {
    const labels = []
    for (let i = min; i <= max; i += step) {
      if (i === 0) {
        labels.push('0')
      } else {
        labels.push(`${i / 1000}K`)
      }
    }
    return labels
  }

  const labels = generateLabels()

  const handleSliderChange = (e) => {
    const newValue = parseInt(e.target.value)
    onChange(newValue)
  }

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  // Calculate percentage for styling
  const percentage = ((value - min) / (max - min)) * 100

  return (
    <div className={`budget-slider-container ${className}`}>
      {label && (
        <label className="budget-slider-label">
          {label}
        </label>
      )}
      
      <div className="budget-slider-wrapper">
        <div className="budget-slider-track-container">
          <div className="budget-slider-track">
            <div 
              className="budget-slider-fill" 
              style={{ width: `${percentage}%` }}
            />
            <input
              ref={sliderRef}
              type="range"
              min={min}
              max={max}
              step={step}
              value={value}
              onChange={handleSliderChange}
              onMouseDown={handleMouseDown}
              className={`budget-slider-input ${isDragging ? 'dragging' : ''}`}
              {...props}
            />
          </div>
        </div>
        
        <div className="budget-slider-labels">
          {labels.map((label, index) => {
            const labelValue = min + (index * step)
            const isActive = labelValue === value
            return (
              <div 
                key={index} 
                className={`budget-slider-label-item ${isActive ? 'active' : ''}`}
              >
                {label}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default BudgetSlider
