import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removemovie } from "../../store/actions/movieActions";
import Loading from "../Loading";
import { useLocation } from "react-router-dom";

const Moviedetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [showTranslations, setShowTranslations] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [dispatch, id]);

  // Helper functions
  const getQualityBadge = () => {
    if (!info?.detail?.vote_average) return "SD";
    if (info.detail.vote_average >= 8) return "HD+";
    if (info.detail.vote_average >= 6.5) return "HD";
    return "SD";
  };

  const getLanguageName = (iso_639_1) => {
    if (!iso_639_1) return "Unknown";
    const languageNames = {
      'en': 'English',
      'es': 'Spanish',
      'fr': 'French',
      'de': 'German',
      'it': 'Italian',
      'pt': 'Portuguese',
      'ru': 'Russian',
      'ja': 'Japanese',
      'ko': 'Korean',
      'zh': 'Chinese',
      'hi': 'Hindi',
      'ar': 'Arabic',
      'th': 'Thai',
      'tr': 'Turkish',
      'pl': 'Polish',
      'nl': 'Dutch',
      'sv': 'Swedish',
      'da': 'Danish',
      'no': 'Norwegian',
      'fi': 'Finnish'
    };
    return languageNames[iso_639_1] || iso_639_1.toUpperCase();
  };

  const getCountryName = (iso_3166_1) => {
    if (!iso_3166_1) return "Unknown";
    const countryNames = {
      'US': 'United States',
      'GB': 'United Kingdom',
      'CA': 'Canada',
      'AU': 'Australia',
      'DE': 'Germany',
      'FR': 'France',
      'ES': 'Spain',
      'IT': 'Italy',
      'JP': 'Japan',
      'KR': 'South Korea',
      'CN': 'China',
      'IN': 'India',
      'BR': 'Brazil',
      'MX': 'Mexico',
      'RU': 'Russia',
      'TR': 'Turkey',
      'NL': 'Netherlands',
      'SE': 'Sweden',
      'DK': 'Denmark',
      'NO': 'Norway'
    };
    return countryNames[iso_3166_1] || iso_3166_1;
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (isDisliked) setIsDisliked(false);
  };

  const handleDislike = () => {
    setIsDisliked(!isDisliked);
    if (isLiked) setIsLiked(false);
  };

  const handleWatchlist = () => {
    setIsInWatchlist(!isInWatchlist);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: info?.detail?.title || info?.detail?.name || 'Movie',
        text: `Check out ${info?.detail?.title || info?.detail?.name || 'this movie'}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Get the main trailer video
  const getTrailerVideo = () => {
    if (!info?.videos || !info.videos.length) return null;
    
    // Priority: Official Trailer > Trailer > Teaser > Clip
    const trailerTypes = ['Trailer', 'Official Trailer', 'Teaser', 'Clip'];
    
    for (const type of trailerTypes) {
      const video = info.videos.find(v => 
        v.type === type && v.site === 'YouTube' && v.official
      );
      if (video) return video;
    }
    
    // Fallback to any YouTube video
    return info.videos.find(v => v.site === 'YouTube') || null;
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
            title={trailerVideo.name || 'Movie Trailer'}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    );
  };

  if (!info) {
    return <Loading />;
  }

  return (
    <>
      <div className="w-full min-h-screen relative">
        {/* Fixed Background with extended height */}
        <div 
          className="fixed inset-0 w-full h-full z-0"
          style={{
            backgroundImage: info?.detail?.backdrop_path
              ? `linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.5), rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`
              : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          }}
        />
        
        {/* Content Container */}
        <div className="relative z-10 px-[5%] py-5">
          {/* Navigation */}
          <nav className="h-[8vh] w-full text-zinc-100 flex items-center justify-between">
            <div className="flex items-center gap-6 text-xl">
              <Link
                onClick={() => navigate(-1)}
                className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer transition-colors duration-200 p-2 hover:bg-white/10 rounded-full"
                title="Go back"
              ></Link>

              <div className="flex items-center gap-4">
                {info?.detail?.homepage && (
                  <a 
                    target="_blank" 
                    href={info.detail.homepage} 
                    rel="noreferrer"
                    className="hover:text-[#6556CD] transition-colors duration-200 p-2 hover:bg-white/10 rounded-full"
                    title="Official website"
                  >
                    <i className="ri-external-link-line"></i>
                  </a>
                )}
                
                {info?.externalid?.wikidata_id && (
                  <a
                    target="_blank"
                    href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
                    rel="noreferrer"
                    className="hover:text-[#6556CD] transition-colors duration-200 p-2 hover:bg-white/10 rounded-full"
                    title="Wikidata"
                  >
                    <i className="ri-earth-line"></i>
                  </a>
                )}
                
                {info?.externalid?.imdb_id && (
                  <a
                    target="_blank"
                    href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
                    rel="noreferrer"
                    className="hover:text-[#6556CD] transition-colors duration-200 font-bold px-3 py-1 hover:bg-white/10 rounded-lg"
                    title="IMDB"
                  >
                    IMDb
                  </a>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleLike}
                className={`p-2 rounded-full transition-all duration-200 ${
                  isLiked ? 'bg-green-600 text-white' : 'hover:bg-white/10 text-zinc-300'
                }`}
                title="Like"
              >
                <i className="ri-thumb-up-line text-lg"></i>
              </button>
              
              <button
                onClick={handleDislike}
                className={`p-2 rounded-full transition-all duration-200 ${
                  isDisliked ? 'bg-red-600 text-white' : 'hover:bg-white/10 text-zinc-300'
                }`}
                title="Dislike"
              >
                <i className="ri-thumb-down-line text-lg"></i>
              </button>
              
              <button
                onClick={handleWatchlist}
                className={`p-2 rounded-full transition-all duration-200 ${
                  isInWatchlist ? 'bg-blue-600 text-white' : 'hover:bg-white/10 text-zinc-300'
                }`}
                title="Add to Watchlist"
              >
                <i className={`${isInWatchlist ? 'ri-bookmark-fill' : 'ri-bookmark-line'} text-lg`}></i>
              </button>
              
              <button
                onClick={handleShare}
                className="p-2 rounded-full hover:bg-white/10 text-zinc-300 transition-all duration-200"
                title="Share"
              >
                <i className="ri-share-line text-lg"></i>
              </button>
            </div>
          </nav>

          {/* Main Content */}
          <div className="flex gap-8 mt-6 mb-12">
            {/* Left Side - Poster */}
            <div className="flex-shrink-0 relative">
              <div className="relative">
                <img
                  className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.6)] h-[65vh] w-[45vh] object-cover rounded-xl"
                  src={`https://image.tmdb.org/t/p/original/${
                    info?.detail?.poster_path || info?.detail?.backdrop_path
                  }`}
                  alt={info?.detail?.title || info?.detail?.name || 'Movie poster'}
                />
                
                {/* Vote Average Badge */}
                {info?.detail?.vote_average && (
                  <div className="absolute right-[-8%] bottom-[20%] rounded-full text-lg font-bold bg-gradient-to-r from-pink-600 to-pink-700 text-white w-[8vh] h-[8vh] flex justify-center items-center shadow-lg border-4 border-white">
                    {(info.detail.vote_average * 10).toFixed()} <sup className="text-xs">%</sup>
                  </div>
                )}

                {/* Quality Badge */}
                <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg font-semibold text-sm">
                  {getQualityBadge()}
                </div>
              </div>

              {/* Watch Trailer Button */}
              {trailerVideo ? (
                <button 
                  onClick={() => setShowTrailer(true)}
                  className="w-full mt-4 bg-[#6556CD] hover:bg-[#5a4fb8] text-white py-3 px-6 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <i className="ri-play-circle-line text-xl"></i>
                  Watch Trailer
                </button>
              ) : (
                <div className="w-full mt-4 bg-gray-600 text-gray-300 py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 cursor-not-allowed">
                  <i className="ri-play-circle-line text-xl"></i>
                  No Trailer Available
                </div>
              )}
            </div>

            {/* Right Side - Movie Info */}
            <div className="flex flex-col gap-6 flex-1">
              {/* Movie Title & Basic Info */}
              <div className="text-white">
                <h1 className="text-5xl font-bold mb-3 hover:text-[#6556CD] transition-colors duration-300 cursor-default leading-tight">
                  {info?.detail?.title || info?.detail?.name || 'Unknown Title'}
                </h1>
                
                {info?.detail?.tagline && (
                  <p className="text-xl italic text-zinc-300 mb-4 font-light">
                    "{info.detail.tagline}"
                  </p>
                )}

                {/* Enhanced Rating & Info Bar */}
                <div className="flex items-center gap-6 text-lg text-zinc-300 mb-6 flex-wrap">
                  {info?.detail?.vote_average && (
                    <div className="flex items-center gap-2 bg-yellow-600/20 px-4 py-2 rounded-lg border border-yellow-600/30">
                      <i className="ri-star-fill text-yellow-500"></i>
                      <span className="font-semibold text-white">
                        {info.detail.vote_average.toFixed(1)}/10
                      </span>
                      <span className="text-sm text-zinc-400">
                        ({info?.detail?.vote_count?.toLocaleString() || 0} votes)
                      </span>
                    </div>
                  )}
                  
                  {info?.detail?.release_date && (
                    <div className="flex items-center gap-2 bg-blue-600/20 px-4 py-2 rounded-lg border border-blue-600/30">
                      <i className="ri-calendar-line text-blue-400"></i>
                      <span className="font-semibold text-white text-xl">
                        {new Date(info.detail.release_date).getFullYear()}
                      </span>
                    </div>
                  )}
                  
                  {info?.detail?.runtime && (
                    <div className="flex items-center gap-2 bg-green-600/20 px-4 py-2 rounded-lg border border-green-600/30">
                      <i className="ri-time-line text-green-400"></i>
                      <span className="font-semibold text-white text-xl">
                        {Math.floor(info.detail.runtime / 60)}h {info.detail.runtime % 60}m
                      </span>
                    </div>
                  )}

                  {/* Language/Translations */}
                  {info?.detail?.original_language && (
                    <div className="flex items-center gap-2 bg-purple-600/20 px-4 py-2 rounded-lg border border-purple-600/30">
                      <i className="ri-translate-2 text-purple-400"></i>
                      <span className="font-semibold text-white">
                        {getLanguageName(info.detail.original_language)}
                      </span>
                      {info?.translations && info.translations.length > 1 && (
                        <button
                          onClick={() => setShowTranslations(!showTranslations)}
                          className="text-xs bg-purple-500 hover:bg-purple-600 px-2 py-1 rounded-full transition-colors"
                          title={`Available in ${info.translations.length} languages`}
                        >
                          +{info.translations.length - 1}
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Translations Dropdown */}
                {showTranslations && info?.translations && (
                  <div className="mb-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <i className="ri-global-line text-purple-400"></i>
                      Available Languages & Regions
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-48 overflow-y-auto">
                      {info.translations.map((translation, index) => (
                        <div 
                          key={index}
                          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg transition-colors cursor-default border border-white/5"
                        >
                          <span className="text-2xl">🌍</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-white text-sm font-medium truncate">
                              {getLanguageName(translation?.iso_639_1)}
                            </div>
                            <div className="text-zinc-400 text-xs truncate">
                              {getCountryName(translation?.iso_3166_1)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button 
                      onClick={() => setShowTranslations(false)}
                      className="mt-3 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Hide translations
                    </button>
                  </div>
                )}

                {/* Genres */}
                {info?.detail?.genres && info.detail.genres.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-6">
                    {info.detail.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="bg-gradient-to-r from-[#6556CD] to-[#8b7bc7] text-white px-4 py-2 rounded-full text-sm font-medium hover:from-[#5a4fb8] hover:to-[#7a6bb8] transition-all duration-200 cursor-default border border-white/20"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Overview */}
                {info?.detail?.overview && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-4 text-white">Overview</h3>
                    <p className="text-zinc-300 leading-relaxed text-lg font-light">
                      {info.detail.overview}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Tabs */}
              <div className="flex gap-4 mb-6">
                <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 border border-white/20">
                  Details
                </button>
                <button className="bg-transparent hover:bg-white/10 text-zinc-400 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 border border-white/20">
                  Cast
                </button>
                <button className="bg-transparent hover:bg-white/10 text-zinc-400 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 border border-white/20">
                  Reviews
                </button>
              </div>

              {/* Compact Watch Providers */}
              {info?.watchproviders && (
                <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-4 mb-6">
                  <h3 className="text-white font-bold mb-3 text-lg">Where to Watch</h3>
                  <div className="space-y-3">
                    {/* Stream */}
                    {info.watchproviders.flatrate && (
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-green-400 min-w-[60px]">
                          <i className="ri-play-circle-line text-sm"></i>
                          <span className="text-xs font-medium">Stream</span>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          {[...new Map(info.watchproviders.flatrate.map((p) => [p.provider_id, p])).values()].slice(0, 6).map(
                            (w) => (
                              <div key={w.provider_id} className="relative group">
                                <img
                                  className="w-8 h-8 object-contain rounded-md hover:scale-110 transition-transform duration-200 cursor-pointer bg-white/10 p-1"
                                  src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                                  alt={w.provider_name}
                                  title={w.provider_name}
                                />
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {/* Rent */}
                    {info.watchproviders.rent && (
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-blue-400 min-w-[60px]">
                          <i className="ri-money-dollar-circle-line text-sm"></i>
                          <span className="text-xs font-medium">Rent</span>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          {[...new Map(info.watchproviders.rent.map((p) => [p.provider_id, p])).values()].slice(0, 6).map(
                            (w) => (
                              <div key={w.provider_id} className="relative group">
                                <img
                                  className="w-8 h-8 object-contain rounded-md hover:scale-110 transition-transform duration-200 cursor-pointer bg-white/10 p-1"
                                  src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                                  alt={w.provider_name}
                                  title={w.provider_name}
                                />
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {/* Buy */}
                    {info.watchproviders.buy && (
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-orange-400 min-w-[60px]">
                          <i className="ri-shopping-cart-line text-sm"></i>
                          <span className="text-xs font-medium">Buy</span>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          {[...new Map(info.watchproviders.buy.map((p) => [p.provider_id, p])).values()].slice(0, 6).map(
                            (w) => (
                              <div key={w.provider_id} className="relative group">
                                <img
                                  className="w-8 h-8 object-contain rounded-md hover:scale-110 transition-transform duration-200 cursor-pointer bg-white/10 p-1"
                                  src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                                  alt={w.provider_name}
                                  title={w.provider_name}
                                />
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Horizontal Scrolling Sections - Full Width */}
        <div className="relative z-10">
          {/* Recommendations Section */}
          {info?.recommendations && info.recommendations.length > 0 && (
            <div className="mb-8">
              <div className="px-[5%] mb-4">
                <h2 className="text-2xl font-bold text-white">You might also like</h2>
              </div>
              <div className="overflow-x-auto movieScrollbar">
                <div className="flex gap-4 px-[5%] pb-4">
                  {info.recommendations.map((movie, index) => (
                    <div key={movie.id || index} className="flex-shrink-0 w-[200px]">
                      <div className="relative group cursor-pointer">
                        <img
                          className="w-full h-[280px] object-cover rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-200"
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path}`}
                          alt={movie.title || movie.name}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
                          <h3 className="font-semibold text-sm movieLineClamp2 mb-1">
                            {movie.title || movie.name}
                          </h3>
                          {movie.vote_average && (
                            <div className="flex items-center gap-1 text-xs text-yellow-400">
                              <i className="ri-star-fill"></i>
                              <span>{movie.vote_average.toFixed(1)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Similar Movies Section */}
          {info?.similar && info.similar.length > 0 && (
            <div className="mb-8">
              <div className="px-[5%] mb-4">
                <h2 className="text-2xl font-bold text-white">Similar Movies</h2>
              </div>
              <div className="overflow-x-auto movieScrollbar">
                <div className="flex gap-4 px-[5%] pb-4">
                  {info.similar.map((movie, index) => (
                    <div key={movie.id || index} className="flex-shrink-0 w-[200px]">
                      <div className="relative group cursor-pointer">
                        <img
                          className="w-full h-[280px] object-cover rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-200"
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path}`}
                          alt={movie.title || movie.name}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
                          <h3 className="font-semibold text-sm movieLineClamp2 mb-1">
                            {movie.title || movie.name}
                          </h3>
                          {movie.vote_average && (
                            <div className="flex items-center gap-1 text-xs text-yellow-400">
                              <i className="ri-star-fill"></i>
                              <span>{movie.vote_average.toFixed(1)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Global CSS Styles */}
        <style>
          {`
            .movieScrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .movieScrollbar::-webkit-scrollbar {
              display: none;
            }
            .movieLineClamp1 {
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            .movieLineClamp2 {
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
          `}
        </style>
      </div>

      {/* Trailer Modal - Rendered outside main container to avoid z-index issues */}
      <TrailerModal />
    </>
  );
};

export default Moviedetails;