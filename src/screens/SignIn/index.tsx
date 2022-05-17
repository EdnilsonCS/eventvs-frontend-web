import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Input from '../../components/Input';
import { Container, Box, Title, Subtitle, Button } from './styles';
import { SignInCredentials, useAuth } from '../../hooks/auth';

function SignIn(): JSX.Element {
  const navigate = useNavigate();
  const { signIn, user } = useAuth();
  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Esse email não é válido')
      .required('E-mail obrigatório'),
    password: Yup.string()
      .required('Senha obrigatória')
      .min(3, 'É necessário que a senha tenha no mínimo 3 dígitos'),
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
      password: '',
    },
  });

  const handleLogin = async (data: SignInCredentials): Promise<void> => {
    await signIn(data);
    switch (user.role) {
      case 'PRODUTOR':
        navigate('producer/home');
        break;

      case 'ADMIN':
        navigate('admin/home');
        break;

      default:
        navigate('participant/home');
    }
  };

  return (
    <Container>
      <Box onSubmit={handleSubmit(handleLogin)}>
        <Title>EventVS</Title>

        <Subtitle>Login</Subtitle>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input {...field} errors={errors} placeholder="Email" />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              errors={errors}
              placeholder="Senha"
              type="password"
            />
          )}
        />

        <Button>Entrar</Button>

        <Link to="/reset-password">Esqueceu sua senha?</Link>
        <Link to="/sign-up">Não possui uma conta? Clique aqui para criar</Link>
      </Box>
    </Container>
  );
}

export default SignIn;
