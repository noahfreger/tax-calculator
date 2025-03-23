import styled from 'styled-components';
import { TaxBracket } from '../hooks/useGetTaxBrackets';
import { styleCurrency } from '../utils/styleCurrency';

interface SummaryTableProps {
  taxesInfo: TaxBracket[];
}

const StlyedTableHeader = styled.th`
  text-align: left;
`;

export const SummaryTable = (props: SummaryTableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <StlyedTableHeader>Income</StlyedTableHeader>
          <StlyedTableHeader>Tax</StlyedTableHeader>
          <StlyedTableHeader>Taxes Owed</StlyedTableHeader>
        </tr>
      </thead>
      <tbody>
        {props.taxesInfo.map((bracket, index) => {
          return (
            <tr key={index}>
              <td>
                {bracket.max != null
                  ? `${styleCurrency(bracket.min)} - ${styleCurrency(bracket.max)}`
                  : `Greater than ${styleCurrency(bracket.min)}`}
              </td>
              <td>{(bracket.rate * 100).toFixed(2)}%</td>
              <td>{bracket.taxesOwed != null && styleCurrency(bracket.taxesOwed)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
