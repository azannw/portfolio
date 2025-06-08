import { useState } from 'react'

interface Project {
  title: string
  description: string
  link: string
  type: 'github' | 'live'
}

const projects: Project[] = [
  {
    title: 'UniCalc',
    description: 'University merit calculator helping students calculate admission chances',
    link: 'https://github.com/azannw/unicalc',
    type: 'github'
  },
  {
    title: 'StrikeLock',
    description: 'Professional website for a war/OSINT company with modern design',
    link: 'https://github.com/azannw/strikelock',
    type: 'github'
  },
  {
    title: 'CS Connect Pakistan',
    description: 'Community platform connecting Computer Science students across Pakistan',
    link: 'https://github.com/azan/cs-connect',
    type: 'github'
  },
  {
    title: 'Fast Aggregate Calculator',
    description: 'High-performance calculator for computing aggregates and statistical metrics efficiently',
    link: 'https://github.com/azannw/fast-aggregate-calculator',
    type: 'github'
  }
]

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  return (
    <section className="py-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-mono text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-light-text">
          ~/projects
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="font-mono mb-2 text-sm md:text-base">
                <span className="text-accent-red">$</span>
                <span className="text-light-text ml-2">ls -la {project.title.toLowerCase().replace(/\s+/g, '-')}</span>
              </div>
              
              <div className="ml-4 border-l-2 border-gray-600 pl-4 pb-6">
                <h3 className="font-display text-lg md:text-xl font-semibold text-light-text mb-3 group-hover:text-accent-red transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 font-sans leading-relaxed text-sm md:text-base">
                  {project.description}
                </p>
                
                <div className={`transition-all duration-200 opacity-100 md:opacity-0 ${hoveredProject === index ? 'md:opacity-100' : ''}`}>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center font-mono text-sm text-accent-red hover:underline transition-all duration-200"
                  >
                    {project.type === 'github' ? '→ view source' : '→ visit site'}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects 