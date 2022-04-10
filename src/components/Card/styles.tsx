import styled from 'styled-components';

export const Container = styled.div`
  border: 1px solid #6d43a1;
  border-radius: 10px;
  justify-content: space-between;
  padding: 10px 16px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 8px 0;
`;

export const Title = styled.span`
  color: #6d43a1;
  font-size: 20px;
  width: 200px;
`;

export const Bold = styled.span`
  font-weight: bold;
`;

export const Button = styled.button`
  border-radius: 7px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 14px;
  line-height: 21px;
  border: none;
  color: white;
`;
