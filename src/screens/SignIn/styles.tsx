import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(
    107.24deg,
    #6a2aba 0%,
    rgba(106, 42, 186, 0.75) 101.49%
  );
`;

export const Box = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 425px;
  justify-content: center;
  padding: 20px 25px;
  background: #ffffff;
  border-radius: 10px;
`;

export const Title = styled.h1`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 39px;
  margin-top: 23px;
  color: #000000;
`;

export const Subtitle = styled.h2`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  margin-bottom: 24px;
  line-height: 29px;
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
`;
