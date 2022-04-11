import { VFC } from 'react';
import Select from 'react-select';
import { FieldErrors } from 'react-hook-form';
import { Container, Error } from './styles';

interface SelectProps {
  options: {
    value: string;
    label: string;
  }[];
  name: string;
  errors: FieldErrors;
  onChange(e: string | undefined): void;
  value: string | undefined;
}

const CustomSelect: VFC<SelectProps> = ({
  options,
  errors,
  name,
  onChange,
  value,
  ...rest
}) => {
  return (
    <Container>
      <Select
        {...rest}
        value={options.find(item => {
          return item.value === value;
        })}
        options={options}
        onChange={item => {
          onChange(item?.value);
        }}
        styles={{
          control: provided => ({
            ...provided,
            color: '#6d43a1',
            height: '54px',
            borderRadius: '20px',
            border: '1px solid #232129',
            '&:hover': { borderColor: '#6d43a1' },
            boxShadow: 'none',
          }),
        }}
      />
      {errors[name] ? <Error>{errors[name].message}</Error> : null}
    </Container>
  );
};

export default CustomSelect;
