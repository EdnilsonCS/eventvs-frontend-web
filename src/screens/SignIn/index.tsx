import { Link } from 'react-router-dom';
import Input from '../../components/Input';
import { Container, Box, Title, Subtitle, Button } from './styles';

function SignIn(): JSX.Element {
  return (
    <Container>
      <Box>
        <Title>EventVS</Title>

        <Subtitle>Login</Subtitle>

        <Input name="email" errors={[]} placeholder="Email" />
        <Input name="password" errors={[]} placeholder="Senha" />

        <Button>Entrar</Button>

        <Link to="/sign-up">Não possui uma conta? Clique aqui para criar</Link>
      </Box>
    </Container>
  );
}

export default SignIn;
