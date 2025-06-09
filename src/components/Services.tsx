import { useState, useEffect, useRef } from 'react'

interface Service {
  title: string
  description: string
  skills: string[]
}

const services: Service[] = [
  {
    title: 'Web Development',
    description: 'Building modern, responsive websites and web applications with cutting-edge technologies.',
    skills: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Next.js']
  },
  {
    title: 'UI/UX Design',
    description: 'Creating intuitive and beautiful user interfaces that provide exceptional user experiences.',
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Design Systems']
  },
  {
    title: 'Community Building',
    description: 'Developing and growing tech communities, organizing events, and fostering collaboration.',
    skills: ['Event Management', 'Social Media', 'Content Creation', 'Networking', 'Leadership']
  },
  {
    title: '1:1 Mentoring Sessions',
    description: 'Personalized mentoring sessions for entry test preparation, career guidance, and academic support for aspiring CS students.',
    skills: ['Entry Test Prep', 'Career Counseling', 'Academic Support', 'Goal Setting', 'Study Planning']
  }
]

const Services = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null)
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
      <div className="max-w-6xl mx-auto">
        <h2 className="font-mono text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-light-text">
          ~/services
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="font-mono mb-2">
                <span className="text-accent-red">$</span>
                <span className="text-light-text ml-2">cat {service.title.toLowerCase().replace(/\s+/g, '-')}.service</span>
              </div>
              
              <div className="ml-4 border-l-2 border-gray-600 pl-4 pb-6">
                <h3 className="font-display text-xl font-semibold text-light-text mb-3 group-hover:text-accent-red transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-4 font-sans leading-relaxed">
                  {service.description}
                </p>
                
                <div className={`space-y-2 transition-all duration-200 opacity-100 md:opacity-0 ${hoveredService === index ? 'md:opacity-100' : ''}`}>
                  <div className="font-mono text-sm text-gray-500 mb-2">
                    Technologies & Skills:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {service.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-gray-800 text-gray-300 text-xs font-mono rounded border border-gray-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services 