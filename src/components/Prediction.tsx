import React, { useState } from 'react';
import styled from 'styled-components';
import { predictIris } from '../api/api';
import type { IrisFormData } from '../types/IrisFormData';
import leftImage from '../assets/left.png';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
  margin: auto;
`;

const StyledInput = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const StyledButton = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
`;

const PredictionResult = styled.div`
  margin-top: 20px;
  padding: 10px;
  border-radius: 4px;
  background-color: #f8f9fa;
`;

const LeftImage = styled.img`
`
const RightImage = styled.img`
`

interface PredictionResponse {
  id: number;
  sepal_length: number;
  sepal_width: number;
  petal_length: number;
  petal_width: number;
  predicted_class: string;
}

const PredictionForm = () => {
  const [formData, setFormData] = useState<IrisFormData>({
    sepal_length: 0,
    sepal_width: 0,
    petal_length: 0,
    petal_width: 0,
  });
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const irisType = await predictIris(formData);
    setPrediction(irisType);
  };

  return (
    <>
    <StyledForm onSubmit={handleSubmit}>
      <StyledInput
        type="number"
        name="sepal_length"
        placeholder="Sepal Length (cm)"
        value={formData.sepal_length.toString()}
        onChange={handleChange}
        required
      />
      <StyledInput
        type="number"
        id="sepal_width"
        name="sepal_width"
        value={formData.sepal_width}
        onChange={handleChange}
        required
      />
      <StyledInput
        type="number"
        id="petal_length"
        name="petal_length"
        value={formData.petal_length}
        onChange={handleChange}
        required
      />
      <StyledInput
        type="number"
        id="petal_width"
        name="petal_width"
        value={formData.petal_width}
        onChange={handleChange}
        required
      />
      <StyledButton type="submit">Predict Iris Type</StyledButton>
      {prediction && <PredictionResult>Predicted Iris Type: {prediction.predicted_class}</PredictionResult>}
    </StyledForm>
    {/* <LeftImage src={left} alt=""/> */}
    <img src={LeftImage} alt="" />
    </>
  );
};

export default PredictionForm;
