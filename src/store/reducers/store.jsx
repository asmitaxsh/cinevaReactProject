import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice.jsx";
import tvReducer from "./tvSlice.jsx";
import personReducer from "./personSlice.jsx";

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    tv: tvReducer,
    person: personReducer,
  },
});
