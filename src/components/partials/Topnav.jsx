import axios from '../../axios';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import noimage from '/noimage.webp';

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  const GetSearches = async () => {
    if (query.trim().length === 0) return;
    
    setIsLoading(true);
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results || []);
      setShowResults(true);
    } catch (error) {
      console.log("Error:", error);
      setSearches([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.length > 0) {
        GetSearches();
      } else {
        setSearches([]);
        setShowResults(false);
      }
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Helper function to generate correct route
  const getRouteForMediaType = (mediaType, id) => {
    switch (mediaType) {
      case 'movie':
        return `/movies/details/${id}`;
      case 'tv':
        return `/tvshows/details/${id}`;
      case 'person':
        return `/person/details/${id}`;
      default:
        console.warn('Unknown media type:', mediaType);
        return `/movies/details/${id}`; // fallback
    }
  };

  const getMediaTypeIcon = (mediaType) => {
    switch (mediaType) {
      case 'movie':
        return 'ri-movie-line';
      case 'tv':
        return 'ri-tv-line';
      case 'person':
        return 'ri-user-line';
      default:
        return 'ri-question-line';
    }
  };

  const getMediaTypeColor = (mediaType) => {
    switch (mediaType) {
      case 'movie':
        return 'bg-red-100 text-red-700';
      case 'tv':
        return 'bg-blue-100 text-blue-700';
      case 'person':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const clearSearch = () => {
    setQuery("");
    setSearches([]);
    setShowResults(false);
  };

  return (
    <div className="w-full h-[10vh] relative flex mx-auto items-center justify-center px-4">
      <div ref={searchRef} className="relative w-full max-w-2xl">
        {/* Search Input Container */}
        <div className="relative flex items-center bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-xl px-4 py-3 transition-all duration-300 hover:border-zinc-600 focus-within:border-zinc-500 focus-within:bg-zinc-800/70">
          <i className="text-zinc-400 text-xl ri-search-line mr-3"></i>
          
          <input
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onFocus={() => query.length > 0 && setShowResults(true)}
            className="flex-1 text-zinc-200 text-lg outline-none border-none bg-transparent placeholder-zinc-500"
            type="text"
            placeholder="Search movies, TV shows, people..."
          />
          
          {isLoading && (
            <div className="animate-spin">
              <i className="text-zinc-400 text-xl ri-loader-4-line"></i>
            </div>
          )}
          
          {query.length > 0 && !isLoading && (
            <i
              onClick={clearSearch}
              className="text-zinc-400 text-xl ri-close-line cursor-pointer hover:text-zinc-300 transition-colors ml-2"
            ></i>
          )}
        </div>

        {/* Search Results Dropdown */}
        {showResults && (
          <div className="absolute w-full mt-2 bg-zinc-900/95 backdrop-blur-md border border-zinc-700/50 rounded-xl shadow-2xl overflow-hidden z-50 max-h-[70vh] animate-in fade-in slide-in-from-top-2 duration-200">
            {searches.length > 0 ? (
              <div className="overflow-auto max-h-[70vh] custom-scrollbar">
                {searches.map((item, index) => (
                  <Link
                    to={getRouteForMediaType(item.media_type, item.id)}
                    key={index}
                    onClick={() => setShowResults(false)}
                    className="flex items-center p-4 hover:bg-zinc-800/70 transition-all duration-200 border-b border-zinc-800/50 last:border-b-0 group"
                  >
                    {/* Image */}
                    <div className="relative flex-shrink-0 mr-4">
                      <img
                        className="w-12 h-12 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow"
                        src={
                          item.backdrop_path || item.profile_path
                            ? `https://image.tmdb.org/t/p/w200${item.backdrop_path || item.profile_path}`
                            : noimage
                        }
                        alt={item.name || item.title || 'No image'}
                        loading="lazy"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-zinc-200 font-medium text-base truncate group-hover:text-white transition-colors">
                        {item.name || item.title || item.original_name || item.original_title}
                      </h3>
                      
                      {item.overview && (
                        <p className="text-zinc-400 text-sm mt-1 line-clamp-2 group-hover:text-zinc-300 transition-colors">
                          {item.overview.slice(0, 100)}...
                        </p>
                      )}

                      {/* Release/Air Date */}
                      {(item.release_date || item.first_air_date) && (
                        <p className="text-zinc-500 text-xs mt-1">
                          {new Date(item.release_date || item.first_air_date).getFullYear()}
                        </p>
                      )}
                    </div>

                    {/* Media Type Badge */}
                    <div className="flex items-center ml-3 flex-shrink-0">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getMediaTypeColor(item.media_type)}`}>
                        <i className={`${getMediaTypeIcon(item.media_type)} mr-1 text-xs`}></i>
                        {item.media_type}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : query.length > 0 && !isLoading ? (
              <div className="p-6 text-center">
                <i className="ri-search-line text-4xl text-zinc-600 mb-3"></i>
                <p className="text-zinc-400 text-lg">No results found</p>
                <p className="text-zinc-500 text-sm mt-1">Try searching with different keywords</p>
              </div>
            ) : null}
          </div>
        )}
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgb(39 39 42 / 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgb(113 113 122 / 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgb(113 113 122 / 0.8);
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-in-from-top-2 {
          from { transform: translateY(-8px); }
          to { transform: translateY(0); }
        }
        .animate-in {
          animation: fade-in 0.2s ease-out, slide-in-from-top-2 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Topnav;