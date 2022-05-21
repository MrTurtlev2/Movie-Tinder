import styled from 'styled-components';

interface LayoutInterface {
    children : React.ReactNode
}

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