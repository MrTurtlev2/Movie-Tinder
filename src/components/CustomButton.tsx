import styled from 'styled-components';

interface ButtonInterface {
    onClick: () => void,
    text: String
}

const CustomButton = ({onClick, text} : ButtonInterface) => {
  return (
    <ButtonWrapper onClick={onClick}>{text}</ButtonWrapper>
  )
}



export default CustomButton

const ButtonWrapper = styled.div`
    color: ${({ theme }) => theme.colors.blue};
    /* font-weight: ${({ theme }) => theme.weight.bold}; */
    font-size: ${({ theme }) => theme.size.medium};
`;