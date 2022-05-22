import styled from 'styled-components';
import { ButtonInterface } from '../types/customButtonInterface';

const CustomButton = ({onClick, text} : ButtonInterface) => {
  return (
    <ButtonWrapper onClick={onClick}>{text}</ButtonWrapper>
  )
}

export default CustomButton

const ButtonWrapper = styled.div`
    color: ${({ theme }) => theme.colors.blue};
    font-size: ${({ theme }) => theme.size.large};
    cursor: pointer;
`;