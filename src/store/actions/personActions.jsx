import axios from "../../axios";
import { loadperson, removeperson } from "../reducers/personSlice";

export const asyncloadperson = (id) => async (dispatch, getstate) => {
  try {
    // These are the actual TMDB API endpoints available for persons
    const detail = await axios.get(`/person/${id}`);
    const externalid = await axios.get(`/person/${id}/external_ids`);
    const combinedCredits = await axios.get(`/person/${id}/combined_credits`);
    const movieCredits = await axios.get(`/person/${id}/movie_credits`);
    const tvCredits = await axios.get(`/person/${id}/tv_credits`);
    const images = await axios.get(`/person/${id}/images`);
    
    // Optional: Get translations if needed
    // const translations = await axios.get(`/person/${id}/translations`);

    let theultimatedetails = {
      detail: detail.data,
      externalid: externalid.data,
      combinedCredits: combinedCredits.data,
      movieCredits: movieCredits.data,
      tvCredits: tvCredits.data,
      images: images.data,
      // translations: translations.data, // Uncomment if you want translations
    };

    dispatch(loadperson(theultimatedetails));
  } catch (error) {
    console.log("Error: ", error);
  }
};

export { removeperson };