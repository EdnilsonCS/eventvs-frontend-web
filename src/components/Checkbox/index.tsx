import { InputHTMLAttributes, forwardRef } from 'react';
import { FieldErrors } from 'react-hook-form';

import { InputCheck, LabelCheck, Row, Error } from './styles';

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  subtitle?: string;
  errors: FieldErrors;
  name: string;
}

const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ errors, subtitle, name, label, ...props }, ref) => {
    return (
      <Row>
        <InputCheck ref={ref} type="checkbox" {...props} />
        <LabelCheck id="spanCheck" htmlFor={props.id}>
          {label}
          <p id="subtitleCheck">{subtitle}</p>
          {errors[name] ? <Error>{errors[name].message}</Error> : null}
        </LabelCheck>
      </Row>
    );
  },
);

CheckBox.defaultProps = {
  subtitle: '',
};

CheckBox.displayName = 'CheckBox';

export default CheckBox;
