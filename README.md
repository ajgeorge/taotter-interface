# Startup Management Platform

A modern, mobile-first React application for startup management with a comprehensive component library and state management system.

## 🚀 Features

### **Component Library**

- **Mobile-first design** with responsive breakpoints
- **Exact specification compliance** with your Figma designs
- **Accessibility-focused** with WCAG guidelines
- **Touch-friendly** 44px minimum touch targets
- **Dark mode support** with system preference detection

### **State Management**

- **Redux Toolkit** with RTK Query for efficient data fetching
- **Comprehensive API layer** for all startup management features
- **Real-time updates** and background synchronization
- **Optimistic updates** for better user experience

### **Design System**

- **Outfit font family** throughout the application
- **Complete color palette** with semantic naming
- **CSS custom properties** for consistent theming
- **Utility classes** for rapid development

## 📱 Built Components

### **Button Components**

✅ **Primary Button**

- Dimensions: 272×58px
- Border radius: 45px
- Customizable colors
- Loading and disabled states

✅ **Secondary Button**

- Dimensions: 303×52px
- Border radius: 6px
- 0.4 opacity default
- Hover state enhancements

✅ **Floating WhatsApp Button**

- Dimensions: 80×80px
- Fully circular design
- Fixed positioning
- WhatsApp green theming

### **Card Components**

✅ **Feature Card**

- Dimensions: 351×442px
- Large icon display (48px)
- H1 title typography
- Body text with overflow handling
- Interactive hover states
- Multiple color variants

### **Icon System**

✅ **SVG Icon Component**

- Dynamic icon loading from assets
- Size and color customization
- Accessibility attributes
- WhatsApp icon included

## 🎨 Design System

### **Typography**

- **Font**: Outfit (300, 400, 500, 600, 700 weights)
- **Mobile-first** font scaling
- **Semantic sizing** (xs, sm, base, lg, xl, 2xl, 3xl, 4xl)

### **Color Palette**

Complete implementation of your color system:

- Gray (25-950 shades)
- Error, Success, Warning states
- Blue, Indigo, Purple variants
- Semantic color mappings

### **Spacing System**

- Consistent 4px base unit
- Responsive spacing scale
- CSS custom properties for easy theming

## 🛠 Tech Stack

- **React 18** with hooks and functional components
- **Redux Toolkit** + RTK Query for state management
- **React Router** for navigation
- **CSS Custom Properties** for theming
- **PropTypes** for component validation
- **Vite** for fast development and building

## 📂 Project Structure

```
src/
├── components/
│   ├── ui/                     # Foundation UI components
│   │   ├── Button/            # Button component with variants
│   │   ├── Icon/              # Icon system with SVG support
│   │   └── index.js           # UI components barrel export
│   ├── cards/                 # Card components
│   │   ├── FeatureCard/       # Large feature cards
│   │   └── index.js           # Cards barrel export
│   └── forms/                 # Form components (coming next)
├── store/
│   ├── api/                   # RTK Query API slices
│   ├── slices/                # Redux state slices
│   ├── hooks.js               # Typed Redux hooks
│   └── store.js               # Main store configuration
├── styles/
│   ├── variables.css          # CSS custom properties
│   └── globals.css            # Global styles and utilities
├── utils/
│   └── colors.js              # Color system utilities
└── assets/
    ├── icons/                 # SVG icon library
    └── colors/                # Design tokens
```

## 🚀 Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start development server**

   ```bash
   npm run dev
   ```

3. **View the application**
   Open http://localhost:5173 in your browser

## 📱 Mobile-First Approach

All components are designed mobile-first with these principles:

- **Touch targets**: Minimum 44px for accessibility
- **Responsive breakpoints**: 640px, 768px, 1024px, 1280px
- **Flexible layouts**: Grid and flexbox for adaptability
- **Progressive enhancement**: Works on all devices

## 🎯 Component Usage

### Button Examples

```jsx
import { Button, WhatsAppIcon } from './components/ui'

// Primary button with your exact specs
<Button variant="primary" onClick={handleClick}>
  Get Started
</Button>

// Secondary button with your exact specs
<Button variant="secondary" onClick={handleClick}>
  Learn More
</Button>

// Floating WhatsApp button
<Button
  variant="floating"
  icon={<WhatsAppIcon size={24} />}
  onClick={handleWhatsApp}
>
  Contact
</Button>
```

### Feature Card Examples

```jsx
import { FeatureCard } from "./components/cards";

<FeatureCard
  icon="briefcase"
  title="Business Planning"
  description="Create comprehensive business plans..."
  onClick={handleClick}
  variant="primary"
/>;
```

## 🔧 Customization

### Colors

```css
:root {
  --color-primary: #2e90fa;
  --color-secondary: #667085;
  /* All your design tokens available */
}
```

### Components

All components accept className and style props for customization while maintaining design system consistency.

## 🚧 Next Steps

The foundation is now complete! Ready to build:

1. **Form Components** (Input, Dropdown, TextArea, RadioButton, Slider)
2. **Multi-step Forms** with progress indicators
3. **Layout Components** (Header, Footer, Sidebar)
4. **Chat Components** (Bubbles, List, Search)
5. **Tier Cards** for pricing/packages
6. **Collapsible Components** for interactive content

## 📄 License

Private project for startup management platform development.
