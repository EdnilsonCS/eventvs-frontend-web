import styled from 'styled-components';

export const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 10px;
`;

export const Title = styled.h1`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 39px;
  margin-top: 25px;
`;

export const Subtitle = styled.h2`
  margin-top: 25px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 34px;
  color: #6a2aba;
`;

export const Description = styled.span`
  margin-top: 25px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 27px;

  color: #494949;
`;

export const Address = styled.span`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #000000;
  margin-top: 25px;
`;

export const ButtonContainer = styled.div`
  margin: 20px 0px;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
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

export const ButtonBack = styled(Button)`
  background: #808080;
`;
