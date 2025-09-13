import React from "react";
import ReactPlayer from 'react-player';
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Trailer = ({ onClose }) => {
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category]?.info?.videos);

  // Find the first trailer or teaser video
  const getTrailerVideo = () => {
    if (!ytvideo || !Array.isArray(ytvideo)) return null;
    
    // Priority order: Trailer, Teaser, Clip, Featurette
    const videoTypes = ['Trailer', 'Teaser', 'Clip', 'Featurette'];
    
    for (const type of videoTypes) {
      const video = ytvideo.find(v => 
        v.type === type && 
        v.site === 'YouTube' && 
        v.key
      );
      if (video) return video;
    }
    
    // If no specific type found, return first YouTube video
    return ytvideo.find(v => v.site === 'YouTube' && v.key) || null;
  };

  const trailerVideo = getTrailerVideo();

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm">
      {/* Overlay - clicking outside closes trailer */}
      <div 
        className="absolute inset-0" 
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-[95%] max-w-6xl mx-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-red-400 transition-colors duration-200 z-10 group"
          aria-label="Close trailer"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-red-500/20 transition-all duration-200">
            <i className="ri-close-line text-2xl group-hover:scale-110 transition-transform duration-200"></i>
          </div>
        </button>

        {/* Video Container */}
        <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          {trailerVideo ? (
            <>
              {/* Video Title */}
              <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-6">
                <h2 className="text-white text-xl font-semibold flex items-center gap-2">
                  <i className="ri-play-circle-fill text-red-500"></i>
                  {trailerVideo.name || `${trailerVideo.type || 'Video'}`}
                </h2>
                {trailerVideo.type && (
                  <span className="text-zinc-300 text-sm">
                    {trailerVideo.type} • YouTube
                  </span>
                )}
              </div>

              {/* React Player */}
              <div className="relative aspect-video">
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${trailerVideo.key}`}
                  width="100%"
                  height="100%"
                  controls={true}
                  playing={true}
                  volume={0.8}
                  config={{
                    youtube: {
                      playerVars: {
                        autoplay: 1,
                        modestbranding: 1,
                        rel: 0,
                        showinfo: 0,
                      }
                    }
                  }}
                  onError={(error) => {
                    console.error('Video playback error:', error);
                  }}
                />
              </div>

              {/* Video Info Footer */}
              <div className="bg-gradient-to-t from-black/90 to-transparent p-4">
                <div className="flex items-center justify-between text-zinc-300 text-sm">
                  <div className="flex items-center gap-4">
                    {trailerVideo.published_at && (
                      <span>
                        <i className="ri-calendar-line mr-1"></i>
                        {new Date(trailerVideo.published_at).toLocaleDateString()}
                      </span>
                    )}
                    <span>
                      <i className="ri-youtube-fill text-red-500 mr-1"></i>
                      YouTube
                    </span>
                  </div>
                  <a
                    href={`https://www.youtube.com/watch?v=${trailerVideo.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-white transition-colors duration-200 text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full"
                  >
                    <i className="ri-external-link-line"></i>
                    Watch on YouTube
                  </a>
                </div>
              </div>
            </>
          ) : (
            /* No Trailer Available */
            <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
              <div className="w-20 h-20 mb-6 rounded-full bg-zinc-800 flex items-center justify-center">
                <i className="ri-film-line text-3xl text-zinc-500"></i>
              </div>
              <h3 className="text-white text-2xl font-semibold mb-3">
                No Trailer Available
              </h3>
              <p className="text-zinc-400 text-lg mb-6 max-w-md">
                Sorry, we couldn't find any video content for this title at the moment.
              </p>
              <button
                onClick={onClose}
                className="bg-[#6556CD] hover:bg-[#5a4fb8] text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2"
              >
                <i className="ri-arrow-left-line"></i>
                Go Back
              </button>
            </div>
          )}
        </div>

        {/* Additional Videos (if available) */}
        {ytvideo && Array.isArray(ytvideo) && ytvideo.length > 1 && trailerVideo && (
          <div className="mt-6">
            <h3 className="text-white text-lg font-semibold mb-3 flex items-center gap-2">
              <i className="ri-play-list-line text-[#6556CD]"></i>
              More Videos
            </h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {ytvideo
                .filter(video => 
                  video && video.key !== trailerVideo.key && 
                  video.site === 'YouTube' && 
                  video.key
                )
                .slice(0, 5)
                .map((video, index) => (
                  <div
                    key={video.key || index}
                    className="flex-shrink-0 w-48 bg-white/5 hover:bg-white/10 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 group border border-white/10"
                    onClick={() => {
                      // You can implement video switching logic here
                      window.open(`https://www.youtube.com/watch?v=${video.key}`, '_blank');
                    }}
                  >
                    <div className="aspect-video bg-zinc-800 flex items-center justify-center relative">
                      <i className="ri-play-circle-fill text-3xl text-white/70 group-hover:text-white group-hover:scale-110 transition-all duration-200"></i>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    <div className="p-3">
                      <h4 className="text-white text-sm font-medium line-clamp-2 mb-1">
                        {video.name || video.type || 'Video'}
                      </h4>
                      <p className="text-zinc-400 text-xs">
                        {video.type} • YouTube
                      </p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        )}
      </div>

      {/* Keyboard shortcut hint */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-zinc-400 text-sm flex items-center gap-2">
        <kbd className="px-2 py-1 bg-white/10 rounded text-xs">ESC</kbd>
        <span>to close</span>
      </div>
    </div>
  );
};

export default Trailer;