import styled from 'styled-components';

const Container = styled.div`
  margin: 0 auto;
  padding: 0 24px;
  position: relative;

  @media (min-width: 768px) {
    max-width: 720px;
    padding: 0px;
  }

  @media (min-width: 1199px) {
    max-width: 1024px;
  }
`;

export default Container;
