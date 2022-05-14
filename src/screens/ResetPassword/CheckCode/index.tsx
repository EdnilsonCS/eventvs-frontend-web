import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';
import ResetPasswordService from 'src/services/ResetPasswordService';
import Input from 'src/components/Input';
import { useCallback } from 'react';
import { Container, Box, Title, Subtitle, Button } from './styles';

interface CodeCredentials {
  token: string;
}

function CheckCode(): JSX.Element {
  const navigate = useNavigate();
  const schema = Yup.object().shape({
    token: Yup.string()
      .required('Código obrigatório')
      .max(6, 'Deve ter no máximo 6 dígitos.'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      token: '',
    },
  });

  const checkCode = useCallback(async token => {
    try {
      await ResetPasswordService.checkCode(token);
      toast.success('Código confirmado.');
      navigate('/new-password');
    } catch (err: any) {
      toast.error('Código incorreto.');
    }
  }, []);

  const handleCheckCode = async (token: CodeCredentials): Promise<void> => {
    await checkCode(token);
  };

  return (
    <Container>
      <Box onSubmit={handleSubmit(handleCheckCode)}>
        <Title>EventVS</Title>

        <Subtitle>Recuperar senha</Subtitle>
        <Controller
          name="token"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              errors={errors}
              placeholder="Código"
              type="text"
            />
          )}
        />
        <Button type="submit">Checar</Button>

        <Link to="/">Voltar</Link>
      </Box>
    </Container>
  );
}

export default CheckCode;
