import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../axios';
import Loading from '../Loading';

const SeasonDetails = () => {
  const navigate = useNavigate();
  const { id, seasonNumber } = useParams();
  const [seasonData, setSeasonData] = useState(null);
  const [showData, setShowData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeasonData = async () => {
      try {
        setLoading(true);
        
        // Fetch season details
        const seasonResponse = await axios.get(`/tv/${id}/season/${seasonNumber}`);
        const seasonData = seasonResponse.data;
        
        // Fetch show details for context
        const showResponse = await axios.get(`/tv/${id}`);
        const showData = showResponse.data;
        
        setSeasonData(seasonData);
        setShowData(showData);
      } catch (error) {
        console.error('Error fetching season data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeasonData();
  }, [id, seasonNumber]);

  if (loading) {
    return <Loading />;
  }

  if (!seasonData) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-white text-xl">Season not found</div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full min-h-screen relative">
        {/* Fixed Background with extended height */}
        <div 
          className="fixed inset-0 w-full h-full z-0"
          style={{
            backgroundImage: seasonData?.poster_path || showData?.backdrop_path
              ? `linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.5), rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${seasonData.poster_path || showData.backdrop_path})`
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

              {/* Breadcrumb Navigation */}
              <div className="flex items-center gap-3 text-lg">
                <Link 
                  to={`/tvshows/details/${id}`}
                  className="text-blue-400 hover:text-blue-300 transition-colors hover:underline"
                >
                  {showData?.name}
                </Link>
                <span className="text-zinc-500">→</span>
                <span className="text-white font-semibold">{seasonData.name}</span>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <div className="flex gap-8 mt-6 mb-12">
            {/* Left Side - Season Poster */}
            <div className="flex-shrink-0 relative">
              <div className="relative">
                <img
                  className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.6)] h-[65vh] w-[45vh] object-cover rounded-xl"
                  src={`https://image.tmdb.org/t/p/original/${seasonData.poster_path || showData.poster_path}`}
                  alt={seasonData.name}
                />
                
                {/* Vote Average Badge */}
                {seasonData.vote_average && seasonData.vote_average > 0 && (
                  <div className="absolute right-[-8%] bottom-[20%] rounded-full text-lg font-bold bg-gradient-to-r from-pink-600 to-pink-700 text-white w-[8vh] h-[8vh] flex justify-center items-center shadow-lg border-4 border-white">
                    {(seasonData.vote_average * 10).toFixed()} <sup className="text-xs">%</sup>
                  </div>
                )}

                {/* Season Number Badge */}
                <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg font-semibold text-sm">
                  Season {seasonData.season_number}
                </div>
              </div>
            </div>

            {/* Right Side - Season Info */}
            <div className="flex flex-col gap-6 flex-1">
              {/* Season Title & Basic Info */}
              <div className="text-white">
                <h1 className="text-5xl font-bold mb-3 hover:text-[#6556CD] transition-colors duration-300 cursor-default leading-tight">
                  {seasonData.name}
                </h1>
                
                {seasonData.overview && (
                  <p className="text-xl text-zinc-300 mb-6 font-light leading-relaxed">
                    {seasonData.overview}
                  </p>
                )}

                {/* Enhanced Rating & Info Bar */}
                <div className="flex items-center gap-6 text-lg text-zinc-300 mb-6 flex-wrap">
                  {seasonData.vote_average && seasonData.vote_average > 0 && (
                    <div className="flex items-center gap-2 bg-yellow-600/20 px-4 py-2 rounded-lg border border-yellow-600/30">
                      <i className="ri-star-fill text-yellow-500"></i>
                      <span className="font-semibold text-white">
                        {seasonData.vote_average.toFixed(1)}/10
                      </span>
                    </div>
                  )}
                  
                  {seasonData.air_date && (
                    <div className="flex items-center gap-2 bg-blue-600/20 px-4 py-2 rounded-lg border border-blue-600/30">
                      <i className="ri-calendar-line text-blue-400"></i>
                      <span className="font-semibold text-white text-xl">
                        {new Date(seasonData.air_date).getFullYear()}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 bg-green-600/20 px-4 py-2 rounded-lg border border-green-600/30">
                    <i className="ri-film-line text-green-400"></i>
                    <span className="font-semibold text-white text-xl">
                      {seasonData.episodes?.length || 0} Episodes
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Tabs */}
              <div className="flex gap-4 mb-6">
                <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 border border-white/20">
                  Episodes
                </button>
                <button className="bg-transparent hover:bg-white/10 text-zinc-400 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 border border-white/20">
                  Cast
                </button>
                <button className="bg-transparent hover:bg-white/10 text-zinc-400 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 border border-white/20">
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Episodes Section - Full Width */}
        <div className="relative z-10">
          {seasonData.episodes && seasonData.episodes.length > 0 && (
            <div className="px-[5%] mb-8">
              <h2 className="text-3xl font-bold mb-6 text-white">Episodes</h2>
              
              <div className="space-y-6">
                {seasonData.episodes.map((episode, index) => (
                  <div 
                    key={episode.id || index}
                    className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-200 group"
                  >
                    <div className="flex gap-6 p-6">
                      {/* Episode Still */}
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <img
                            src={episode.still_path 
                              ? `https://image.tmdb.org/t/p/w500${episode.still_path}`
                              : `https://image.tmdb.org/t/p/w500${seasonData.poster_path || showData.poster_path}`
                            }
                            alt={episode.name}
                            className="w-[280px] h-[157px] object-cover rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-200"
                          />
                          
                          {/* Episode Number Badge */}
                          <div className="absolute top-2 left-2 bg-black/80 text-white px-2 py-1 rounded text-sm font-bold">
                            {episode.episode_number}
                          </div>
                          
                          {/* Play Button Overlay */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 rounded-lg flex items-center justify-center">
                            <i className="ri-play-circle-line text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></i>
                          </div>
                        </div>
                      </div>
                      
                      {/* Episode Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-[#6556CD] transition-colors duration-200">
                              {episode.name}
                            </h3>
                            
                            <div className="flex items-center gap-4 text-zinc-400 text-sm mb-3">
                              {episode.air_date && (
                                <div className="flex items-center gap-1">
                                  <i className="ri-calendar-line"></i>
                                  {new Date(episode.air_date).toLocaleDateString()}
                                </div>
                              )}
                              
                              {episode.runtime && (
                                <div className="flex items-center gap-1">
                                  <i className="ri-time-line"></i>
                                  {episode.runtime} min
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {episode.vote_average > 0 && (
                            <div className="flex items-center gap-1 text-yellow-400 bg-yellow-400/20 px-3 py-1 rounded-lg border border-yellow-400/30">
                              <i className="ri-star-fill"></i>
                              <span className="font-semibold">{episode.vote_average.toFixed(1)}</span>
                            </div>
                          )}
                        </div>
                        
                        {episode.overview && (
                          <p className="text-zinc-300 leading-relaxed text-sm">
                            {episode.overview}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Global CSS Styles */}
        <style>
          {`
            .tvScrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .tvScrollbar::-webkit-scrollbar {
              display: none;
            }
            .tvLineClamp1 {
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            .tvLineClamp2 {
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
          `}
        </style>
      </div>
    </>
  );
};

export default SeasonDetails;