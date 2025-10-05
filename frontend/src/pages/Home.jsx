import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { MessageCircle, Shield, Zap, Users, ArrowRight, CheckCircle } from "lucide-react";

export default function Home() {
  const authUser = useAuthStore((state) => state.authUser);
  
  const features = [
    {
      icon: Shield,
      title: "Secure Messaging",
      description: "End-to-end encryption to keep your conversations private and secure."
    },
    {
      icon: Zap,
      title: "Real-time Chat",
      description: "Instant message delivery with typing indicators and read receipts."
    },
    {
      icon: Users,
      title: "Cross Platform",
      description: "Seamlessly works across web, mobile, and desktop devices."
    }
  ];

  const benefits = [
    "Instant message delivery",
    "Media sharing support",
    "Online status tracking",
    "Sound notifications",
    "Modern interface",
    "Mobile responsive"
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-hidden" style={{
      background: 'linear-gradient(45deg, #0f172a 0%, #1e293b 100%)',
      backgroundImage: `
        radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)
      `
    }}>
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 md:px-20 py-16 sm:py-20 lg:py-32">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-4 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center min-h-[500px] sm:min-h-[600px]">
            {/* Left content */}
            <div className="fade-in lg:pr-8">
              <div className="inline-flex items-center gap-3 px-5 py-3 glass-effect rounded-full border border-blue-400/30 mb-10 hover-lift">
                <MessageCircle className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-semibold text-blue-400">Welcome to the Future of Messaging</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] mb-6 sm:mb-8">
                <span className="text-white">Connect with</span>
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mt-1 sm:mt-2">
                  ChatFlow
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed mb-8 sm:mb-10 max-w-2xl">
                Experience <span className="text-white font-semibold">seamless communication</span> with advanced features, modern design, and enterprise-grade security.
              </p>

              {/* Benefits List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-10 sm:mb-12">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-2 sm:gap-3 fade-in glass-effect px-3 sm:px-4 py-2 sm:py-3 rounded-xl hover-lift border border-green-400/20"
                    style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                  >
                    <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-green-400/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3 sm:w-4 h-3 sm:h-4 text-green-400" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-gray-200">{benefit}</span>
                  </div>
                ))}
              </div>
              
              {!authUser ? (
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                  <Link
                    to="/signup"
                    className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-8 sm:px-10 py-4 sm:py-5 gradient-accent hover:gradient-accent-hover rounded-2xl font-bold text-base sm:text-lg smooth-transition hover-lift hover-glow shadow-xl hover:shadow-2xl"
                  >
                    Get Started Free
                    <ArrowRight className="w-5 sm:w-6 h-5 sm:h-6 group-hover:translate-x-2 smooth-transition" />
                  </Link>
                  <Link
                    to="/login"
                    className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-8 sm:px-10 py-4 sm:py-5 glass-effect rounded-2xl font-bold text-base sm:text-lg hover:bg-blue-500/20 smooth-transition hover-lift border border-blue-400/40 hover:border-blue-400/60"
                  >
                    Sign In
                    <ArrowRight className="w-5 sm:w-6 h-5 sm:h-6 group-hover:translate-x-2 smooth-transition" />
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-5">
                  <Link
                    to="/chat"
                    className="group inline-flex items-center justify-center gap-3 px-10 py-5 gradient-accent hover:gradient-accent-hover rounded-2xl font-bold text-lg smooth-transition hover-lift hover-glow shadow-xl hover:shadow-2xl"
                  >
                    Open ChatFlow
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 smooth-transition" />
                  </Link>
                </div>
              )}
            </div>

            {/* Right illustration */}
            <div className="relative fade-in lg:pl-8" style={{ animationDelay: '0.3s' }}>
              <div className="relative">
                <div className="glass-effect rounded-3xl p-10 hover-lift smooth-transition border border-blue-400/20">
                  <div className="relative">
                    <img
                      src="/undraw_text-messages_978a.svg"
                      alt="ChatFlow messaging illustration"
                      className="w-full h-auto max-w-lg mx-auto drop-shadow-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent rounded-2xl"></div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 w-20 h-20 glass-effect rounded-2xl flex items-center justify-center smooth-bounce border border-blue-400/30">
                  <MessageCircle className="w-10 h-10 text-blue-400" strokeWidth={1.5} />
                </div>
                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-xl hover-lift">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                </div>
                <div className="absolute top-1/2 -left-4 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center smooth-bounce" style={{animationDelay: '1s'}}>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative px-4 sm:px-6 md:px-20 py-16 sm:py-20 lg:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 sm:mb-20 fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-effect rounded-full border border-purple-400/30 mb-8">
              <Shield className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-semibold text-purple-400">Premium Features</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 leading-tight">
              <span className="text-white">Why Choose</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mt-1 sm:mt-2">
                ChatFlow?
              </span>
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Discover the <span className="text-white font-semibold">powerful features</span> that make ChatFlow the perfect choice for modern communication.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const gradients = [
                'from-blue-500 to-cyan-500',
                'from-purple-500 to-pink-500', 
                'from-green-500 to-emerald-500'
              ];
              return (
                <div
                  key={index}
                  className="relative glass-effect rounded-2xl sm:rounded-3xl p-6 sm:p-8 card-hover hover-lift fade-in group border border-gray-600/30 hover:border-blue-400/50 overflow-hidden"
                  style={{ animationDelay: `${0.4 + index * 0.2}s` }}
                >
                  {/* Background gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} opacity-5 group-hover:opacity-10 smooth-transition`}></div>
                  
                  <div className="relative z-10">
                    <div className={`w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-r ${gradients[index]} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 smooth-transition shadow-lg`}>
                      <Icon className="w-8 sm:w-10 h-8 sm:h-10 text-white" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white group-hover:text-blue-100 smooth-transition">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-base sm:text-lg group-hover:text-gray-200 smooth-transition">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 smooth-transition bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-xl"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 sm:px-6 md:px-20 py-16 sm:py-20 lg:py-32">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative">
          <div className="glass-effect rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 fade-in border border-blue-400/20 hover:border-blue-400/40 smooth-transition overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 glass-effect rounded-full border border-green-400/30 mb-8">
                <Users className="w-4 h-4 text-green-400" />
                <span className="text-sm font-semibold text-green-400">Join Our Community</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 leading-tight">
                <span className="text-white">Ready to Start</span>
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mt-1 sm:mt-2">
                  Your Journey?
                </span>
              </h2>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-10 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
                Join <span className="text-white font-bold">thousands of users</span> who trust ChatFlow for their daily communication needs.
              </p>
              
              {!authUser ? (
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                  <Link
                    to="/signup"
                    className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-10 sm:px-12 py-5 sm:py-6 gradient-accent hover:gradient-accent-hover rounded-2xl font-bold text-lg sm:text-xl smooth-transition hover-lift hover-glow shadow-2xl hover:shadow-blue-500/25"
                  >
                    Get Started Now
                    <ArrowRight className="w-5 sm:w-6 h-5 sm:h-6 group-hover:translate-x-2 smooth-transition" />
                  </Link>
                  <Link
                    to="/login"
                    className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-10 sm:px-12 py-5 sm:py-6 glass-effect hover:bg-blue-500/20 rounded-2xl font-bold text-lg sm:text-xl smooth-transition hover-lift border border-blue-400/40 hover:border-blue-400/60"
                  >
                    I Have an Account
                    <ArrowRight className="w-5 sm:w-6 h-5 sm:h-6 group-hover:translate-x-2 smooth-transition" />
                  </Link>
                </div>
              ) : (
                <Link
                  to="/chat"
                  className="group inline-flex items-center justify-center gap-3 px-12 py-6 gradient-accent hover:gradient-accent-hover rounded-2xl font-bold text-xl smooth-transition hover-lift hover-glow shadow-2xl hover:shadow-blue-500/25"
                >
                  Open ChatFlow
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 smooth-transition" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
