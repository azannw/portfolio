import { useState, useEffect } from 'react'

const Hero = () => {
  const [userIP, setUserIP] = useState('127.0.0.1')
  const [displayedText, setDisplayedText] = useState('')
  const [displayedThirdLine, setDisplayedThirdLine] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [showThirdCursor, setShowThirdCursor] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [thirdLineComplete, setThirdLineComplete] = useState(false)
  
  const targetText = "I'm Azan Waseem"
  const thirdLineText = "& I love to build stuff"
  
  // Fetch user's IP address
  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json')
        const data = await response.json()
        setUserIP(data.ip)
      } catch (error) {
        console.log('Could not fetch IP:', error)
        // Keep default IP if fetch fails
      }
    }
    
    fetchIP()
  }, [])
  
  // First typewriter animation
  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex <= targetText.length) {
        setDisplayedText(targetText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        setAnimationComplete(true)
        setShowCursor(false)
        // Start third line animation after a brief pause
        setTimeout(() => {
          setShowThirdCursor(true)
        }, 500)
      }
    }, 100 + Math.random() * 100) // Variable delay for realistic typing
    
    return () => clearInterval(typingInterval)
  }, [])
  
  // Third line typewriter animation
  useEffect(() => {
    if (!animationComplete) return
    
    let currentIndex = 0
    const thirdLineInterval = setInterval(() => {
      if (currentIndex <= thirdLineText.length) {
        setDisplayedThirdLine(thirdLineText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(thirdLineInterval)
        setThirdLineComplete(true)
        // Hide cursor after animation completes
        setTimeout(() => setShowThirdCursor(false), 2000)
      }
    }, 80 + Math.random() * 80) // Slightly faster for the third line
    
    return () => clearInterval(thirdLineInterval)
  }, [animationComplete])

  return (
    <section className="min-h-screen flex flex-col justify-start md:justify-center items-start px-6 md:px-12 lg:px-24 pt-32 sm:pt-40 md:pt-20 lg:pt-0">
      <div className="w-full max-w-5xl">
        {/* IP Address Line */}
        <div className="font-mono text-lg md:text-xl lg:text-2xl font-medium mb-3 md:mb-4">
          <span className="text-light-text">Hi </span>
          <span className="text-accent-red">{userIP}</span>
        </div>
        
        {/* Typewriter Animation Line */}
        <div className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight">
          <span className="text-light-text">{displayedText}</span>
          {showCursor && !animationComplete && (
            <span className="typewriter-cursor text-light-text">|</span>
          )}
        </div>
        
        {/* Third Line with Typewriter */}
        <div className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-light-text leading-tight">
          <span>{displayedThirdLine}</span>
          {showThirdCursor && !thirdLineComplete && (
            <span className="typewriter-cursor text-light-text">|</span>
          )}
        </div>
        
        {/* Subtitle */}
        <div className="mt-8 md:mt-12">
          <p className="font-sans text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed">
            Computer Science student at FAST NUCES, building communities, creating solutions, 
            and exploring the intersection of AI and development.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero 