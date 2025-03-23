import { JSX } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Button } from './shared/Button';
import { FormValues } from './TaxCalculator';
import { Title } from './shared/Title';

interface TaxFormProps {
  onFormSubmit: (data: FormValues) => void;
  formData?: FormValues | null;
}

const Form = styled.form`
  width: 384px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  display: block;
  color: #374151;
  font-weight: 500;
  padding-bottom: 2px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  outline: none;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  box-sizing: border-box; // Ensures that padding is included in the width
  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px #bfdbfe;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  outline: none;
  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px #bfdbfe;
  }
`;

const ErrorMsg = styled.div`
  padding-top: 2px;
  min-height: 4px;
  span {
    color: red;
  }
`;

export const TaxForm = (props: TaxFormProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>(props.formData != null ? { defaultValues: props.formData } : {});

  const onSubmit = handleSubmit((data) => {
    props.onFormSubmit(data);
  });

  return (
    <Form onSubmit={onSubmit}>
      <Title>Tax Calculator</Title>
      <div>
        <Label>Annual Income ($)</Label>
        <Input
          {...register('annualIncome', {
            required: 'Required',
            pattern: {
              value: /^[0-9]+$/,
              message: 'This field should be a number',
            },
          })}
          type="number"
          min={0}
          placeholder="Enter your Income"
          data-testid="income-input"
        />
        <ErrorMsg data-testid="error-msg">{errors?.annualIncome && <span>This field is required</span>}</ErrorMsg>
      </div>
      <div>
        <Label>Year</Label>
        <Select {...register('year')} data-testid="year-select">
          <option value={2022}>2022</option>
          <option value={2021}>2021</option>
          <option value={2020}>2020</option>
          <option value={2019}>2019</option>
        </Select>
      </div>
      <Button type="submit" data-testid="calculate-taxes-button">
        Calculate Taxes
      </Button>
    </Form>
  );
};
