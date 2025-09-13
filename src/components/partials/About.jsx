import React from 'react';
import { Link } from 'react-router-dom';
import Topnav from '../partials/Topnav';
import Sidenav from '../partials/Sidenav';

const About = () => {
  document.title = "About Cineva";

  return (
    <div className="w-screen h-screen flex bg-[#1F1E24]">
      <Sidenav />
      
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#1F1E24] relative">
        {/* Ambient lighting effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#6556CD]/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-[#ff6b6b]/15 rounded-full blur-3xl opacity-25 animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-[#4ecdc4]/15 rounded-full blur-3xl opacity-20 animate-pulse delay-2000"></div>
        </div>

        {/* Top Navigation */}
        <div className="sticky top-0 z-40 bg-black/30 backdrop-blur-xl border-b border-white/10 shadow-2xl">
          <Topnav />
        </div>

        {/* Main Content */}
        <div className="px-8 py-12 space-y-16 relative z-10 max-w-6xl mx-auto">
          {/* Hero Section */}
          <section className="text-center space-y-6">
            <div className="relative inline-block">
              <h1 className="text-6xl md:text-7xl font-bold text-white bg-gradient-to-r from-[#6556CD] via-[#ff6b6b] to-[#4ecdc4] bg-clip-text text-transparent drop-shadow-2xl mb-4">
                About Cineva
              </h1>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-[#6556CD] to-[#4ecdc4] rounded-full"></div>
            </div>
            <p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed font-light">
              Your ultimate destination for discovering movies, TV shows, and the entertainment world
            </p>
          </section>

          {/* Mission Section */}
          <section className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-lg text-zinc-300 leading-relaxed">
                Cineva is dedicated to providing movie and TV enthusiasts with a comprehensive, 
                user-friendly platform to explore the vast world of entertainment. We believe 
                that great stories deserve to be discovered and shared.
              </p>
              <p className="text-lg text-zinc-300 leading-relaxed">
                From trending blockbusters to hidden gems, from beloved classics to upcoming 
                releases, we're here to help you find your next favorite watch.
              </p>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#6556CD]/30 to-[#4ecdc4]/30 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-[#6556CD]/20 to-[#4ecdc4]/20 backdrop-blur-xl border border-white/20 rounded-3xl p-12 text-center">
                <div className="text-6xl text-[#6556CD] mb-6">
                  <i className="ri-movie-2-line"></i>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Endless Discovery</h3>
                <p className="text-zinc-300">
                  Explore thousands of movies, TV shows, and get to know your favorite celebrities
                </p>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="space-y-8">
            <h2 className="text-4xl font-bold text-white text-center mb-12">What We Offer</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-purple-800/30 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-xl border border-purple-500/40 rounded-3xl p-8 transform transition-all duration-300 hover:scale-[1.02]">
                  <div className="text-4xl text-purple-400 mb-6 text-center">
                    <i className="ri-fire-line"></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 text-center">Trending Content</h3>
                  <p className="text-zinc-300 text-center leading-relaxed">
                    Stay updated with what's hot right now. Discover trending movies, TV shows, and rising stars in real-time.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-blue-800/30 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-xl border border-blue-500/40 rounded-3xl p-8 transform transition-all duration-300 hover:scale-[1.02]">
                  <div className="text-4xl text-blue-400 mb-6 text-center">
                    <i className="ri-search-line"></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 text-center">Smart Search</h3>
                  <p className="text-zinc-300 text-center leading-relaxed">
                    Find exactly what you're looking for with our powerful search functionality and intelligent recommendations.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/30 to-green-800/30 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-green-600/20 to-green-800/20 backdrop-blur-xl border border-green-500/40 rounded-3xl p-8 transform transition-all duration-300 hover:scale-[1.02]">
                  <div className="text-4xl text-green-400 mb-6 text-center">
                    <i className="ri-information-line"></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 text-center">Detailed Info</h3>
                  <p className="text-zinc-300 text-center leading-relaxed">
                    Get comprehensive details about movies, shows, cast, crew, ratings, and reviews all in one place.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Technology Section */}
          <section className="bg-gradient-to-br from-zinc-900/50 to-zinc-800/50 backdrop-blur-xl border border-white/10 rounded-3xl p-12">
            <div className="text-center space-y-6">
              <h2 className="text-4xl font-bold text-white mb-8">Powered by TMDB</h2>
              <p className="text-lg text-zinc-300 leading-relaxed max-w-4xl mx-auto">
                Cineva is powered by The Movie Database (TMDB), one of the most comprehensive 
                and reliable sources of movie and TV show information available. This ensures 
                that you always have access to the most up-to-date and accurate information 
                about your favorite entertainment content.
              </p>
              
              <div className="flex justify-center items-center gap-8 mt-12">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#6556CD] to-[#9c88ff] rounded-xl flex items-center justify-center">
                    <i className="ri-database-2-line text-white text-xl"></i>
                  </div>
                  <div className="text-left">
                    <h4 className="text-white font-semibold">Real-time Data</h4>
                    <p className="text-zinc-400 text-sm">Always up-to-date</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#ff6b6b] to-[#ffa726] rounded-xl flex items-center justify-center">
                    <i className="ri-global-line text-white text-xl"></i>
                  </div>
                  <div className="text-left">
                    <h4 className="text-white font-semibold">Global Content</h4>
                    <p className="text-zinc-400 text-sm">Worldwide coverage</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#4ecdc4] to-[#26d0ce] rounded-xl flex items-center justify-center">
                    <i className="ri-shield-check-line text-white text-xl"></i>
                  </div>
                  <div className="text-left">
                    <h4 className="text-white font-semibold">Trusted Source</h4>
                    <p className="text-zinc-400 text-sm">Reliable information</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center space-y-8">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Explore?</h2>
            <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
              Join thousands of movie and TV enthusiasts who use Cineva to discover their next favorite watch.
            </p>
            <div className="flex justify-center gap-6">
              <Link
                to="/"
                className="bg-gradient-to-r from-[#6556CD] to-[#9c88ff] hover:from-[#5a4fb8] hover:to-[#8b7ae6] text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#6556CD]/50"
              >
                <i className="ri-home-line mr-2"></i>
                Back to Home
              </Link>
              <Link
                to="/trending"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 border border-white/20 backdrop-blur-sm"
              >
                <i className="ri-fire-line mr-2"></i>
                Explore Trending
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;