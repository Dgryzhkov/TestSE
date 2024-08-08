import axios from 'axios';

const API_URL = 'https://api.pexels.com/v1/';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: process.env.REACT_APP_PEXELS_API_KEY,
  },
});

export const fetchCuratedPhotos = async (page: number) => {
  const response = await axiosInstance.get(`curated?page=${page}`);
  return response.data.photos;
};
