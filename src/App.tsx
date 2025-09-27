import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Community from './components/Community'
import Blog from './components/Blog'
import Contact from './components/Contact'
import { Analytics } from '@vercel/analytics/react'

function MainApp() {
  const location = useLocation()
  const isBlogPost = location.pathname.startsWith('/blog/') && location.pathname !== '/blog/'

  if (isBlogPost) {
    // Only show blog component for individual blog posts
    return (
      <div className="min-h-screen bg-dark-bg text-light-text">
        <Navbar />
        <div className="pt-16">
          <Blog />
        </div>
        <Analytics />
      </div>
    )
  }

  // Show the main portfolio page
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<MainApp />} />
      </Routes>
    </Router>
  )
}

export default App 