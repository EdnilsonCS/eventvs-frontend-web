import styled from 'styled-components';

export const Title = styled.h3`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 39px;
  margin-top: 25px;
`;

export const Card = styled.div`
  display: flex;
  position: absolute;
  width: calc(100vw - 60px);
  height: 100%;
  background-color: #ffffffbb;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    width: 100%;
  }
`;

export const WrapperParticipante = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  height: 100%;
  background-color: white;

  padding: 10px 30px;

  @media (min-width: 768px) {
    width: 500px;
  }
`;

export const NameParticipante = styled.span`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 27px;
  margin-top: 10px;
  color: black;
  font-size: 20px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  width: 100%;

  button {
    border: none;
    margin-top: 30px;
    background: none;
    margin-left: 20px;
  }
`;
