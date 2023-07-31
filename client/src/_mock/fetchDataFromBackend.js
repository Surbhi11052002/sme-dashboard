import axios from 'axios';

export const fetchDataFromBackend = async (token) => {
  try {
    const response = await axios.get('http://localhost:8000/api/get-users/:id', {
      headers: {
        token,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
