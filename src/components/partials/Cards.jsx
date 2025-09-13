import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.webp";

const Cards = ({ data, title, onItemClick }) => {
  // Helper function to get the correct route
  const getRoute = (item) => {
    switch (title) {
      case "movie":
        return `/movies/details/${item.id}`;
      case "tv":
        return `/tvshows/details/${item.id}`;
      case "person":
        return `/person/details/${item.id}`;
      default:
        return `/movies/details/${item.id}`;
    }
  };

  // Handle click for items
  const handleItemClick = (item, e) => {
    if (onItemClick) {
      e.preventDefault();
      onItemClick(item.id);
    }
  };

  return (
    <div className="flex flex-wrap w-full h-full px-[2%]"> {/* Removed background, reduced padding */}
      {data.map((item, index) => (
        <Link
          key={index}
          to={getRoute(item)}
          onClick={(e) => handleItemClick(item, e)}
          className="relative w-[25vh] mr-[3%] mb-[3%] group cursor-pointer transform transition-all duration-300 hover:scale-105"
        >
          {/* Card Container */}
          <div className="relative overflow-hidden rounded-xl shadow-lg bg-zinc-900/80 backdrop-blur-sm group-hover:shadow-2xl group-hover:shadow-purple-500/20 transition-all duration-300 border border-zinc-800/50">
            {/* Image */}
            <img
              className="h-[40vh] w-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
              src={
                item.poster_path || item.backdrop_path || item.profile_path
                  ? `https://image.tmdb.org/t/p/original${
                      item.poster_path || item.backdrop_path || item.profile_path
                    }`
                  : noimage
              }
              alt={item.title || item.name || item.original_name || item.original_title}
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <h1 className="text-lg font-semibold text-white mb-2 line-clamp-2 drop-shadow-lg">
                {item.title || item.name || item.original_name || item.original_title}
              </h1>

              {/* Rating for movies/TV shows */}
              {(title === "movie" || title === "tv") && item.vote_average && (
                <div className="flex items-center mb-2">
                  <i className="ri-star-fill text-yellow-400 mr-1 drop-shadow-sm"></i>
                  <span className="text-sm text-white font-medium drop-shadow-sm">
                    {item.vote_average.toFixed(1)}
                  </span>
                </div>
              )}

              {/* Known for department for people */}
              {title === "person" && item.known_for_department && (
                <p className="text-sm text-zinc-200 mb-2 drop-shadow-sm">
                  {item.known_for_department}
                </p>
              )}

              {/* Release/Air Date */}
              {(item.release_date || item.first_air_date) && (
                <p className="text-sm text-zinc-300 drop-shadow-sm">
                  {new Date(item.release_date || item.first_air_date).getFullYear()}
                </p>
              )}
            </div>

            {/* Media Type Badge */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs px-3 py-1 rounded-full capitalize font-medium shadow-lg">
                {title}
              </span>
            </div>

            {/* Hover Play Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300 border border-white/30">
                <i className="ri-play-fill text-white text-3xl"></i>
              </div>
            </div>
          </div>
        </Link>
      ))}

      {/* Custom CSS for line clamping */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Cards;