import axios from 'axios';

const token = localStorage.getItem('token');

export const fetchDataFromBackend = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/get-users/:id', {
      headers: {
        token,
      },
    });
    // console.log(response);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
