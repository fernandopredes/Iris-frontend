import React, { useState } from 'react';
import { predictIris } from '../../api/api';
import type { IrisFormData } from '../../types/IrisFormData';
import styles from './Prediction.module.css';

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
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="number"
          name="sepal_length"
          placeholder="Sepal Length (cm)"
          value={formData.sepal_length.toString()}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          type="number"
          name="sepal_width"
          value={formData.sepal_width}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          type="number"
          name="petal_length"
          value={formData.petal_length}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          type="number"
          name="petal_width"
          value={formData.petal_width}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Predict Iris Type
        </button>
        {prediction && (
          <div className={styles.result}>
            Predicted Iris Type: {prediction.predicted_class}
          </div>
        )}
      </form>
      <img className={styles.leftimage} src="/iris.png" alt="imagem de flores" />
      <img className={styles.rightimage} src="/iris.png" alt="imagem de flores" />
    </div>
  );
};

export default PredictionForm;
