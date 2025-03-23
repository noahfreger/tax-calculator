import styled from 'styled-components';

interface ButtonProps {
  children?: React.ReactNode;
}

type ButtonType = ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

const StyledButton = styled.button`
  margin-top: 16px;
  width: 100%;
  background-color: #2563eb;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 8px;
  &:hover {
    background-color: #1d4ed8;
  }
  &:disabled {
    background-color: #d1d5db;
    cursor: not-allowed;
  }
`;

// Custom reusable button component
export const Button = ({ children, ...props }: ButtonType) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};
