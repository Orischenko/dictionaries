import React  from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  width: 100%;
  min-height: calc(100vh - 6rem);
  text-align: center;
  padding: 4rem 3rem;
`;

const Description = styled.h4`
  margin-bottom: 4rem;
`;

const PageWrapper = ({ title, description, children }) => {
    return (
        <Wrapper>
            {title && <h2>{title}</h2>}
            <Description>{description}</Description>
            {children}
        </Wrapper>
    );
};

export default PageWrapper;