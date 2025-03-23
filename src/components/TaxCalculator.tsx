import styled from 'styled-components';
import { TaxForm } from './TaxForm';
import { useState } from 'react';
import { TaxSummary } from './TaxSummary';

export type FormValues = {
  annualIncome: number;
  year: number;
};

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f3f4f6;
`;

export const TaxCalculator = () => {
  const [showSummary, setShowSummary] = useState(false);
  const [formData, setFormData] = useState<FormValues | null>(null);

  const handleBack = (data: FormValues) => {
    setFormData(data);
    setShowSummary((prev) => !prev);
  };

  const handleFormSubmit = (data: FormValues) => {
    setFormData(data);
    setShowSummary((prev) => !prev);
  };

  return (
    <Card>
      {showSummary && formData != null ? (
        <TaxSummary onBack={(data) => handleBack(data)} formData={formData} />
      ) : (
        <TaxForm onFormSubmit={(data) => handleFormSubmit(data)} formData={formData} />
      )}
    </Card>
  );
};
