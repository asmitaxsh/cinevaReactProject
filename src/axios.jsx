import axios from 'axios';

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MzZiNWQ3ZWFmNzI0NjEzOTA5NDRmZGQwZTI3NDgxZCIsIm5iZiI6MTc1NTMxNTgyMS4zOTkwMDAyLCJzdWIiOiI2ODlmZmU2ZDg1NmRiNjMyODllYzc0YWYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.uvbt-WjagFGhbz1aOSlReGPolW_EliFt-A971uvnwYc',
  },
});

export default instance;