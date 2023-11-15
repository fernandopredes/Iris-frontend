import axios from 'axios';

export interface IrisFormData {
  sepal_length: number;
  sepal_width: number;
  petal_length: number;
  petal_width: number;
}

export const predictIris = async (formData:IrisFormData) => {
  try {
    const response = await axios.post('http://localhost:5000/prediction', formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching the prediction:', error)
    return null;
  }
};
