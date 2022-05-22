import styled from 'styled-components';
import { LayoutInterface } from '../../types/layoutInterface';

export const Layout = ({children} : LayoutInterface) => {
  return (
    <LayoutWrapper>
        {children}
    </LayoutWrapper>
  )
}


const LayoutWrapper = styled.div`
    position: relative;
`;