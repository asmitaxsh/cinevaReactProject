import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axios';

const Header = ({ data }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const [videos, setVideos] = useState([]);
  
  const bgImage = data.backdrop_path || data.profile_path
    ? `https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path}`
    : "default.jpg";

  // Fetch trailer videos when component mounts or data changes
  useEffect(() => {
    const fetchVideos = async () => {
      if (!data.id || !data.media_type) return;
      
      try {
        const endpoint = data.media_type === 'movie' ? 'movie' : 'tv';
        const { data: videoData } = await axios.get(`/${endpoint}/${data.id}/videos`);
        setVideos(videoData.results || []);
      } catch (error) {
        console.log("Error fetching videos:", error);
        setVideos([]);
      }
    };

    fetchVideos();
  }, [data.id, data.media_type]);

  // Get the best trailer video
  const getTrailerVideo = () => {
    if (!videos || !videos.length) return null;
    
    // Priority: Official Trailer > Trailer > Teaser > Clip
    const trailerTypes = ['Trailer', 'Official Trailer', 'Teaser', 'Clip'];
    
    for (const type of trailerTypes) {
      const video = videos.find(v => 
        v.type === type && v.site === 'YouTube' && v.official
      );
      if (video) return video;
    }
    
    // Fallback to any YouTube video
    return videos.find(v => v.site === 'YouTube') || null;
  };

  const trailerVideo = getTrailerVideo();

  // Trailer Modal Component
  const TrailerModal = () => {
    if (!showTrailer || !trailerVideo) return null;

    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
          {/* Close Button */}
          <button
            onClick={() => setShowTrailer(false)}
            className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 transition-all duration-200 backdrop-blur-sm"
            title="Close trailer"
          >
            <i className="ri-close-line text-xl"></i>
          </button>

          {/* Video Title */}
          <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2">
            <h3 className="text-white font-semibold text-lg">
              {trailerVideo.name || 'Trailer'}
            </h3>
          </div>

          {/* YouTube Embed */}
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={trailerVideo.name || 'Trailer'}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        style={{
          background: `linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 25%, rgba(0,0,0,0.6) 75%, rgba(0,0,0,0.9) 100%), url(${bgImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
        className='w-full h-[70vh] flex flex-col justify-end items-start p-[5%] relative overflow-hidden'
      >
        {/* Animated Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-blue-900/20 animate-pulse"></div>
        
        {/* Floating Particles Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-400/20 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-4xl">
          {/* Movie/Show Title */}
          <div className="mb-6">
            <h1 className='text-6xl md:text-7xl font-black text-white leading-tight'>
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                {data.name || data.title || data.original_name || data.original_title}
              </span>
            </h1>
            
            {/* Genre/Type Badge */}
            <div className="flex items-center gap-3 mt-4">
              <div className="px-4 py-2 bg-gradient-to-r from-[#6556CD] to-[#9c88ff] rounded-full text-white font-semibold text-sm shadow-lg">
                {data.media_type ? data.media_type.toUpperCase() : "FEATURED"}
              </div>
              
              {data.vote_average && (
                <div className="flex items-center gap-2 px-3 py-2 bg-black/30 backdrop-blur-sm rounded-full border border-white/20">
                  <i className="ri-star-fill text-yellow-400"></i>
                  <span className="text-white font-semibold">{data.vote_average.toFixed(1)}</span>
                </div>
              )}
              
              <div className="px-3 py-2 bg-black/30 backdrop-blur-sm rounded-full border border-white/20 text-white text-sm">
                {data.release_date || data.first_air_date ? 
                  new Date(data.release_date || data.first_air_date).getFullYear() : 
                  "Release TBA"
                }
              </div>
            </div>
          </div>

          {/* Description */}
          <p className='w-full max-w-3xl text-lg text-gray-200 leading-relaxed mb-8 font-light'>
            {data.overview ? 
              `${data.overview.slice(0, 280)}${data.overview.length > 280 ? '...' : ''}` : 
              "Discover the story that awaits you in this captivating entertainment experience."
            }
            {data.overview && data.overview.length > 280 && (
              <Link 
                to={`/${data.media_type}/details/${data.id}`} 
                className='text-blue-400 hover:text-blue-300 ml-2 transition-colors font-medium'
              >
                Read more
              </Link>
            )}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 flex-wrap">
            {/* Watch Trailer Button */}
            {trailerVideo ? (
              <button 
                onClick={() => setShowTrailer(true)}
                className='bg-gradient-to-r from-[#6556CD] to-[#8b5cf6] hover:from-[#5a4fb8] hover:to-[#7c3aed] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 flex items-center gap-3'
              >
                <i className="ri-play-fill text-xl"></i>
                Watch Trailer
              </button>
            ) : (
              <div className='bg-gray-600 text-gray-300 px-8 py-4 rounded-xl font-semibold flex items-center gap-3 cursor-not-allowed opacity-60'>
                <i className="ri-play-fill text-xl"></i>
                No Trailer Available
              </div>
            )}

            {/* More Info Button */}
            <Link 
              to={`/${data.media_type}/details/${data.id}`}
              className='bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 border border-white/20 hover:border-white/40 flex items-center gap-3'
            >
              <i className="ri-information-line text-xl"></i>
              More Info
            </Link>

            {/* Add to Watchlist Button */}
            <button className='bg-transparent hover:bg-white/10 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 border-2 border-white/30 hover:border-white/50 flex items-center gap-3'>
              <i className="ri-bookmark-line text-xl"></i>
              <span className="hidden sm:inline">Watchlist</span>
            </button>
          </div>
        </div>

        {/* Gradient Overlay at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1F1E24] via-[#1F1E24]/60 to-transparent pointer-events-none"></div>
      </div>

      {/* Trailer Modal */}
      <TrailerModal />
    </>
  );
};

export default Header;