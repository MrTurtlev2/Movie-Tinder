import styled from 'styled-components';
import {ButtonInterface} from '../types/customButtonInterface';
import {theme} from "../constants/theme";

const CustomButton = ({onClick, text, className}: ButtonInterface) => {
    return (
        <ButtonWrapper data-testid="decision-button" className={className} onClick={onClick}>{text}</ButtonWrapper>
    )
}

export default CustomButton

const ButtonWrapper = styled.div`
  color: ${theme.colors.blue};
  font-size: ${theme.size.large};
  cursor: pointer;

  &.Rejected {
    color: ${theme.colors.red};
  }

  &.Accepted {
    color: ${theme.colors.green};
  }
`;