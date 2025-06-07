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
    <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-mono text-2xl md:text-3xl font-bold mb-12 text-light-text">
          ~/community
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Community Description */}
          <div>
            <div className="font-mono mb-4">
              <span className="text-accent-red">$</span>
              <span className="text-light-text ml-2">cat cs-connect-pakistan.md</span>
            </div>
            
            <div className="ml-4 border-l-2 border-gray-600 pl-4">
              <h3 className="font-display text-2xl font-bold text-light-text mb-4">
                CS Connect Pakistan
              </h3>
              <div className="mb-4">
                <a 
                  href="https://csconnect.pk" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-accent-red hover:underline transition-colors"
                >
                  → csconnect.pk
                </a>
              </div>
              <p className="text-gray-400 mb-6 font-sans leading-relaxed">
                Pakistan's largest Computer Science student community, connecting aspiring developers, 
                researchers, and tech enthusiasts across the country. We bridge the gap between 
                academic learning and industry requirements.
              </p>
              
              <div className="space-y-3">
                <h4 className="font-mono text-lg font-semibold text-light-text">
                  What we offer:
                </h4>
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-accent-red mr-3 flex-shrink-0">→</span>
                      <span className="text-gray-400 font-sans">{feature}</span>
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
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-gray-900/50 rounded-lg border border-gray-800">
                    <div className="font-mono text-2xl md:text-3xl font-bold text-accent-red mb-2">
                      {stat.value}
                    </div>
                    <div className="font-sans text-sm text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-gray-900/30 rounded-lg border border-gray-800">
                <h4 className="font-mono text-lg font-semibold text-light-text mb-3">
                  Join the Community
                </h4>
                <p className="text-gray-400 font-sans text-sm mb-4">
                  Connect with fellow CS students, share knowledge, and grow together in Pakistan's 
                  most active tech community.
                </p>
                <div className="flex flex-row gap-3">
                  <a 
                    href="https://discord.gg/gWyvnmSRRF" 
                    className="inline-flex items-center px-4 py-2 bg-accent-red text-white font-mono text-sm rounded hover:bg-red-600 transition-colors"
                  >
                    Join Discord
                  </a>
                  <a 
                    href="https://chat.whatsapp.com/IM8Yw2D2Fv2EwbHqnCqVhn" 
                    className="inline-flex items-center px-4 py-2 border border-gray-600 text-gray-300 font-mono text-sm rounded hover:border-gray-500 transition-colors"
                  >
                    WhatsApp Community
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