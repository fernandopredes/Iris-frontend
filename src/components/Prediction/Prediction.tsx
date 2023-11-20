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
      <div className={styles.inputGroup}>
        <label htmlFor="sepal_length" className={styles.label}>Sepal Length (cm)</label>
        <input
          type="number"
          id="sepal_length"
          name="sepal_length"
          placeholder="1.75"
          value={formData.sepal_length.toString()}
          onChange={handleChange}
          required
          className={styles.input}
        />
      </div>

        <div className={styles.inputGroup}>
        <label htmlFor="sepal_width" className={styles.label}>Sepal Width (cm)</label>
        <input
          type="number"
          id="sepal_width"
          name="sepal_width"
          value={formData.sepal_width}
          placeholder="1.25"
          onChange={handleChange}
          required
          className={styles.input}
        />
        </div>
        <div className={styles.inputGroup}>
        <label htmlFor="petal_length" className={styles.label}>Petal Length (cm)</label>
        <input
          type="number"
          id="petal_length"
          name="petal_length"
          placeholder="3.25"
          value={formData.petal_length}
          onChange={handleChange}
          required
          className={styles.input}
        />
        </div>
        <div className={styles.inputGroup}>
        <label htmlFor="petal_width" className={styles.label}>Petal Width (cm)</label>
        <input
          type="number"
          id="petal_width"
          name="petal_width"
          placeholder="5.25"
          value={formData.petal_width}
          onChange={handleChange}
          required
          className={styles.input}
        />
        </div>

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
