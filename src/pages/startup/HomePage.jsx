import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Icon } from '../../components/ui'
import { FeatureCard } from '../../components/cards'
import './HomePage.css'

// Import images
import section1Image from '../../assets/images/section1.png'
import section2Image from '../../assets/images/section2.png'
import section5Image from '../../assets/images/section5.png'
import taotterLogo from '../../assets/logo/Taotter_logo.svg'

const HomePage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const navigate = useNavigate()

  // Sample testimonial data
  const testimonials = [
    {
      text: "Taotter helped us scale our startup team quickly and efficiently. Their talent pool is exceptional and the process was seamless.",
      customerLogo: taotterLogo, // Using Taotter logo as placeholder
      name: "Sarah Johnson",
      title: "CEO",
      company: "TechStart Inc."
    },
    {
      text: "The funding and advisory support we received through Taotter was game-changing for our startup's growth trajectory.",
      customerLogo: taotterLogo,
      name: "Michael Chen",
      title: "Founder",
      company: "InnovateLabs"
    },
    {
      text: "Outstanding concierge service! They handled everything from talent sourcing to project management seamlessly.",
      customerLogo: taotterLogo,
      name: "Emily Rodriguez",
      title: "CTO",
      company: "StartupVision"
    }
  ]

  // Sample blog data
  const blogPosts = [
    {
      image: section1Image, // Using existing images as placeholders
      date: "Dec 15, 2024",
      author: "Alex Thompson",
      title: "10 Essential Tips for Early-Stage Startup Success",
      slug: "startup-success-tips"
    },
    {
      image: section2Image,
      date: "Dec 10, 2024", 
      author: "Maria Garcia",
      title: "How to Build Your MVP in 30 Days",
      slug: "build-mvp-30-days"
    },
    {
      image: section5Image,
      date: "Dec 5, 2024",
      author: "David Kim",
      title: "Funding Strategies That Actually Work",
      slug: "funding-strategies"
    }
  ]

  // Comparison table data
  const comparisonFeatures = [
    "Qualified Talent Sourcing",
    "Project Management", 
    "Founder & Angel Community",
    "Funding & Advisors",
    "Time Investment Required",
    "Payment Model",
    "Cost of Service"
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleHireTaotter = () => {
    navigate('/mvp')
  }

  return (
    <div className="homepage">
      {/* Section 1 - Hero */}
      <section className="hero-section">
        <div className="container-hero">
          <div className="hero-content">
            <div className="hero-text">
              <div className="gradient-line">
                <span>Lean Startup Outsourcing</span>
              </div>
              
              <h1 className="hero-title">
                Effortless Hiring<br />
                & Funding
              </h1>
              
              <h2 className="hero-subtitle">For Startups</h2>
              
              <div className="hero-buttons">
                <Button 
                  variant="primary" 
                  className="btn-hire-taotter"
                  onClick={handleHireTaotter}
                >
                  Hire a Taotter
                </Button>
                <Button 
                  variant="secondary" 
                  className="btn-hire-team"
                >
                  Hire Your Own Team
                </Button>
              </div>
            </div>
            
            <div className="hero-image">
              <img src={section1Image} alt="Taotter Services" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - How It Works */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-content">
            <div className="section-image">
              <img src={section2Image} alt="How Taotter Works" />
            </div>
            
            <div className="section-text">
              <h1>How Taotter Works</h1>
              
              <div className="steps">
                <div className="step">
                  <strong>Step 1:</strong> Tell us about your project needs and requirements
                </div>
                <div className="step">
                  <strong>Step 2:</strong> We match you with qualified experts from our network
                </div>
                <div className="step">
                  <strong>Step 3:</strong> Start collaborating and building your startup vision
                </div>
              </div>
              
              <a href="#" className="details-link">
                Get all details 
                <Icon name="Arrow-right" size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Services */}
      <section className="services-section">
        <div className="container">
          <h1>Lean Startup Services</h1>
          
          <p>
            We provide comprehensive support for startups at every stage of their journey, 
            from initial concept to scaling and growth.
          </p>
          
          <p>
            Our integrated approach combines talent sourcing, project management, 
            and strategic guidance to accelerate your startup's success.
          </p>
          
          <div className="feature-cards">
            <FeatureCard
              icon="rocket"
              title="Concierge Service"
              description="End-to-end project management and support for your startup initiatives with dedicated account management."
            />
            <FeatureCard
              icon="Users"
              title="Talent Marketplace"
              description="Access to a curated network of qualified professionals and experts ready to join your startup team."
            />
            <FeatureCard
              icon="briefcase"
              title="Funding & Advisors"
              description="Connect with investors, mentors, and industry experts to secure funding and strategic guidance."
            />
          </div>
        </div>
      </section>

      {/* Section 4 - Comparison */}
      <section className="comparison-section">
        <div className="container">
          <h1>Taotter vs. Other Services</h1>
          <p>See how Taotter stands out from traditional freelance platforms and agencies</p>
          
          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Features</th>
                  <th>
                    <img src={taotterLogo} alt="Taotter" className="taotter-logo" />
                  </th>
                  <th>Others</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, index) => (
                  <tr key={index}>
                    <td>{feature}</td>
                    <td className="check-cell">
                      <Icon name="check-mark-circle" size={20} className="check-icon" />
                    </td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 5 - Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="testimonials-content">
            <img src={section5Image} alt="Customer Success" className="testimonials-badge" />
            
            <div className="testimonials-header">
              <h1>What Our Customers Are Saying</h1>
              <div className="testimonial-nav">
                <button onClick={prevTestimonial} className="nav-btn">
                  <Icon name="Arrow-left" size={20} />
                </button>
                <button onClick={nextTestimonial} className="nav-btn">
                  <Icon name="Arrow-right" size={20} />
                </button>
              </div>
            </div>
            
            <div className="testimonial-card">
              <p className="testimonial-text">
                "{testimonials[currentTestimonial].text}"
              </p>
              
              <div className="customer-info">
                <img 
                  src={testimonials[currentTestimonial].customerLogo} 
                  alt="Customer Logo" 
                  className="customer-logo"
                />
                <h2 className="customer-name">
                  {testimonials[currentTestimonial].name}
                </h2>
                <div className="customer-title">
                  {testimonials[currentTestimonial].title}
                  <span className="separator">|</span>
                  {testimonials[currentTestimonial].company}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6 - Blog */}
      <section className="blog-section">
        <div className="container">
          <h2 className="blog-label">Blog</h2>
          <h1>Our latest Tips, Tricks & Strategies for your startup</h1>
          
          <div className="blog-cards">
            {blogPosts.map((post, index) => (
              <div key={index} className="blog-card">
                <img src={post.image} alt={post.title} className="blog-image" />
                
                <div className="blog-content">
                  <div className="blog-meta">
                    <span className="blog-date">
                      <Icon name="Calendar" size={16} />
                      {post.date}
                    </span>
                    <span className="blog-author">
                      <Icon name="User" size={16} />
                      {post.author}
                    </span>
                  </div>
                  
                  <h2 className="blog-title">{post.title}</h2>
                  
                  <a href={`/blog/${post.slug}`} className="read-more">
                    Read Post 
                    <Icon name="Arrow-right" size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7 - CTA */}
      <section className="cta-section">
        <div className="container">
          <h1>Ready to Get Started?</h1>
          <h2>Chat with us today!</h2>
          <Button className="cta-button">
            Start Chat
          </Button>
        </div>
      </section>
    </div>
  )
}

export default HomePage
