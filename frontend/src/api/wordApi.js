import axios from 'axios';

// Fetch words from backend
export const getWords = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/words/');
    return response.data;
  } catch (error) {
    console.error('Error fetching words:', error);
    throw error; // Handle or propagate error as needed
  }
};
