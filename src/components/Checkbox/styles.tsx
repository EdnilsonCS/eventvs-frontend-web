import styled from 'styled-components';

export const InputCheck = styled.input`
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  margin-top: 4px;
  vertical-align: top;
  appearance: none;

  background: #fff
    url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e")
    no-repeat center/contain;

  border: 1px solid #1a1a1a;
  border-radius: 0.25em;

  &:checked {
    background-color: #6d43a1;
    border-color: #6d43a1;
  }

  &:focus {
    border-color: #1a1a1a;
    outline: 0;
    box-shadow: none;
  }

  &:before {
    background-color: #c03;
  }

  &:hover {
    cursor: pointer;
  }

  &:checked::after {
    background-color: #c03;
  }

  &:checked::before {
    background-color: #c03;
  }

  @media (max-width: 645px) {
    width: 14px;
    height: 14px;
  }
`;

export const Row = styled.div`
  display: flex;
`;

export const LabelCheck = styled.label`
  display: flex;
  flex-direction: column;
  padding-left: 15px;
  font-size: 16px;
  line-height: 24px;
  > p {
    font-size: 14px;
    color: #717171;
  }
`;

export const Error = styled.span`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
