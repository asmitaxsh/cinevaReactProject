import './App.css'
import { Routes, Route } from 'react-router-dom';
import Trending from './components/Trending';
import Popular from './components/partials/Popular';
import Movies from './components/partials/Movies';
import SeasonDetails from './components/partials/SeasonDetails';
import Tvshows from './components/partials/Tvshows';
import People from './components/partials/People';
import About from './components/partials/About';
import Contact from './components/partials/Contact';
import TvDetails from './components/partials/TvDetails';
import PersonDetails from './components/partials/PersonDetails';
import Home from './components/Home';
import Moviedetails from './components/partials/Moviedetails';
import Trailer from './components/partials/Trailer';


const App = () => {
  return (
    <div className='bg-[#1F1E24] w-screen h-screen flex'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trailer/:id" element={<Trailer />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />

        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/details/:id" element={<Moviedetails />} />

        <Route path="/tvshows/details/:id/season/:seasonNumber" element={<SeasonDetails />} />

        <Route path="/tvshows" element={<Tvshows />} />
        <Route path="/tvshows/details/:id" element={<TvDetails />} />

        <Route path="/person" element={<People />} />
        <Route path="/person/details/:id" element={<PersonDetails />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default App;
