import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../../axios';
import Topnav from "./Topnav";
import Cards from "./Cards";
import Dropdown from "./Dropdown";
import InfiniteScroll from 'react-infinite-scroll-component';

const People = () => {
  document.title = "Cineva | People ";
  const navigate = useNavigate();
  const [category, setCategory] = useState("popular");
  const [person, setPerson] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const GetPerson = async () => {
    try {
      const { data } = await axios.get(
        `/person/${category}?page=${page}`
      );
      if (data.results.length > 0) {
        setPerson((prev) => [...prev, ...data.results]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const refreshHandler = () => {
    setPage(1);
    setPerson([]);
    setHasMore(true);
  };

  useEffect(() => {
    refreshHandler();
    GetPerson(); // fetch the first page immediately
  }, [category]);

  useEffect(() => {
    if (person.length === 0 || page > 1) {
      GetPerson();
    }
  }, [page, category]);

  const loadMoreData = () => {
    if (hasMore) {
      setPage((prev) => prev + 1); // only increment here
    }
  };

  // Handle person click navigation
  const handlePersonClick = (personId) => {
    navigate(`/person/details/${personId}`);
  };

  return person.length > 0 ? (
    <div className="px-[3%] w-screen h-screen overflow-hidden overflow-y-auto bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#1F1E24]">
      <div className="w-full flex items-center justify-between">
        <h1 className='text-3xl font-bold text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
          >
          </i>
          People <small className="ml-2 text-sm text-zinc-600">({category})</small>
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <Dropdown
            title="Category"
            options={["popular", "latest"]}
            func={(e) => setCategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={person.length}
        next={loadMoreData} // this increments page
        hasMore={hasMore}
        loader={<h1 className="text-center text-zinc-400">Loading...</h1>}
        scrollThreshold={0.9}
      >
        <Cards 
          data={person} 
          title="person" 
          onItemClick={handlePersonClick}
        />
      </InfiniteScroll>
    </div>
  ) : (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#6556CD] mx-auto mb-4"></div>
        <h2 className="text-xl text-zinc-400">Loading People...</h2>
      </div>
    </div>
  );
}

export default People