import React from 'react';
import { Link } from 'react-router-dom';

const HorizontalCards = ({ data }) => {
  return (
    <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
      <div className="flex gap-4 p-3">
        {data.map((d, i) => (
          <Link
          to={`/${d.media_type === "movie" ? "movies" : d.media_type === "tv" ? "tvshows" : "person"}/details/${d.id}`}
            key={i}
            className="min-w-[150px] max-w-[150px] bg-zinc-900 rounded-lg overflow-hidden shadow-md flex-shrink-0 hover:scale-105 transition-transform"
          >
            <img
              className="w-full h-[225px] object-cover"
              src={`https://image.tmdb.org/t/p/w300/${d.backdrop_path || d.poster_path}`}
              alt={d.name || d.title}
            />
            <div className="text-white p-2">
              <h1 className="text-sm font-semibold line-clamp-1">
                {d.name || d.title || d.original_name || d.original_title}
              </h1>
              <p className="text-xs text-zinc-400 line-clamp-2">
                {d.overview ? d.overview.slice(0, 60) : "No description available"}...
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HorizontalCards;
