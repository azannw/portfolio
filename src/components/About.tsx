const About = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-mono text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-light-text">
          ~/about
        </h2>
        
        <div className="font-mono mb-4">
          <span className="text-accent-red">$</span>
          <span className="text-light-text ml-2">cat about-azan.txt</span>
        </div>
        
        <div className="ml-4 border-l-2 border-gray-600 pl-4">
          <div className="space-y-6">
            <p className="text-lg md:text-xl leading-relaxed font-sans text-gray-300">
              I'm a Computer Science student at FAST NUCES with a passion for building 
              meaningful solutions that bridge technology and real-world impact.
            </p>
            
            <p className="text-lg leading-relaxed font-sans text-gray-400">
              My journey spans community building, where I've created CS Connect Pakistan 
              to unite thousands of students; podcasting, where I explore tech trends and 
              share insights; and development, where I craft applications that solve actual problems.
            </p>
            
            <p className="text-lg leading-relaxed font-sans text-gray-400">
              I believe in the power of AI-augmented development, the importance of strong 
              communities, and the value of sharing knowledge. Whether it's guiding students 
              through university admissions or building the next useful tool, I'm driven by 
              the desire to create positive change through technology.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About 