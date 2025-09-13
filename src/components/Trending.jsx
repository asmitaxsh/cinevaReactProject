import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import axios from '../axios';
import Cards from './partials/Cards';
import InfiniteScroll from 'react-infinite-scroll-component';

const Trending = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "Cineva | Trending ";

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );

      if (data.results.length > 0) {
        setTrending((prev) => [...prev, ...data.results]);
        setPage((prev) => prev + 1); // ✅ increment for next call
      } else {
        setHasMore(false); // ✅ stop infinite scroll
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  
  const refreshHandler = () => {
    // Reset everything first
    setPage(1);
    setTrending([]);
    setHasMore(true);
  };

  // Load initial data when component mounts or filters change
  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  // Load data when page or filters change
  useEffect(() => {
    if (trending.length === 0 || page > 1) {
      GetTrending();
    }
  }, [page, category, duration]);

  // Function to load more data (called by InfiniteScroll)
  const loadMoreData = () => {
    if (hasMore) {
      GetTrending();
    }
  };

  return trending.length > 0 ? (
    
    <div className="px-[3%] w-screen h-screen overflow-hidden overflow-y-auto bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#1F1E24]">

      <div className="w-full flex items-center justify-between">
        <h1 className='text-3xl font-bold text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line"
          ></i>
          Trending
        </h1>
        <div className="px-3 py-1 bg-gradient-to-r from-[#6556CD] to-[#9c88ff] rounded-full text-white text-sm font-medium">
                  Hot
                </div>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <Dropdown
            title="Category"
            options={["movie", "tv", "all"]}
            func={(e) => setCategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
          <Dropdown
            title="Duration"
            options={["week", "day"]}
            func={(e) => setDuration(e.target.value)}
          />
        </div>
      </div>

      {/* ✅ Infinite scroll starts here */}
      <InfiniteScroll
        dataLength={trending.length}
        next={GetTrending}
        hasMore={hasMore}
        loader={<h1 className="text-center text-zinc-400">Loading...</h1>}
        scrollThreshold={0.9} // ✅ triggers earlier for smoother UX
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <div className="w-full h-screen flex items-center justify-center">
      <h2 className="text-xl text-zinc-400">Loading...</h2>
    </div>

  );
};

export default Trending;
