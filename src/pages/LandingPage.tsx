
import { Brain, Search, Sparkles, Cloud, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function LandingPage() {

  const navigate = useNavigate();

  const features = [
    {
      icon: <Search className="w-6 h-6 text-indigo-500" />,
      title: "Vector Search",
      description: "Find answers by meaning, not just keywords.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-indigo-500" />,
      title: "AI-Powered Q&A",
      description: "Ask natural language questions and get context-based answers.",
    },
    {
      icon: <Cloud className="w-6 h-6 text-indigo-500" />,
      title: "Cloud Sync",
      description: "Access your knowledge base from any device.",
    },
    {
      icon: <Lock className="w-6 h-6 text-indigo-500" />,
      title: "Secure & Private",
      description: "Your data is encrypted and never shared.",
    },
  ];

  return (
    <div className="bg-white text-gray-900 font-sans">
      <Navbar />
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
        <Brain className="w-16 h-16 text-indigo-600 mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Your Second Brain, <span className="text-indigo-600">Supercharged with AI</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mb-8">
          Capture, organize, and retrieve your knowledge effortlessly —
          powered by intelligent vector search and LLMs.
        </p>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
          onClick={()=> navigate('/signup')}>
            Get Started
          </button>
          <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition" onClick={()=> navigate('/brainly')}>
            Try Demo
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Second Brain?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            {
              step: "1",
              title: "Capture",
              description: "Add your notes, documents, and ideas into your Second Brain.",
            },
            {
              step: "2",
              title: "Organize",
              description: "Tag and categorize your knowledge for quick retrieval.",
            },
            {
              step: "3",
              title: "Ask & Retrieve",
              description: "Query with natural language and get AI-powered answers.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="text-indigo-600 text-4xl font-bold mb-4">{item.step}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Screenshot / Mockup Placeholder */}
      <section className="bg-gray-50 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">See It in Action</h2>
        <p className="text-gray-600 mb-8">
          A sneak peek of your Second Brain App in action.
        </p>
        <div className="bg-white border border-gray-200 rounded-xl shadow p-8 max-w-4xl mx-auto">
          <img src="/src/assets/brainly.png" />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Turn Your Notes into Knowledge</h2>
        <p className="text-gray-600 mb-8">
          Start building your AI-powered Second Brain today.
        </p>    
      </section>
    </div>
  );
}
