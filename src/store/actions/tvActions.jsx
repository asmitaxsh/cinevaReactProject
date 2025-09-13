// tvActions.js
import axios from "../../axios";
import { loadtv, removetv } from "../reducers/tvSlice";

export const asyncloadtv = (id) => async (dispatch, getstate) => {
    try {
        const detail = await axios.get(`/tv/${id}`);
        const externalid = await axios.get(`/tv/${id}/external_ids`);
        const recommendations = await axios.get(`/tv/${id}/recommendations`);
        const similar = await axios.get(`/tv/${id}/similar`);
        const translations = await axios.get(`/tv/${id}/translations`);
        const videos = await axios.get(`/tv/${id}/videos`); // Add this line
        const watchproviders = await axios.get(`/tv/${id}/watch/providers`);
        
        let theultimatedetails = {
            detail: detail.data,
            externalid: externalid.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            translations: translations.data.translations,
            videos: videos.data.results, // Add this line
            watchproviders: watchproviders.data.results.US,
        };

        dispatch(loadtv(theultimatedetails));
    } catch (error) {
        console.log("Error: ", error);
    }
};

export { removetv };