const Community = () => {
  const stats = [
    { label: 'Active Members', value: '2,000+' },
    { label: 'Universities', value: '50+' },
    { label: 'Events Hosted', value: '5+' },
    { label: 'Success Stories', value: '10+' }
  ]

  const features = [
    'Career guidance and mentorship programs',
    'Technical workshops and coding bootcamps',
    'Industry connections and networking events',
    'Collaborative projects and hackathons',
    'Resource sharing and study groups',
    'Job placement assistance'
  ]

  return (
    <section className="py-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-mono text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-light-text">
          ~/community
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Community Description */}
          <div>
            <div className="font-mono mb-4">
              <span className="text-accent-red">$</span>
              <span className="text-light-text ml-2">cat cs-connect-pakistan.md</span>
            </div>
            
            <div className="ml-4 border-l-2 border-gray-600 pl-4">
              <h3 className="font-display text-xl md:text-2xl font-bold text-light-text mb-4">
                CS Connect Pakistan
              </h3>
              <div className="mb-4">
                <a 
                  href="https://csconnect.pk" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-accent-red hover:underline transition-colors text-sm md:text-base"
                >
                  → csconnect.pk
                </a>
              </div>
              <p className="text-gray-400 mb-6 font-sans leading-relaxed text-base md:text-lg">
                Pakistan's largest Computer Science student community, connecting aspiring developers, 
                researchers, and tech enthusiasts across the country. We bridge the gap between 
                academic learning and industry requirements.
              </p>
              
              <div className="space-y-3">
                <h4 className="font-mono text-base md:text-lg font-semibold text-light-text">
                  What we offer:
                </h4>
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-accent-red mr-3 flex-shrink-0 mt-0.5">→</span>
                      <span className="text-gray-400 font-sans text-sm md:text-base leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Community Stats */}
          <div>
            <div className="font-mono mb-4">
              <span className="text-accent-red">$</span>
              <span className="text-light-text ml-2">./get-community-stats.sh</span>
            </div>
            
            <div className="ml-4 border-l-2 border-gray-600 pl-4">
              <div className="grid grid-cols-2 gap-3 md:gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-3 md:p-4 bg-gray-900/50 rounded-lg border border-gray-800">
                    <div className="font-mono text-xl md:text-2xl lg:text-3xl font-bold text-accent-red mb-2">
                      {stat.value}
                    </div>
                    <div className="font-sans text-xs md:text-sm text-gray-400 leading-tight">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 md:mt-8 p-4 bg-gray-900/30 rounded-lg border border-gray-800">
                <h4 className="font-mono text-base md:text-lg font-semibold text-light-text mb-3">
                  Join the Community
                </h4>
                <p className="text-gray-400 font-sans text-sm leading-relaxed mb-4">
                  Connect with fellow CS students, share knowledge, and grow together in Pakistan's 
                  most active tech community.
                </p>
                <div className="space-y-3">
                  <a 
                    href="https://discord.gg/gWyvnmSRRF"
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="group block w-full p-3 bg-accent-red/10 border border-accent-red/30 rounded-lg hover:bg-accent-red/20 hover:border-accent-red/50 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="font-mono text-accent-red">
                          <span className="text-sm">$</span>
                        </div>
                        <div>
                          <div className="font-mono text-sm md:text-base text-light-text group-hover:text-accent-red transition-colors">
                            → join discord
                          </div>
                          <div className="font-sans text-xs text-gray-400 mt-1">
                            Real-time discussions & events
                          </div>
                        </div>
                      </div>
                      <div className="text-accent-red opacity-70 group-hover:opacity-100 transition-opacity">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z"/>
                        </svg>
                      </div>
                    </div>
                  </a>
                  
                  <a 
                    href="https://chat.whatsapp.com/IM8Yw2D2Fv2EwbHqnCqVhn"
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="group block w-full p-3 bg-gray-800/50 border border-gray-600/50 rounded-lg hover:bg-gray-700/50 hover:border-gray-500/70 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="font-mono text-accent-red">
                          <span className="text-sm">$</span>
                        </div>
                        <div>
                          <div className="font-mono text-sm md:text-base text-light-text group-hover:text-green-400 transition-colors">
                            → whatsapp community
                          </div>
                          <div className="font-sans text-xs text-gray-400 mt-1">
                            Quick updates & announcements
                          </div>
                        </div>
                      </div>
                      <div className="text-green-400 opacity-70 group-hover:opacity-100 transition-opacity">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                        </svg>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Community 