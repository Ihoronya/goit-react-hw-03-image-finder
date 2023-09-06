import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '38442536-4b02577f719ec61ae18bd0825';


export const getArticles = async (text, page) => {

  const queryParams = {
    q: text,
    page,
    key: API_KEY,
    image_type: "photo",
    orientation: "horizontal",
    per_page: 12,
  };
  
  try {
    const response  = await axios.get('/', { params: queryParams });
      if (response.data.hits.length === 0) {
        throw new Error('error');
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  };