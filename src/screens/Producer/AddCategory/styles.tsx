import styled from 'styled-components';

export const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 10px;
`;

export const Row = styled.div`
  @media (min: 555px) {
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

export const Title = styled.h1`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 39px;
  margin-bottom: 39px;
  margin-top: 25px;
`;
