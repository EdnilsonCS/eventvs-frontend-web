import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  & > div {
    margin-top: 23px;
  }
`;

export const Name = styled.span`
  font-size: 20px;
  font-weight: 500;
`;

export const UserInformation = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 28px;

  svg {
    border: 1px solid black;
    border-radius: 100%;
    padding: 10px;
  }
`;

export const Email = styled.span`
  font-size: 12px;
  font-weight: 500;
`;

export const TextsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 28px;
`;

export const TitlePage = styled.h1`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
  line-height: 31px;

  color: #6a2aba;
`;

export const Button = styled.button`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #4a4a4a;
  border: none;
  background: none;
  margin-top: 18px;
`;
