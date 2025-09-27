import { useEffect, useRef } from 'react'

const About = () => {
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
    <section ref={sectionRef} className="scroll-animate pt-6 pb-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-mono text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-light-text">
          ~/about
        </h2>
        
        <div className="font-mono mb-4 text-lg md:text-xl">
          <span className="text-accent-red">$</span>
          <span className="text-light-text ml-2">cat about-azan.txt</span>
        </div>
        
        <div className="ml-4 border-l-2 border-gray-600 pl-4">
          <div className="space-y-6 md:space-y-8">
            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed font-sans text-gray-300">
              Hi, I am Azan. I study Computer Science at FAST Islamabad but I am not just a tech student. 
              I like exploring new fields, reading and watching documentaries, meeting people and trying new ideas.
            </p>
            
            <p className="text-lg md:text-xl leading-relaxed font-sans text-gray-400">
              In 2024 I started CS Connect Pakistan, which has grown into the biggest online community for 
              CS students in the country. I host podcasts and sessions where I talk about tech, student life 
              and career tips that actually help. Through my podcasts I also try to highlight Pakistanis who 
              are doing amazing work in Silicon Valley, FAANG and other top companies around the world. 
              It is my small effort to show their stories and inspire others in the technology field.
            </p>
            
            <p className="text-lg md:text-xl leading-relaxed font-sans text-gray-400">
              I have also stepped into the corporate side. At Quirkydock and Novasphere Solutions I worked 
              on sales, marketing, content and creative strategy. I ran LinkedIn campaigns, built proposals 
              and helped close real deals. These experiences taught me how to mix tech skills with business 
              and communication.
            </p>

            <p className="text-lg md:text-xl leading-relaxed font-sans text-gray-400">
              On campus I like competing too. My team won the FAST Prompt Engineering Competition and was 
              runner up in a coding contest hosted at our university.
            </p>

            <p className="text-lg md:text-xl leading-relaxed font-sans text-gray-400">
              Outside work and studies you will find me eating out, exploring new topics, watching 
              documentaries and talking with people about ideas. This website is my place to share my 
              journey, projects and interests in one space.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About 