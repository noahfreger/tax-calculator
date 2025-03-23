import { useEffect, useState } from 'react';

export interface TaxBracket {
  max: number;
  min: number;
  rate: number;
  taxesOwed?: number;
}

// Custom hook to fetch tax brackets for a given year
export const useGetTaxBrackets = (year: number) => {
  const [taxBrackets, setTaxBrackets] = useState<TaxBracket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      fetch(`http://localhost:5001/tax-calculator/tax-year/${year}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Server Error');
          }
          return response.json();
        })
        .then((data) => {
          setTaxBrackets(data.tax_brackets);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchData();
  }, [year]);

  return { taxBrackets, loading, error };
};
