/* eslint-disable react/require-default-props */
import React, {
  InputHTMLAttributes,
  forwardRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FieldErrors } from 'react-hook-form';
import { cep, cpf, currency } from '../../services/mask';
import { ContainerInput, Error, Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: object;
  icon?: React.ComponentType<IconBaseProps>;
  errors: FieldErrors;
  mask?: 'cep' | 'currency' | 'cpf';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ errors, name, icon: Icon, mask, containerStyle = {}, ...rest }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleInputFocus = useCallback(() => {
      setIsFocused(true);
    }, []);
    const handleInputBlur = useCallback(() => {
      setIsFocused(false);
    }, []);

    const handleKeyUp = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (mask === 'cep') {
          cep(e);
        }
        if (mask === 'currency') {
          currency(e);
        }
        if (mask === 'cpf') {
          cpf(e);
        }
        return e;
      },
      [mask],
    );

    return (
      <Container>
        <ContainerInput
          style={containerStyle}
          isErrored={!!errors[name]}
          isFocused={isFocused}
          data-testid="input-container"
        >
          {Icon && <Icon size={20} />}
          <input
            ref={ref}
            {...rest}
            onFocus={handleInputFocus}
            onBlurCapture={handleInputBlur}
            onChange={e => {
              let event = e;
              if (mask) {
                event = handleKeyUp(e);
              }

              if (rest.onChange) rest.onChange(event);
            }}
          />
        </ContainerInput>
        {errors[name] ? <Error>{errors[name].message}</Error> : null}
      </Container>
    );
  },
);

export default Input;
