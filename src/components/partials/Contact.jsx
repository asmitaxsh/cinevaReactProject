import React from 'react';
import { Link } from 'react-router-dom';
import Topnav from '../partials/Topnav';
import Sidenav from '../partials/Sidenav';

const Contact = () => {
  document.title = "Contact Cineva";

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
                Contact Us
              </h1>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-[#6556CD] to-[#4ecdc4] rounded-full"></div>
            </div>
            <p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed font-light">
              Have questions, feedback, or suggestions? We’d love to hear from you.
            </p>
          </section>

          {/* Contact Info + Form */}
          <section className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-white mb-6">Get in Touch</h2>
              <p className="text-lg text-zinc-300 leading-relaxed">
                Whether it’s a partnership inquiry, support request, or just to say hi our team is here for you.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#6556CD]/30 rounded-xl flex items-center justify-center">
                    <i className="ri-mail-line text-[#6556CD] text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Email</h4>
                    <p className="text-zinc-400">support@cineva.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#ff6b6b]/30 rounded-xl flex items-center justify-center">
                    <i className="ri-phone-line text-[#ff6b6b] text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Phone</h4>
                    <p className="text-zinc-400">+61 123 456 789</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#4ecdc4]/30 rounded-xl flex items-center justify-center">
                    <i className="ri-map-pin-line text-[#4ecdc4] text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Location</h4>
                    <p className="text-zinc-400">Adelaide, South Australia</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#6556CD]/30 to-[#4ecdc4]/30 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              <form className="relative bg-gradient-to-br from-[#6556CD]/20 to-[#4ecdc4]/20 backdrop-blur-xl border border-white/20 rounded-3xl p-8 space-y-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-4 rounded-xl bg-black/30 border border-white/20 text-white placeholder-zinc-400 focus:outline-none focus:border-[#6556CD]"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-4 rounded-xl bg-black/30 border border-white/20 text-white placeholder-zinc-400 focus:outline-none focus:border-[#6556CD]"
                />
                <textarea
                  placeholder="Your Message"
                  rows="5"
                  className="w-full p-4 rounded-xl bg-black/30 border border-white/20 text-white placeholder-zinc-400 focus:outline-none focus:border-[#6556CD]"
                ></textarea>
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[#6556CD] to-[#9c88ff] hover:from-[#5a4fb8] hover:to-[#8b7ae6] text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Send Message
                </button>
              </form>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center space-y-8">
            <h2 className="text-4xl font-bold text-white mb-6">Stay Connected</h2>
            <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
              Follow us on social media for the latest updates, movie recommendations, and community fun.
            </p>
            <div className="flex justify-center gap-6">
              <a href="#" className="text-3xl text-[#6556CD] hover:scale-110 transition"><i className="ri-facebook-circle-fill"></i></a>
              <a href="#" className="text-3xl text-[#ff6b6b] hover:scale-110 transition"><i className="ri-instagram-fill"></i></a>
              <a href="#" className="text-3xl text-[#4ecdc4] hover:scale-110 transition"><i className="ri-twitter-x-fill"></i></a>
              <a href="#" className="text-3xl text-[#9c88ff] hover:scale-110 transition"><i className="ri-youtube-fill"></i></a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Contact;
