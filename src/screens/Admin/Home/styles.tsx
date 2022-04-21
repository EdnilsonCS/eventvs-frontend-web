import styled from 'styled-components';

export const Wrapper = styled.div`
  & > div {
    margin-top: 23px;
  }
`;

export const Card = styled.div`
  border: 1px solid #6d43a1;
  border-radius: 10px;
  justify-content: space-between;
  padding: 10px 16px;
`;

export const CardTitle = styled.span`
  color: #6d43a1;
`;

export const Paragraph = styled.span``;

export const TopCard = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const CardBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Button = styled.button`
  border: 0px;
  margin-top: 28px;
  background: #6a2aba;
  border-radius: 10px;
  padding: 10px 0px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 29px;
  color: white;
  height: 50px;
  margin-bottom: 11px;
  width: 100%;

  & + button {
    margin-left: 10px;
  }
`;

export const ButtonNot = styled(Button)`
  background: #d11717;
`;
