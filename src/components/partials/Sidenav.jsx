import axios from '../../axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Sidenav = () => {

  return (
    <div className='w-[20%] h-full border-r-2 border-zinc-400 p-10 overflow-auto overflow-x-hidden bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#1F1E24]'>
      <h1 className='text-2xl text-white font-bold'>
        <i className="text-[#6556CD] ri-tv-line mr-2"></i>
        <span className='text-2xl'>Cineva</span>
      </h1>
    <nav className='flex flex-col text-zinc-400 text-xl gap-3'>
        <h1 className='text-white font-semibold text-xl mt-10 mb-5'>
          New Feeds
        </h1>
            <Link 
                to="/trending" 
                className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5'
            >
                <i className="ri-fire-line"></i> Trending
            </Link>
            <Link 
                to="/popular" className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5'>
                <i className="ri-sparkling-line"></i> Popular
            </Link>
            <Link 
                to="/movies" className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5'>
                <i className="ri-movie-line"></i> Movies
            </Link>
            <Link 
                to="/tvshows" 
                className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5'>
                <i className="ri-tv-2-line"></i> Tv Shows
            </Link>
            <Link 
                to="/person" 
                className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5'>
                <i className="ri-team-line"></i> People
            </Link>

        </nav>
        <hr className='border-none h-[1px] bg-zinc-400 mt-8 mb-4'/>
        <nav className='flex flex-col text-zinc-400 text-xl gap-3'>
            <h1 className='text-white font-semibold text-xl mb-5'>Website Info</h1>
            <Link 
                to="/about" 
                className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5'>
                    <i className="ri-information-line"></i> About Cineva
            </Link>
            <Link 
                to="/contact" 
                className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5'>
                    <i className="ri-phone-line"></i> Contact Us
            </Link>
        </nav>

    </div>
  );
};

export default Sidenav;