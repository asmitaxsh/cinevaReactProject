import React, { useEffect, useState } from 'react';
import Sidenav from './partials/Sidenav';
import Topnav from './partials/Topnav';
import axios from '../axios';
import Header from './partials/Header';
import HorizontalCards from './partials/Horizontalcards';
import Dropdown from './partials/Dropdown';
import Loading from './Loading';

const Home = () => {
  document.title = "Cineva Homepage";
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState("all");
  const [popularMovies, setPopularMovies] = useState(null);
  const [topRatedTv, setTopRatedTv] = useState(null);
  const [upcomingMovies, setUpcomingMovies] = useState(null);

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomdata = data.results[Math.floor(Math.random() * data.results.length)];
      setWallpaper(randomdata);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const GetPopularMovies = async () => {
    try {
      const { data } = await axios.get(`/movie/popular`);
      // Add media_type to each movie
      const moviesWithType = data.results.slice(0, 10).map(movie => ({
        ...movie,
        media_type: 'movie'
      }));
      setPopularMovies(moviesWithType);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const GetTopRatedTv = async () => {
    try {
      const { data } = await axios.get(`/tv/top_rated`);
      // Add media_type to each TV show
      const tvWithType = data.results.slice(0, 10).map(tv => ({
        ...tv,
        media_type: 'tv'
      }));
      setTopRatedTv(tvWithType);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const GetUpcomingMovies = async () => {
    try {
      const { data } = await axios.get(`/movie/upcoming`);
      // Add media_type to each movie
      const moviesWithType = data.results.slice(0, 10).map(movie => ({
        ...movie,
        media_type: 'movie'
      }));
      setUpcomingMovies(moviesWithType);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    GetTrending();
    if (!wallpaper) GetHeaderWallpaper();
  }, [category]);

  useEffect(() => {
    GetPopularMovies();
    GetTopRatedTv();
    GetUpcomingMovies();
  }, []);

  return wallpaper && trending ? (
    <>
      <Sidenav />
      <div className='w-[80%] h-full overflow-auto overflow-x-hidden bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#1F1E24] relative'>
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

        {/* Hero Header with enhanced overlay */}
        <div className="relative">
          <Header data={wallpaper} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent pointer-events-none"></div>
        </div>

        {/* Main Content */}
        <div className="px-8 py-12 space-y-16 relative z-10">
          {/* Trending Section */}
          <section className="space-y-8">
            <div className='flex justify-between items-center'>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-2 h-10 bg-gradient-to-b from-[#6556CD] to-[#9c88ff] rounded-full shadow-lg"></div>
                  <div className="absolute -inset-1 w-4 h-12 bg-gradient-to-b from-[#6556CD]/30 to-[#9c88ff]/30 rounded-full blur-sm"></div>
                </div>
                <div className="flex items-center gap-4">
                  <h1 className='text-4xl font-bold text-white bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent drop-shadow-2xl'>
                    Trending Now
                  </h1>
                  <div className="relative group">
                    <div className="px-4 py-2 bg-gradient-to-r from-[#6556CD] to-[#9c88ff] rounded-full text-white text-sm font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-[#6556CD]/50 hover:shadow-xl">
                      🔥 Hot
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#6556CD] to-[#9c88ff] rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>
              <div className="transform transition-all duration-300 hover:scale-105">
                <Dropdown
                  title="Filter"
                  options={['tv', 'movie', 'all']}
                  func={(e) => setCategory(e.target.value)}
                />
              </div>
            </div>
            <div className="relative">
              <HorizontalCards data={trending} />
            </div>
          </section>

          {/* Enhanced Stats Cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-purple-800/30 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-xl border border-purple-500/40 rounded-3xl p-8 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500/40 to-purple-600/40 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-purple-400/30">
                      <i className="ri-fire-line text-3xl text-purple-300 drop-shadow-lg"></i>
                    </div>
                    <div className="absolute -inset-2 bg-purple-500/20 rounded-2xl blur-lg opacity-60"></div>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl mb-1 drop-shadow-sm">Trending</h3>
                    <p className="text-purple-200 text-sm font-medium">{trending?.length || 0} hot items</p>
                    <div className="w-12 h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full mt-3"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-blue-800/30 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-xl border border-blue-500/40 rounded-3xl p-8 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500/40 to-blue-600/40 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-blue-400/30">
                      <i className="ri-movie-line text-3xl text-blue-300 drop-shadow-lg"></i>
                    </div>
                    <div className="absolute -inset-2 bg-blue-500/20 rounded-2xl blur-lg opacity-60"></div>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl mb-1 drop-shadow-sm">Movies</h3>
                    <p className="text-blue-200 text-sm font-medium">Thousands available</p>
                    <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mt-3"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/30 to-green-800/30 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-green-600/20 to-green-800/20 backdrop-blur-xl border border-green-500/40 rounded-3xl p-8 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/20">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500/40 to-green-600/40 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-green-400/30">
                      <i className="ri-tv-line text-3xl text-green-300 drop-shadow-lg"></i>
                    </div>
                    <div className="absolute -inset-2 bg-green-500/20 rounded-2xl blur-lg opacity-60"></div>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl mb-1 drop-shadow-sm">TV Shows</h3>
                    <p className="text-green-200 text-sm font-medium">Latest episodes</p>
                    <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full mt-3"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Popular Movies Section */}
          {popularMovies && (
            <section className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-2 h-10 bg-gradient-to-b from-[#ff6b6b] to-[#ffa726] rounded-full shadow-lg"></div>
                  <div className="absolute -inset-1 w-4 h-12 bg-gradient-to-b from-[#ff6b6b]/30 to-[#ffa726]/30 rounded-full blur-sm"></div>
                </div>
                <div className="flex items-center gap-4">
                  <h2 className='text-4xl font-bold text-white drop-shadow-2xl'>Popular Movies</h2>
                  <div className="relative group">
                    <div className="px-4 py-2 bg-gradient-to-r from-[#ff6b6b] to-[#ffa726] rounded-full text-white text-sm font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-[#ff6b6b]/50 hover:shadow-xl">
                      ⭐ Popular
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#ff6b6b] to-[#ffa726] rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>
              <HorizontalCards data={popularMovies} />
            </section>
          )}

          {/* Top Rated TV Shows Section */}
          {topRatedTv && (
            <section className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-2 h-10 bg-gradient-to-b from-[#4ecdc4] to-[#26d0ce] rounded-full shadow-lg"></div>
                  <div className="absolute -inset-1 w-4 h-12 bg-gradient-to-b from-[#4ecdc4]/30 to-[#26d0ce]/30 rounded-full blur-sm"></div>
                </div>
                <div className="flex items-center gap-4">
                  <h2 className='text-4xl font-bold text-white drop-shadow-2xl'>Top Rated TV Shows</h2>
                  <div className="relative group">
                    <div className="px-4 py-2 bg-gradient-to-r from-[#4ecdc4] to-[#26d0ce] rounded-full text-white text-sm font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-[#4ecdc4]/50 hover:shadow-xl">
                      ⭐ Top Rated
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#4ecdc4] to-[#26d0ce] rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>
              <HorizontalCards data={topRatedTv} />
            </section>
          )}

          {/* Upcoming Movies Section */}
          {upcomingMovies && (
            <section className="space-y-8 pb-16">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-2 h-10 bg-gradient-to-b from-[#a8edea] to-[#fed6e3] rounded-full shadow-lg"></div>
                  <div className="absolute -inset-1 w-4 h-12 bg-gradient-to-b from-[#a8edea]/30 to-[#fed6e3]/30 rounded-full blur-sm"></div>
                </div>
                <div className="flex items-center gap-4">
                  <h2 className='text-4xl font-bold text-white drop-shadow-2xl'>Coming Soon</h2>
                  <div className="relative group">
                    <div className="px-4 py-2 bg-gradient-to-r from-[#a8edea] to-[#fed6e3] rounded-full text-gray-800 text-sm font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-[#a8edea]/50 hover:shadow-xl">
                      🎬 Upcoming
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#a8edea] to-[#fed6e3] rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>
              <HorizontalCards data={upcomingMovies} />
            </section>
          )}
        </div>

        {/* Bottom fade effect */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1F1E24] to-transparent pointer-events-none"></div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;