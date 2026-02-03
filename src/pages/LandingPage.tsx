import { useNavigate } from "react-router-dom"
import Button from "./Brainly/component/Button"

function LandingPage(){
  const navigate = useNavigate()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return(
    <div className="bg-black h-vh w-vw text-gray-200">
      <main className="max-w-5xl mx-auto">
      
        <nav className="flex justify-between items-center sticky w-full top-0 left-0 bg-black/90 backdrop-blur-md text-md px-8 py-4 border-b border-gray-800 z-50">
          <h1 className="text-purple-400 text-2xl font-bold cursor-pointer hover:text-purple-300 transition-colors" onClick={() => scrollToSection('hero')}>
            Second Brain
          </h1>
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('features')}
              className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
            >
              Contact
            </button>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              text="Signin"
              onClick={() => { navigate('/signin')}}
              variant="secondary"
              size="sm"
            />
            <Button 
              text="Signup"
              onClick={() => { navigate('/signup')}}
              variant="primary"
              size="sm"
            />
          </div>
        </nav>

        <section id="hero" className="h-screen relative">
          
          <div className=" mt-16  text-center flex flex-col gap-10 px-4">
            <h1 className="text-6xl font-bold text-orange-500 p-10 font-serif ">Your Digital<br />
            <span className="text-white">Second Brain</span></h1>
            <p className="text-gray-400 max-w-2xl m-auto text-xl text-center">Capture, organize, and rediscover your digital knowledge with AI-powered intelligence. Never lose track of important content again.</p>
            <h2 className="text-4xl mb-4">Welcome to Second Brain</h2>
            <p className="text-lg mb-8">Your personal knowledge management system</p>
            <div className="flex justify-center gap-4">
              <Button 
                text="Get Started"
                onClick={() => { navigate('/signup')}}
                variant="primary"
                size="lg"
              />
              <Button 
                text="Learn More"
                onClick={() => { navigate('/learn-more')}}
                variant="secondary"
                size="lg"
              />
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-black text-center px-4">
          <h2 className="text-4xl font-bold text-purple-400 mb-4">Features</h2>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Organize your ideas, save valuable content, and build your second brain. With Second Brain, you can collect, categorize, and easily retrieve information—and even share your brain with anyone around the world!
          </p>
          
          <h3 className="text-2xl text-purple-300 mb-8">Core Functionality</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
              <div className="text-purple-400 text-4xl mb-4">🔗</div>
              <h4 className="text-xl font-semibold text-white mb-3">Save Links</h4>
              <p className="text-gray-500">Store your essential links and categorize them for future reference.</p>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
              <div className="text-purple-400 text-4xl mb-4">🏷️</div>
              <h4 className="text-xl font-semibold text-white mb-3">Organize by Tags</h4>
              <p className="text-gray-500">Tag your saved links to make them easier to find and group.</p>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
              <div className="text-purple-400 text-4xl mb-4">🌐</div>
              <h4 className="text-xl font-semibold text-white mb-3">Public Sharing</h4>
              <p className="text-gray-500">Share your brain with others by making it public.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
              <div className="text-purple-400 text-4xl mb-4">🔍</div>
              <h4 className="text-xl font-semibold text-white mb-3">Search Functionality</h4>
              <p className="text-gray-500">Enable searching within your saved links for quick access.</p>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
              <div className="text-purple-400 text-4xl mb-4">🤖</div>
              <h4 className="text-xl font-semibold text-white mb-3">AI Integration</h4>
              <p className="text-gray-500">AI-powered insights and recommendations based on your saved links.</p>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-black text-center px-4 border-t border-zinc-800">
          <h2 className="text-4xl font-bold text-purple-400 mb-4">Contact Us</h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you!
          </p>
          <div className="max-w-md mx-auto">
            <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-xl">
              <div className="flex flex-col gap-4">
                <a 
                  href="mailto:harshitagrawal1204@gmail.com" 
                  className="flex items-center justify-center gap-3 text-gray-300 hover:text-purple-400 transition-colors duration-300"
                >
                  <span className="text-2xl">📧</span>
                  <span>contact@secondbrain.com</span>
                </a>
                <a 
                  href="https://github.com/harshit-agr-12" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 text-gray-300 hover:text-purple-400 transition-colors duration-300"
                >
                  <span className="text-2xl">💻</span>
                  <span>GitHub</span>
                </a>
                <a 
                  href="https://x.com//HarshitAgr1204" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 text-gray-300 hover:text-purple-400 transition-colors duration-300"
                >
                  <span className="text-2xl">🐦</span>
                  <span>Twitter</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-6 bg-black border-t border-gray-800 text-center">
          <p className="text-gray-500">© 2025 Second Brain. All rights reserved.</p>
        </footer>
          
      </main>
    </div>
  )
}

export default LandingPage