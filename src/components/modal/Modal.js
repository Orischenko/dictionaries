import React  from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const Container = styled.div`
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.54);
    
  > div {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    max-width: 60rem;
    border-radius: 1rem;
    background-color: var(--color-white);
    transform: translate(-50%, -50%);
    padding: 4rem 3rem;
    
    @media ${({ theme }) => theme.mediaQueries.medium} { {
        max-height: calc(100% - 30px);
        overflow-y: scroll;
    }
    
    @media ${({ theme }) => theme.mediaQueries.small} {
        max-width: 40rem;
    }
  }
`;

const Modal = ({ children }) => {
    return ReactDOM.createPortal(
        <Container>
            <div>
                {children}
            </div>
        </Container>,
        document.getElementById('portal')
    )
};

export default Modal