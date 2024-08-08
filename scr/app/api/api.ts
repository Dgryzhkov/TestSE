import axios from 'axios';
import Domains from '../../shared/config/Domains';

const API_URL = 'https://api.pexels.com/v1/';
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `${Domains.getApiDomain()}`,
  },
});

export const fetchCuratedPhotos = async (page: number) => {
  const response = await axiosInstance.get(`curated?page=${page}`);
  return response.data.photos;
};
