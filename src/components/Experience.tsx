import { useEffect, useRef } from 'react'

interface ExperienceItem {
  title: string
  company: string
  location: string
  period: string
  description: string[]
}

const experiences: ExperienceItem[] = [
  {
    title: 'Sales Development Representative',
    company: 'Novasphere Solutions',
    location: 'Remote',
    period: 'Aug. 2025 – Sep. 2025',
    description: [
      'Boosted LinkedIn post reach by 10x through content and profile rebranding initiatives.',
      'Researched and implemented a new segmenting and engagement strategy to increase visibility and inbound leads.',
      'Designed and executed lead-generation workflows using LinkedIn Sales Navigator and targeted outreach.',
      'Created marketing strategies and B2B tools to drive high-value B2B sales.'
    ]
  },
  {
    title: 'Sales & Marketing Associate',
    company: 'Quirkydock',
    location: 'Remote',
    period: 'Jul. 2025 – Present',
    description: [
      'Successfully closed deals with high-value clients through strategic prospecting, pitching, and negotiation.',
      'Developed branding strategies, scripts, and creative campaigns positioning Quirkydock in new markets.',
      'Built and delivered client-facing decks and proposals using Google Docs/Slides and AI tools.',
      'Executed cold-email campaigns and lead research to drive pipeline growth.'
    ]
  }
]

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          }
        })
      },
      { threshold: 0.1, rootMargin: '-50px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="scroll-animate py-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-mono text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-light-text">
          ~/experience
        </h2>
        
        <div className="space-y-8 md:space-y-12">
          {experiences.map((exp, index) => (
            <div key={index}>
              <div className="font-mono mb-4 text-lg md:text-xl">
                <span className="text-accent-red">$</span>
                <span className="text-light-text ml-2">cat {exp.company.toLowerCase().replace(/\s+/g, '-')}.experience</span>
              </div>
              
              <div className="ml-4 border-l-2 border-gray-600 pl-4 pb-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl font-semibold text-light-text mb-1">
                      {exp.title}
                    </h3>
                    <div className="font-mono text-accent-red text-lg mb-2">
                      {exp.company} • {exp.location}
                    </div>
                  </div>
                  <div className="font-mono text-gray-400 text-lg md:text-right">
                    {exp.period}
                  </div>
                </div>
                
                <ul className="space-y-3 mt-4">
                  {exp.description.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-400 font-sans leading-relaxed flex text-lg md:text-xl">
                      <span className="text-accent-red mr-3 mt-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience 