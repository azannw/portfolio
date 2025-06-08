import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
      setActiveSection(sectionId);
      
      // Keep the active state for a brief moment to show the orange color
      setTimeout(() => {
        setActiveSection('');
      }, 1000);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-2xl font-bold text-white hover:text-accent-red transition-colors font-mono focus:outline-none"
            >
              <span className="text-accent-red">aw.</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => scrollToSection('about')}
                className={`px-3 py-2 text-sm font-medium transition-colors focus:outline-none ${
                  activeSection === 'about' 
                    ? 'text-accent-red' 
                    : 'text-gray-300 hover:text-accent-red'
                }`}
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className={`px-3 py-2 text-sm font-medium transition-colors focus:outline-none ${
                  activeSection === 'projects' 
                    ? 'text-accent-red' 
                    : 'text-gray-300 hover:text-accent-red'
                }`}
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className={`px-3 py-2 text-sm font-medium transition-colors focus:outline-none ${
                  activeSection === 'services' 
                    ? 'text-accent-red' 
                    : 'text-gray-300 hover:text-accent-red'
                }`}
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('community')}
                className={`px-3 py-2 text-sm font-medium transition-colors focus:outline-none ${
                  activeSection === 'community' 
                    ? 'text-accent-red' 
                    : 'text-gray-300 hover:text-accent-red'
                }`}
              >
                Community
              </button>
              <button
                onClick={() => scrollToSection('blog')}
                className={`px-3 py-2 text-sm font-medium transition-colors focus:outline-none ${
                  activeSection === 'blog' 
                    ? 'text-accent-red' 
                    : 'text-gray-300 hover:text-accent-red'
                }`}
              >
                Blog
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`px-3 py-2 text-sm font-medium transition-colors focus:outline-none ${
                  activeSection === 'contact' 
                    ? 'text-accent-red' 
                    : 'text-gray-300 hover:text-accent-red'
                }`}
              >
                Contact
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/95 backdrop-blur-sm">
              <button
                onClick={() => scrollToSection('about')}
                className={`block px-3 py-2 text-base font-medium w-full text-left transition-colors focus:outline-none ${
                  activeSection === 'about' 
                    ? 'text-accent-red' 
                    : 'text-gray-300 hover:text-accent-red'
                }`}
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className={`block px-3 py-2 text-base font-medium w-full text-left transition-colors focus:outline-none ${
                  activeSection === 'projects' 
                    ? 'text-accent-red' 
                    : 'text-gray-300 hover:text-accent-red'
                }`}
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className={`block px-3 py-2 text-base font-medium w-full text-left transition-colors focus:outline-none ${
                  activeSection === 'services' 
                    ? 'text-accent-red' 
                    : 'text-gray-300 hover:text-accent-red'
                }`}
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('community')}
                className={`block px-3 py-2 text-base font-medium w-full text-left transition-colors focus:outline-none ${
                  activeSection === 'community' 
                    ? 'text-accent-red' 
                    : 'text-gray-300 hover:text-accent-red'
                }`}
              >
                Community
              </button>
              <button
                onClick={() => scrollToSection('blog')}
                className={`block px-3 py-2 text-base font-medium w-full text-left transition-colors focus:outline-none ${
                  activeSection === 'blog' 
                    ? 'text-accent-red' 
                    : 'text-gray-300 hover:text-accent-red'
                }`}
              >
                Blog
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`block px-3 py-2 text-base font-medium w-full text-left transition-colors focus:outline-none ${
                  activeSection === 'contact' 
                    ? 'text-accent-red' 
                    : 'text-gray-300 hover:text-accent-red'
                }`}
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 