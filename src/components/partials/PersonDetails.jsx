import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "../../store/actions/personActions";
import Loading from "../Loading";

const PersonDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();
  const [isFollowed, setIsFollowed] = useState(false);
  const [showFilmography, setShowFilmography] = useState('all');
  const [showBiography, setShowBiography] = useState(false);

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [dispatch, id]);

  // Helper functions
  const calculateAge = (birthday, deathday) => {
    if (!birthday) return null;
    const birthDate = new Date(birthday);
    const endDate = deathday ? new Date(deathday) : new Date();
    const age = Math.floor((endDate - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
    return age;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleFollow = () => {
    setIsFollowed(!isFollowed);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: info?.detail?.name || 'Person',
        text: `Check out ${info?.detail?.name || 'this person'}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Get sorted filmography
  const getSortedCredits = (type = 'all') => {
    if (!info?.combinedCredits?.cast && !info?.combinedCredits?.crew) return [];
    
    let credits = [];
    
    if (type === 'all' || type === 'acting') {
      credits = [...credits, ...(info.combinedCredits.cast || [])];
    }
    
    if (type === 'all' || type === 'crew') {
      credits = [...credits, ...(info.combinedCredits.crew || [])];
    }
    
    // Remove duplicates and sort by popularity/date
    const uniqueCredits = credits.reduce((acc, current) => {
      const existing = acc.find(item => item.id === current.id && item.media_type === current.media_type);
      if (!existing) {
        acc.push(current);
      }
      return acc;
    }, []);
    
    return uniqueCredits.sort((a, b) => {
      // Sort by release date (most recent first)
      const dateA = new Date(a.release_date || a.first_air_date || '1900-01-01');
      const dateB = new Date(b.release_date || b.first_air_date || '1900-01-01');
      return dateB - dateA;
    });
  };

  const getKnownForCredits = () => {
    const allCredits = getSortedCredits();
    return allCredits
      .filter(credit => credit.vote_average && credit.vote_average > 6)
      .sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0))
      .slice(0, 6);
  };

  if (!info) {
    return <Loading />;
  }

  const age = calculateAge(info?.detail?.birthday, info?.detail?.deathday);
  const knownForCredits = getKnownForCredits();
  const sortedCredits = getSortedCredits(showFilmography);

  return (
    <div className="w-full min-h-screen relative">
      {/* Fixed Background */}
      <div 
        className="fixed inset-0 w-full h-full z-0"
        style={{
          backgroundImage: info?.detail?.profile_path
            ? `linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.8), rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${info.detail.profile_path})`
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
              {info?.externalid?.homepage && (
                <a 
                  target="_blank" 
                  href={info.externalid.homepage} 
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
                  href={`https://www.imdb.com/name/${info.externalid.imdb_id}/`}
                  rel="noreferrer"
                  className="hover:text-[#6556CD] transition-colors duration-200 font-bold px-3 py-1 hover:bg-white/10 rounded-lg"
                  title="IMDB"
                >
                  IMDb
                </a>
              )}

              {info?.externalid?.instagram_id && (
                <a
                  target="_blank"
                  href={`https://www.instagram.com/${info.externalid.instagram_id}/`}
                  rel="noreferrer"
                  className="hover:text-[#6556CD] transition-colors duration-200 p-2 hover:bg-white/10 rounded-full"
                  title="Instagram"
                >
                  <i className="ri-instagram-line"></i>
                </a>
              )}

              {info?.externalid?.twitter_id && (
                <a
                  target="_blank"
                  href={`https://twitter.com/${info.externalid.twitter_id}`}
                  rel="noreferrer"
                  className="hover:text-[#6556CD] transition-colors duration-200 p-2 hover:bg-white/10 rounded-full"
                  title="Twitter"
                >
                  <i className="ri-twitter-line"></i>
                </a>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleFollow}
              className={`px-4 py-2 rounded-full transition-all duration-200 font-semibold ${
                isFollowed 
                  ? 'bg-green-600 text-white' 
                  : 'bg-[#6556CD] hover:bg-[#5a4fb8] text-white'
              }`}
              title={isFollowed ? "Unfollow" : "Follow"}
            >
              {isFollowed ? (
                <>
                  <i className="ri-user-unfollow-line mr-2"></i>
                  Following
                </>
              ) : (
                <>
                  <i className="ri-user-follow-line mr-2"></i>
                  Follow
                </>
              )}
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
          {/* Left Side - Profile Image */}
          <div className="flex-shrink-0 relative">
            <div className="relative">
              <img
                className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.6)] h-[65vh] w-[45vh] object-cover rounded-xl"
                src={
                  info?.detail?.profile_path
                    ? `https://image.tmdb.org/t/p/original/${info.detail.profile_path}`
                    : `https://via.placeholder.com/400x600/374151/9CA3AF?text=${info?.detail?.name?.charAt(0) || 'P'}`
                }
                alt={info?.detail?.name || 'Person'}
              />

              {/* Popularity Badge */}
              {info?.detail?.popularity && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-3 py-1 rounded-lg font-semibold text-sm">
                  Popular
                </div>
              )}
            </div>

            {/* Personal Info Card */}
            <div className="w-full mt-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4">
              <h3 className="text-white font-semibold mb-3">Personal Info</h3>
              
              {info?.detail?.known_for_department && (
                <div className="mb-3">
                  <h4 className="text-zinc-400 text-sm mb-1">Known For</h4>
                  <p className="text-white font-medium">{info.detail.known_for_department}</p>
                </div>
              )}

              {info?.detail?.gender !== undefined && (
                <div className="mb-3">
                  <h4 className="text-zinc-400 text-sm mb-1">Gender</h4>
                  <p className="text-white font-medium">
                    {info.detail.gender === 1 ? 'Female' : info.detail.gender === 2 ? 'Male' : 'Non-binary'}
                  </p>
                </div>
              )}

              {info?.detail?.birthday && (
                <div className="mb-3">
                  <h4 className="text-zinc-400 text-sm mb-1">Birthday</h4>
                  <p className="text-white font-medium">
                    {formatDate(info.detail.birthday)}
                    {age && (
                      <span className="text-zinc-400 ml-2">
                        ({age} years {info?.detail?.deathday ? 'old at death' : 'old'})
                      </span>
                    )}
                  </p>
                </div>
              )}

              {info?.detail?.deathday && (
                <div className="mb-3">
                  <h4 className="text-zinc-400 text-sm mb-1">Death</h4>
                  <p className="text-white font-medium">{formatDate(info.detail.deathday)}</p>
                </div>
              )}

              {info?.detail?.place_of_birth && (
                <div className="mb-3">
                  <h4 className="text-zinc-400 text-sm mb-1">Place of Birth</h4>
                  <p className="text-white font-medium text-sm leading-relaxed">
                    {info.detail.place_of_birth}
                  </p>
                </div>
              )}

              {info?.detail?.also_known_as && info.detail.also_known_as.length > 0 && (
                <div>
                  <h4 className="text-zinc-400 text-sm mb-1">Also Known As</h4>
                  <div className="space-y-1">
                    {info.detail.also_known_as.slice(0, 3).map((name, index) => (
                      <p key={index} className="text-white text-sm">{name}</p>
                    ))}
                    {info.detail.also_known_as.length > 3 && (
                      <p className="text-zinc-400 text-xs">
                        +{info.detail.also_known_as.length - 3} more
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Person Info */}
          <div className="flex flex-col gap-6 flex-1">
            {/* Person Name & Basic Info */}
            <div className="text-white">
              <h1 className="text-5xl font-bold mb-3 hover:text-[#6556CD] transition-colors duration-300 cursor-default leading-tight">
                {info?.detail?.name || 'Unknown Name'}
              </h1>

              {/* Known For Section */}
              {knownForCredits.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4 text-white">Known For</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {knownForCredits.map((credit, index) => (
                      <div key={credit.id || index} className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-3 hover:bg-white/10 transition-colors cursor-pointer">
                        <div className="flex gap-3">
                          <img
                            className="w-12 h-16 object-cover rounded-md flex-shrink-0"
                            src={
                              credit.poster_path
                                ? `https://image.tmdb.org/t/p/w200${credit.poster_path}`
                                : `https://via.placeholder.com/80x120/374151/9CA3AF?text=${(credit.title || credit.name || 'N/A').charAt(0)}`
                            }
                            alt={credit.title || credit.name}
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white font-medium text-sm movieLineClamp2 mb-1">
                              {credit.title || credit.name}
                            </h4>
                            {credit.character && (
                              <p className="text-zinc-400 text-xs movieLineClamp1">
                                as {credit.character}
                              </p>
                            )}
                            {credit.job && !credit.character && (
                              <p className="text-zinc-400 text-xs movieLineClamp1">
                                {credit.job}
                              </p>
                            )}
                            <div className="flex items-center gap-2 mt-1">
                              {credit.vote_average && (
                                <div className="flex items-center gap-1 text-xs text-yellow-400">
                                  <i className="ri-star-fill"></i>
                                  <span>{credit.vote_average.toFixed(1)}</span>
                                </div>
                              )}
                              <span className="text-zinc-500 text-xs">
                                {new Date(credit.release_date || credit.first_air_date || '').getFullYear() || 'N/A'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Biography */}
              {info?.detail?.biography && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-white">Biography</h3>
                  <div className={`text-zinc-300 leading-relaxed text-lg font-light ${!showBiography ? 'movieLineClamp6' : ''}`}>
                    {info.detail.biography}
                  </div>
                  {info.detail.biography.length > 500 && (
                    <button
                      onClick={() => setShowBiography(!showBiography)}
                      className="mt-3 text-[#6556CD] hover:text-[#5a4fb8] transition-colors font-medium"
                    >
                      {showBiography ? 'Show Less' : 'Read More'}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Filmography Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-white">Filmography</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowFilmography('all')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      showFilmography === 'all'
                        ? 'bg-[#6556CD] text-white'
                        : 'bg-white/10 text-zinc-300 hover:bg-white/20'
                    }`}
                  >
                    All ({getSortedCredits('all').length})
                  </button>
                  <button
                    onClick={() => setShowFilmography('acting')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      showFilmography === 'acting'
                        ? 'bg-[#6556CD] text-white'
                        : 'bg-white/10 text-zinc-300 hover:bg-white/20'
                    }`}
                  >
                    Acting ({getSortedCredits('acting').length})
                  </button>
                  <button
                    onClick={() => setShowFilmography('crew')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      showFilmography === 'crew'
                        ? 'bg-[#6556CD] text-white'
                        : 'bg-white/10 text-zinc-300 hover:bg-white/20'
                    }`}
                  >
                    Crew ({getSortedCredits('crew').length})
                  </button>
                </div>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto movieScrollbar bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4">
                {sortedCredits.map((credit, index) => (
                  <div key={credit.id || index} className="flex gap-4 bg-white/5 hover:bg-white/10 rounded-lg p-3 transition-colors cursor-pointer">
                    <img
                      className="w-16 h-20 object-cover rounded-md flex-shrink-0"
                      src={
                        credit.poster_path
                          ? `https://image.tmdb.org/t/p/w200${credit.poster_path}`
                          : `https://via.placeholder.com/64x96/374151/9CA3AF?text=${(credit.title || credit.name || 'N/A').charAt(0)}`
                      }
                      alt={credit.title || credit.name}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-semibold movieLineClamp1 mb-1">
                        {credit.title || credit.name}
                      </h4>
                      {credit.character && (
                        <p className="text-zinc-300 text-sm movieLineClamp1 mb-1">
                          as {credit.character}
                        </p>
                      )}
                      {credit.job && !credit.character && (
                        <p className="text-zinc-300 text-sm movieLineClamp1 mb-1">
                          {credit.job}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-sm text-zinc-400">
                        <span>
                          {new Date(credit.release_date || credit.first_air_date || '').getFullYear() || 'N/A'}
                        </span>
                        {credit.vote_average && (
                          <div className="flex items-center gap-1 text-yellow-400">
                            <i className="ri-star-fill text-xs"></i>
                            <span>{credit.vote_average.toFixed(1)}</span>
                          </div>
                        )}
                        <span className="capitalize">
                          {credit.media_type === 'tv' ? 'TV Show' : 'Movie'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
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
          .movieLineClamp6 {
            display: -webkit-box;
            -webkit-line-clamp: 6;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}
      </style>
    </div>
  );
};

export default PersonDetails;