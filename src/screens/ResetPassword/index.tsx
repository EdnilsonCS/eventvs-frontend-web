import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';
import ResetPasswordService from 'src/services/ResetPasswordService';
import Input from '../../components/Input';
import { Container, Box, Title, Subtitle, Button } from './styles';

interface ResetPasswordCredentials {
  email: string;
}

function ResetPassword(): JSX.Element {
  const navigate = useNavigate();
  const schema = Yup.object().shape({
    email: Yup.string()
      .email('E-mail não cadastrado.')
      .required('E-mail obrigatório.'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
    },
  });

  const resetPassword = async (email: any): Promise<void> => {
    try {
      await ResetPasswordService.sendEmailResetPassword(email);
      toast.success(
        'Código para recuperação de senha enviado para o seu e-mail.',
      );
    } catch (err: any) {
      toast.error('Não conseguimos recuperar sua senha.');
    }
  };

  const handleResetPassword = async (
    email: ResetPasswordCredentials,
  ): Promise<void> => {
    await resetPassword(email);
    navigate('/check-code');
  };

  return (
    <Container>
      <Box onSubmit={handleSubmit(handleResetPassword)}>
        <Title>EventVS</Title>

        <Subtitle>Recuperar senha</Subtitle>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              errors={errors}
              placeholder="E-mail"
              type="text"
            />
          )}
        />
        <Button type="submit">Enviar código</Button>

        <Link to="/">Voltar</Link>
      </Box>
    </Container>
  );
}

export default ResetPassword;
