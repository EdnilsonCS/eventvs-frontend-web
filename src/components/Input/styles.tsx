import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  & + div {
    margin-top: 20px;
  }
`;

export const ContainerInput = styled.div<ContainerProps>`
  background: white;
  border-radius: 20px;
  display: flex;
  height: 54px;
  align-items: center;
  border: 1px solid #232129;
  color: black;
  padding: 16px;
  width: 100%;

  ${props =>
    props.isErrored &&
    css`
      border: 1px solid #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #6d43a1;
      border: 1px solid #6d43a1;
    `}

  input {
    flex: 1;
    border: 0;
    background: transparent;
    color: #000000;
    &::placeholder {
      color: #666360;
    }
  }
  svg {
    margin-right: 16px;
  }
`;

export const Error = styled.span`
  height: 20px;
  margin: 4px 4px 0px 4px;
  color: #c53030;
`;
