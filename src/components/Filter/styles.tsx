import styled from 'styled-components';

export const ButtonFilter = styled.button`
  border: none;
  background: none;
  display: flex;
  align-items: center;
  color: #6d43a1;
  span {
    margin-left: 6px;
  }
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0px;
  margin-top: 10px;
  background: #6a2aba;
  border-radius: 10px;
  padding: 10px 38px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 29px;
  width: 100%;
  color: white;
  height: 40px;
  margin-bottom: 11px;
`;

export const ModalFilter = styled.form`
  position: absolute;
  top: 25px;
  background: white;
  padding: 10px;
  box-shadow: 1px 1px 5px #6d43a1;

  span {
    margin-left: 5px;
  }

  span + div {
    margin-bottom: 10px;
  }
`;

export const Container = styled.div`
  position: relative;
`;
