import { Outlet } from 'react-router-dom'
import { Header, Footer } from '../components/layout'
import TaotterLogo from '../assets/logo/Taotter_logo.svg'
import './StartupLayout.css'

const StartupLayout = () => {
  return (
    <div className="startup-layout">
      <Header logoImage={TaotterLogo} />
      <main className="startup-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default StartupLayout
