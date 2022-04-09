import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  padding-top: 31px;
  padding-bottom: 32px;
  background-color: #6a2aba;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.06);

  @media (min-width: 768px) {
    box-shadow: initial;
  }
`;

export const Logo = styled.span`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #ffffff;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  button {
    background: none;
    border: none;
  }

  @media (min-width: 769px) {
    button {
      display: none;
    }
  }
`;

interface NavbarEndProps {
  isOpen: boolean;
}

export const NavbarEnd = styled.div<NavbarEndProps>`
  display: none;

  @media (min-width: 769px) {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;

    button {
      display: none;
    }
  }

  .navbar-item {
    margin-left: 44px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;

    color: #ffffff;
  }

  @media (max-width: 768px) {
    ${({ isOpen }) =>
      isOpen &&
      css`
        box-shadow: 0 8px 16px rgb(10 10 10 / 10%);

        display: flex;
        position: absolute;
        flex-direction: column;
        margin-top: 65px;
        right: 10px;
        padding-top: 31px;
        padding-bottom: 32px;
        padding-right: 10px;
        padding-left: 10px;
        align-items: center;
        justify-content: space-between;

        .navbar-item {
          margin-bottom: 10px;
          margin-left: 0px;
          color: #6a2aba;
        }
      `}
  }
`;
