import React, { useState } from 'react'
import { Button, WhatsAppIcon, Input, TextArea } from './components/ui'
import { FeatureCard } from './components/cards'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    description: '',
    feedback: ''
  })

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }))
  }

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1>Startup Management Platform</h1>
        <p>Mobile-first Component Library Demo</p>
      </header>

      <main>
        {/* Button Components Demo */}
        <section style={{ marginBottom: '3rem' }}>
          <h2>Button Components</h2>
          <div className="flex flex-col gap-4" style={{ alignItems: 'center' }}>
            
            {/* Primary Button - Your specs: 272x58px, 45px border-radius */}
            <Button 
              variant="primary"
              onClick={() => alert('Primary button clicked!')}
            >
              Get Started
            </Button>

            {/* Secondary Button - Your specs: 303x52px, 6px border-radius, 0.4 opacity */}
            <Button 
              variant="secondary"
              onClick={() => alert('Secondary button clicked!')}
            >
              Learn More
            </Button>

            {/* Loading state */}
            <Button 
              variant="primary"
              loading={true}
            >
              Loading...
            </Button>

            {/* Disabled state */}
            <Button 
              variant="primary"
              disabled={true}
            >
              Disabled
            </Button>

            {/* Custom color */}
            <Button 
              variant="primary"
              color="#6938EF"
              onClick={() => alert('Custom color button!')}
            >
              Custom Purple
            </Button>
          </div>
        </section>

        {/* Form Components Demo */}
        <section style={{ marginBottom: '3rem' }}>
          <h2>Form Components</h2>
          <div style={{ 
            maxWidth: '400px', 
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-4)'
          }}>
            
            {/* Text Input Examples */}
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange('name')}
              required
              startIcon="User"
            />

            <Input
              type="email"
              label="Email Address"
              placeholder="you@company.com"
              value={formData.email}
              onChange={handleInputChange('email')}
              required
              startIcon="inbox"
              helperText="We'll never share your email with anyone else"
            />

            <Input
              type="password"
              label="Password"
              placeholder="Enter a secure password"
              value={formData.password}
              onChange={handleInputChange('password')}
              required
              helperText="Must be at least 8 characters"
            />

            {/* Input with Error State */}
            <Input
              label="Company Website"
              placeholder="https://yourcompany.com"
              value="invalid-url"
              error="Please enter a valid URL"
              startIcon="globe"
            />

            {/* Search Input */}
            <Input
              type="search"
              placeholder="Search startups..."
              startIcon="Search"
              endIcon="Filter"
              onEndIconClick={() => alert('Filter clicked!')}
            />

            {/* TextArea Examples */}
            <TextArea
              label="Project Description"
              placeholder="Describe your startup project in detail..."
              value={formData.description}
              onChange={handleInputChange('description')}
              rows={4}
              maxLength={500}
              showCharCount
              helperText="Be as detailed as possible about your vision"
            />

            <TextArea
              label="Additional Feedback"
              placeholder="Any additional comments or questions?"
              value={formData.feedback}
              onChange={handleInputChange('feedback')}
              autoResize
              minRows={2}
              maxRows={6}
              variant="filled"
            />

            {/* Disabled States */}
            <Input
              label="Company ID"
              value="STARTUP-2024-001"
              disabled
              helperText="This field is automatically generated"
            />

            <div style={{ display: 'flex', gap: 'var(--spacing-3)', marginTop: 'var(--spacing-4)' }}>
              <Button variant="primary" onClick={() => alert('Form submitted!')}>
                Submit Application
              </Button>
              <Button variant="secondary" onClick={() => setFormData({
                name: '', email: '', password: '', description: '', feedback: ''
              })}>
                Reset Form
              </Button>
            </div>
          </div>
        </section>

        {/* Feature Cards Demo */}
        <section style={{ marginBottom: '3rem' }}>
          <h2>Feature Cards</h2>
          <div className="grid grid-cols-1 grid-cols-md-3" style={{ justifyItems: 'center' }}>
            
            <FeatureCard
              icon="briefcase"
              title="Business Planning"
              description="Create comprehensive business plans with our step-by-step guidance. Get expert insights and templates to build a solid foundation for your startup journey."
              onClick={() => alert('Business Planning clicked!')}
              variant="primary"
            />

            <FeatureCard
              icon="Chart"
              title="Analytics Dashboard"
              description="Track your startup's performance with real-time analytics. Monitor key metrics, user engagement, and financial data all in one place."
              onClick={() => alert('Analytics clicked!')}
              variant="success"
            />

            <FeatureCard
              icon="Users"
              title="Team Management"
              description="Collaborate effectively with your team members. Assign tasks, track progress, and maintain clear communication across all projects."
              onClick={() => alert('Team Management clicked!')}
              variant="indigo"
            />
          </div>
        </section>

        {/* Component Showcase */}
        <section style={{ marginBottom: '3rem' }}>
          <h2>Mobile-First Design</h2>
          <div style={{ 
            background: 'var(--color-bg-secondary)', 
            padding: '2rem', 
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center' 
          }}>
            <p>
              All components are built mobile-first with your exact specifications:
            </p>
            <ul style={{ textAlign: 'left', maxWidth: '600px', margin: '1rem auto' }}>
              <li>✅ Primary Button: 272×58px with 45px border-radius</li>
              <li>✅ Secondary Button: 303×52px with 6px border-radius and 0.4 opacity</li>
              <li>✅ Feature Cards: 351×442px with big icons, H1 titles, and body text</li>
              <li>✅ Floating WhatsApp Button: 80×80px circular</li>
              <li>✅ Input Components: Mobile-first with 44px+ touch targets</li>
              <li>✅ TextArea Components: Auto-resize and character counting</li>
              <li>✅ Form Validation: Error states and helper text</li>
              <li>✅ Outfit font family throughout</li>
              <li>✅ Your complete color system implementation</li>
              <li>✅ Touch-friendly interactions with accessibility support</li>
              <li>✅ Responsive design with mobile-first approach</li>
            </ul>
          </div>
        </section>
      </main>

      {/* Floating WhatsApp Button - Your specs: 80x80px, circular */}
      <Button 
        variant="floating"
        icon={<WhatsAppIcon size={24} />}
        onClick={() => alert('WhatsApp floating button clicked!')}
        aria-label="Contact us on WhatsApp"
      >
        WhatsApp
      </Button>
    </div>
  )
}

export default App
