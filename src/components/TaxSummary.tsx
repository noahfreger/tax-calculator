import { JSX, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from './shared/Button';
import { FormValues } from './TaxCalculator';
import { TaxBracket, useGetTaxBrackets } from '../hooks/useGetTaxBrackets';
import { Title } from './shared/Title';
import { SummaryTable } from './SummaryTable';
import { styleCurrency } from '../utils/styleCurrency';

interface TaxSummaryProps {
  onBack: (previousData: FormValues) => void;
  formData: FormValues;
}

const Container = styled.div`
  justify-content: space-between;
  min-height: 275px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 384px;
`;

const TotalTaxesOwed = styled.div`
  font-weight: bold;
  span {
    color: red;
  }
`;

const calculateTotalTaxesOwed = (taxes: number[]) => taxes.reduce((total, tax) => total + tax, 0);

export const TaxSummary = ({ onBack, formData }: TaxSummaryProps): JSX.Element => {
  const { taxBrackets, loading, error } = useGetTaxBrackets(formData.year);
  const [taxesInfo, setTaxesInfo] = useState<TaxBracket[]>([]);

  const handleClick = () => {
    onBack(formData);
  };

  // Calculate taxes owed based on the tax brackets and the user's income
  useEffect(() => {
    if (taxBrackets.length === 0) return;
    setTaxesInfo([]);
    const income = formData.annualIncome;

    taxBrackets.forEach((bracket) => {
      let taxesOwed = undefined;
      if (income >= bracket.min) {
        const max = bracket.max ?? income;
        const taxableIncome = Math.min(max, income) - bracket.min;
        taxesOwed = taxableIncome * bracket.rate;
      }
      setTaxesInfo((prev) => [...prev, { ...bracket, taxesOwed }]);
    });
  }, [taxBrackets, formData]);

  return (
    <Container>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p data-testid="summary-error-msg">Something went wrong. Please try again.</p>
      ) : (
        <>
          <Title>Tax Summary {formData.year}</Title>
          <SummaryTable taxesInfo={taxesInfo} />
          <TotalTaxesOwed>
            Total taxes owed: &nbsp;
            <span data-testid="total-taxes-owed">
              {styleCurrency(calculateTotalTaxesOwed(taxesInfo.map((taxInfo) => taxInfo.taxesOwed ?? 0)))}
            </span>
          </TotalTaxesOwed>
        </>
      )}
      <Button disabled={loading} onClick={handleClick}>
        Back
      </Button>
    </Container>
  );
};
