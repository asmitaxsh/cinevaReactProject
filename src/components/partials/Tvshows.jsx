import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../../axios';
import Topnav from "./Topnav";
import Cards from "./Cards";
import Dropdown from "./Dropdown";
import InfiniteScroll from 'react-infinite-scroll-component';

const Tvshows = () => {
  document.title = "Cineva | Tv Shows ";
  const navigate = useNavigate();
  const [category, setCategory] = useState("airing_today");
  const [tv, setTv] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Fetch TV shows function
  const fetchTvShows = async (cat, pageNum, isNewCategory = false) => {
    if (loading) return;
    
    console.log(`Fetching ${cat} page ${pageNum}, isNewCategory: ${isNewCategory}`);
    setLoading(true);
    
    try {
      const { data } = await axios.get(`/tv/${cat}?page=${pageNum}`);
      
      console.log(`API Response: ${data.results?.length} tv shows, total pages: ${data.total_pages}`);
      
      if (data.results && data.results.length > 0) {
        setTv(prevTv => {
          if (isNewCategory) {
            return data.results;
          }
          return [...prevTv, ...data.results];
        });
        
        // Check if we should continue loading
        if (data.total_pages && pageNum >= data.total_pages) {
          console.log('No more tv shows to load');
          setHasMore(false);
        }
      } else {
        console.log('No results, stopping');
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching tv shows:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle category changes
  const handleCategoryChange = (newCategory) => {
    if (newCategory === category) return;
    
    console.log(`Category changing from ${category} to ${newCategory}`);
    
    setCategory(newCategory);
    setTv([]);
    setPage(1);
    setHasMore(true);
    setLoading(false);
  };

  // Load initial data when category changes
  useEffect(() => {
    fetchTvShows(category, 1, true);
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
    fetchTvShows(category, nextPage, false);
  };

  return (
    <div className="px-[3%] w-screen h-screen overflow-hidden overflow-y-auto bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#1F1E24]">
      <div className="w-full flex items-center justify-between mb-4">
        <h1 className='text-3xl font-bold text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
          ></i>
          Tv Shows <small className="ml-2 text-sm text-zinc-600">({category})</small>
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <Dropdown
            title="Category"
            options={[
              "on_the_air",
              "popular",
              "top_rated",
              "airing_today",
            ]}
            func={(e) => handleCategoryChange(e.target.value)}
          />
          <div className="w-[2%]"></div>
        </div>
      </div>

      <div className="w-full text-sm text-zinc-500 mb-2">
        TV Shows loaded: {tv.length} | Page: {page} | Loading: {loading ? 'Yes' : 'No'}
      </div>

      {tv.length > 0 ? (
        <div 
          id="tvScrollableDiv" 
          className="h-[calc(100vh-160px)] overflow-y-auto"
        >
          <InfiniteScroll
            dataLength={tv.length}
            next={loadMore}
            hasMore={hasMore}
            loader={
              <div className="text-center py-4">
                <h1 className="text-zinc-400">Loading more tv shows...</h1>
              </div>
            }
            endMessage={
              <div className="text-center py-4">
                <p className="text-zinc-600">All tv shows loaded!</p>
              </div>
            }
            scrollableTarget="tvScrollableDiv"
            scrollThreshold={0.8}
          >
            <Cards data={tv} title="tv" />
          </InfiniteScroll>
        </div>
      ) : loading ? (
        <div className="w-full h-[calc(100vh-160px)] flex items-center justify-center">
          <h2 className="text-xl text-zinc-400">Loading tv shows...</h2>
        </div>
      ) : (
        <div className="w-full h-[calc(100vh-160px)] flex items-center justify-center">
          <h2 className="text-xl text-zinc-400">No tv shows found</h2>
        </div>
      )}
    </div>
  );
};

export default Tvshows;