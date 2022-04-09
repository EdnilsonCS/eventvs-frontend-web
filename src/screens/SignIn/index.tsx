import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Input from '../../components/Input';
import { Container, Box, Title, Subtitle, Button } from './styles';

function SignIn(): JSX.Element {
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

  return (
    <Container>
      <Box>
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
            <Input {...field} errors={errors} placeholder="Senha" />
          )}
        />

        <Button>Entrar</Button>

        <Link to="/sign-up">Não possui uma conta? Clique aqui para criar</Link>
      </Box>
    </Container>
  );
}

export default SignIn;
