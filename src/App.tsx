import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Services from './components/Services'
import Community from './components/Community'
import Blog from './components/Blog'
import Contact from './components/Contact'
import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
    <div className="min-h-screen bg-dark-bg text-light-text">
      <Navbar />
      <div className="pt-16"> {/* Add padding-top to account for fixed navbar */}
        <div id="hero">
          <Hero />
        </div>
        <div id="about">
          <About />
        </div>
        <div id="projects">
          <Projects />
        </div>
        <div id="services">
          <Services />
        </div>
        <div id="community">
          <Community />
        </div>
        <div id="blog">
          <Blog />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </div>
      <Analytics />
    </div>
  )
}

export default App 