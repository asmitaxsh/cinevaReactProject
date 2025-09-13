import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../../axios';
import Topnav from "./Topnav";
import Cards from "./Cards";
import Dropdown from "./Dropdown";
import InfiniteScroll from 'react-infinite-scroll-component';

const Movies = () => {
  document.title = "Cineva | Movies ";
  const navigate = useNavigate();
  const [category, setCategory] = useState("now_playing");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  
  // Track loaded movie IDs to prevent duplicates
  const loadedMovieIds = useRef(new Set());
  const currentCategoryRef = useRef(category);

  // Fetch movies function
  const fetchMovies = async (cat, pageNum, isNewCategory = false) => {
    // Prevent multiple requests for the same page
    if (loading) return;
    
    console.log(`Fetching ${cat} page ${pageNum}, isNewCategory: ${isNewCategory}`);
    setLoading(true);
    
    try {
      const { data } = await axios.get(`/movie/${cat}?page=${pageNum}`);
      
      console.log(`API Response: ${data.results?.length} movies, total pages: ${data.total_pages}`);
      
      // Only process if this is still the current category
      if (currentCategoryRef.current !== cat) {
        console.log('Category changed, ignoring response');
        setLoading(false);
        return;
      }
      
      if (data.results && data.results.length > 0) {
        // Reset movie IDs if new category
        if (isNewCategory) {
          loadedMovieIds.current.clear();
        }
        
        // Filter out duplicates
        const newMovies = data.results.filter(movie => {
          if (loadedMovieIds.current.has(movie.id)) {
            return false;
          }
          loadedMovieIds.current.add(movie.id);
          return true;
        });
        
        console.log(`${newMovies.length} new unique movies found`);
        
        setMovies(prevMovies => {
          if (isNewCategory) {
            return newMovies;
          }
          return [...prevMovies, ...newMovies];
        });
        
        // Check if we should continue loading
        if (newMovies.length === 0 || (data.total_pages && pageNum >= data.total_pages)) {
          console.log('No more movies to load');
          setHasMore(false);
        }
      } else {
        console.log('No results, stopping');
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      // Don't stop loading on error, just log it
    } finally {
      setLoading(false);
    }
  };

  // Handle category changes
  const handleCategoryChange = (newCategory) => {
    if (newCategory === category) return;
    
    console.log(`Category changing from ${category} to ${newCategory}`);
    
    setCategory(newCategory);
    currentCategoryRef.current = newCategory;
    setMovies([]);
    setPage(1);
    setHasMore(true);
    setLoading(false);
    loadedMovieIds.current.clear();
  };

  // Load initial data when category changes
  useEffect(() => {
    currentCategoryRef.current = category;
    fetchMovies(category, 1, true);
  }, [category]);

  // Load more data for infinite scroll
  const loadMore = () => {
    if (!hasMore || loading) {
      console.log('Load more blocked:', { hasMore, loading });
      return;
    }
    
    const nextPage = page + 1;
    console.log(`Loading more data - page ${nextPage}`);
    setPage(nextPage);
    fetchMovies(category, nextPage, false);
  };

  return (
    <div className="px-[3%] w-screen h-screen overflow-hidden overflow-y-auto bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#1F1E24]">
      <div className="w-full flex items-center justify-between mb-4">
        <h1 className='text-3xl font-bold text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
          ></i>
          Movies <small className="ml-2 text-sm text-zinc-600">({category})</small>
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <Dropdown
            title="Category"
            options={["popular", "top_rated", "upcoming", "now_playing"]}
            func={(e) => handleCategoryChange(e.target.value)}
          />
          <div className="w-[2%]"></div>
        </div>
      </div>

      <div className="w-full text-sm text-zinc-500 mb-2">
        Movies loaded: {movies.length} | Page: {page} | Loading: {loading ? 'Yes' : 'No'}
      </div>

      {movies.length > 0 ? (
        <div 
          id="scrollableDiv" 
          className="h-[calc(100vh-160px)] overflow-y-auto"
        >
          <InfiniteScroll
            dataLength={movies.length}
            next={loadMore}
            hasMore={hasMore}
            loader={
              <div className="text-center py-4">
                <h1 className="text-zinc-400">Loading more movies...</h1>
              </div>
            }
            endMessage={
              <div className="text-center py-4">
                <p className="text-zinc-600">All movies loaded!</p>
              </div>
            }
            scrollableTarget="scrollableDiv"
            scrollThreshold={0.8}
          >
            <Cards data={movies} title="movie" />
          </InfiniteScroll>
        </div>
      ) : loading ? (
        <div className="w-full h-[calc(100vh-160px)] flex items-center justify-center">
          <h2 className="text-xl text-zinc-400">Loading movies...</h2>
        </div>
      ) : (
        <div className="w-full h-[calc(100vh-160px)] flex items-center justify-center">
          <h2 className="text-xl text-zinc-400">No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default Movies;