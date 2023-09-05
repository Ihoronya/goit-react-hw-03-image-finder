import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38442536-4b02577f719ec61ae18bd0825';

export const getArticles = async (text, page) => {
  
  try {
    const response  = await axios.get(
      `${BASE_URL}/?q=${text}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`);
      if (response.data.hits.length === 0) {
        throw new Error('error');
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  };