// movieActions.js
import axios from "../../axios";
import { loadmovie, removemovie } from "../reducers/movieSlice";

export const asyncloadmovie = (id) => async (dispatch, getstate) => {
    try {
        const detail = await axios.get(`/movie/${id}`);
        const externalid = await axios.get(`/movie/${id}/external_ids`);
        const recommendations = await axios.get(`/movie/${id}/recommendations`);
        const similar = await axios.get(`/movie/${id}/similar`);
        const translations = await axios.get(`/movie/${id}/translations`);
        const videos = await axios.get(`/movie/${id}/videos`); // Add this line
        const watchproviders = await axios.get(`/movie/${id}/watch/providers`);
        
        let theultimatedetails = {
            detail: detail.data,
            externalid: externalid.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            translations: translations.data.translations,
            videos: videos.data.results, // Add this line
            watchproviders: watchproviders.data.results.US,
        };

        dispatch(loadmovie(theultimatedetails));
    } catch (error) {
        console.log("Error: ", error);
    }
};

export { removemovie };