import styled from 'styled-components';

export const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 10px;
`;

export const Row = styled.div`
  & > div {
    margin-top: 20px;
  }
  @media (min-width: 555px) {
    display: flex;
    flex-direction: row;
    align-items: flex-start;

    & > div + div {
      margin-left: 20px;
    }

    & > button + button {
      margin-left: 20px;
    }
  }
`;

export const TitlePage = styled.h1`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
  line-height: 31px;
  margin-top: 25px;
  color: #6a2aba;
`;

export const Button = styled.button`
  border: 0px;
  margin-top: 28px;
  background: #6a2aba;
  border-radius: 10px;
  padding: 10px 38px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: white;
  height: 50px;
  margin-bottom: 11px;
  width: 100%;
`;

export const ButtonCancel = styled(Button)`
  background: #d11717;
`;
