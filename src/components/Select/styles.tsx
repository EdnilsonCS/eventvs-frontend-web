import styled from 'styled-components';

export const Container = styled.div`
  & + div {
    margin-top: 20px;
  }
`;

export const Error = styled.span`
  height: 20px;
  margin: 4px 4px 0px 4px;
  color: #c53030;
`;
