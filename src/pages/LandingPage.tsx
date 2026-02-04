import { useNavigate } from "react-router-dom"

function LandingPage() {
  const navigate = useNavigate()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-gray-100 overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 -right-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="fixed w-full top-0 left-0 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent cursor-pointer hover:from-purple-300 hover:to-indigo-300 transition-all duration-300" 
            onClick={() => scrollToSection('hero')}
          >
            🧠 Second Brain
          </h1>
          
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('features')}
              className="text-slate-300 hover:text-purple-400 transition-colors duration-300 font-medium"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="text-slate-300 hover:text-purple-400 transition-colors duration-300 font-medium"
            >
              How it Works
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-slate-300 hover:text-purple-400 transition-colors duration-300 font-medium"
            >
              Contact
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/signin')}
              className="px-5 py-2.5 text-sm font-medium text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600 rounded-full transition-all duration-300 hover:bg-slate-800/50"
            >
              Sign In
            </button>
            <button 
              onClick={() => navigate('/signup')}
              className="px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-full transition-all duration-300 shadow-lg shadow-purple-600/25 hover:shadow-purple-500/40"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-purple-300 font-medium">AI-Powered Knowledge Management</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Your Digital
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Second Brain
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Capture, organize, and rediscover your digital knowledge with 
            <span className="text-purple-400 font-medium"> AI-powered intelligence</span>. 
            Never lose track of important content again.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <button 
              onClick={() => navigate('/signup')}
              className="group px-8 py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl transition-all duration-300 shadow-2xl shadow-purple-600/30 hover:shadow-purple-500/50 hover:scale-105"
            >
              Start Building Your Brain
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="px-8 py-4 text-lg font-semibold border-2 border-slate-700 hover:border-purple-500/50 rounded-xl transition-all duration-300 hover:bg-slate-800/50"
            >
              See How It Works
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">10K+</div>
              <div className="text-slate-500 text-sm mt-1">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">1M+</div>
              <div className="text-slate-500 text-sm mt-1">Links Saved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">99%</div>
              <div className="text-slate-500 text-sm mt-1">Uptime</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-slate-600 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-purple-400 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-purple-400 font-semibold text-sm uppercase tracking-wider">Features</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Everything You Need to
              <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"> Organize Knowledge</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Powerful tools designed to help you collect, organize, and retrieve information effortlessly.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Card 1 */}
            <div className="group bg-gradient-to-br from-slate-900/90 to-slate-800/50 border border-slate-800 hover:border-purple-500/50 p-8 rounded-2xl transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Smart Link Saving</h3>
              <p className="text-slate-400 leading-relaxed">Automatically extract metadata, thumbnails, and descriptions from any URL you save.</p>
            </div>

            {/* Card 2 */}
            <div className="group bg-gradient-to-br from-slate-900/90 to-slate-800/50 border border-slate-800 hover:border-purple-500/50 p-8 rounded-2xl transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Intelligent Tags</h3>
              <p className="text-slate-400 leading-relaxed">AI suggests relevant tags based on content, making organization effortless and intuitive.</p>
            </div>

            {/* Card 3 */}
            <div className="group bg-gradient-to-br from-slate-900/90 to-slate-800/50 border border-slate-800 hover:border-purple-500/50 p-8 rounded-2xl transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Share Your Brain</h3>
              <p className="text-slate-400 leading-relaxed">Make your collections public and share knowledge with friends, team, or the world.</p>
            </div>

            {/* Card 4 */}
            <div className="group bg-gradient-to-br from-slate-900/90 to-slate-800/50 border border-slate-800 hover:border-purple-500/50 p-8 rounded-2xl transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-indigo-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Semantic Search</h3>
              <p className="text-slate-400 leading-relaxed">Find anything with AI-powered search that understands context, not just keywords.</p>
            </div>

            {/* Card 5 */}
            <div className="group bg-gradient-to-br from-slate-900/90 to-slate-800/50 border border-slate-800 hover:border-purple-500/50 p-8 rounded-2xl transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">AI Insights</h3>
              <p className="text-slate-400 leading-relaxed">Get intelligent recommendations and discover connections in your saved content.</p>
            </div>

            {/* Card 6 */}
            <div className="group bg-gradient-to-br from-slate-900/90 to-slate-800/50 border border-slate-800 hover:border-purple-500/50 p-8 rounded-2xl transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Secure & Private</h3>
              <p className="text-slate-400 leading-relaxed">Your data is encrypted and private by default. You control what gets shared.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-purple-400 font-semibold text-sm uppercase tracking-wider">How It Works</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Three Simple Steps to
              <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"> Get Started</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg shadow-purple-500/30">
                1
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Save Content</h3>
              <p className="text-slate-400">Paste any link - articles, videos, tweets, documents. We'll extract and store the important information.</p>
              <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-purple-500 to-transparent" />
            </div>

            {/* Step 2 */}
            <div className="relative text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg shadow-indigo-500/30">
                2
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Organize & Tag</h3>
              <p className="text-slate-400">Add tags and let AI help categorize your content automatically for easy retrieval later.</p>
              <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-indigo-500 to-transparent" />
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg shadow-purple-500/30">
                3
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Search & Discover</h3>
              <p className="text-slate-400">Use semantic search to find exactly what you need. AI understands your intent and surfaces relevant content.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border border-purple-500/20 rounded-3xl p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-indigo-600/10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to Build Your
                <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"> Second Brain?</span>
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Join thousands of users who are already organizing their digital knowledge more effectively.
              </p>
              <button 
                onClick={() => navigate('/signup')}
                className="px-10 py-4 text-lg font-semibold bg-white text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-300 shadow-2xl hover:scale-105"
              >
                Get Started for Free
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-purple-400 font-semibold text-sm uppercase tracking-wider">Contact</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Get In Touch
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you!
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/50 border border-slate-800 rounded-2xl p-8">
              <div className="flex flex-col gap-5">
                <a 
                  href="mailto:harshitagrawal1204@gmail.com" 
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 hover:bg-purple-500/10 border border-slate-700 hover:border-purple-500/50 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">Email</div>
                    <div className="text-white font-medium">harshitagrawal1204@gmail.com</div>
                  </div>
                </a>

                <a 
                  href="https://github.com/harshit-agr-12" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 hover:bg-purple-500/10 border border-slate-700 hover:border-purple-500/50 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">GitHub</div>
                    <div className="text-white font-medium">@harshit-agr-12</div>
                  </div>
                </a>

                <a 
                  href="https://x.com/HarshitAgr1204" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 hover:bg-purple-500/10 border border-slate-700 hover:border-purple-500/50 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-800 to-black rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">Twitter / X</div>
                    <div className="text-white font-medium">@HarshitAgr1204</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🧠</span>
              <span className="font-semibold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Second Brain</span>
            </div>
            <p className="text-slate-500 text-sm">© 2026 Second Brain. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-slate-500 hover:text-purple-400 text-sm transition-colors">Privacy</a>
              <a href="#" className="text-slate-500 hover:text-purple-400 text-sm transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage