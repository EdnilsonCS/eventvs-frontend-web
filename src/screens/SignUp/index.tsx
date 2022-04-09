import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';
import AuthService from '../../services/AuthService';
import { onlyNumbers } from '../../services/utils';
import Input from '../../components/Input';
import CheckBox from '../../components/Checkbox';
import { Container, Box, Title, Subtitle, Button } from './styles';

interface SignUpCredentials {
  nome: string;
  cpf: string;
  email: string;
  senha: string;
}

function SignUp(): JSX.Element {
  const navigate = useNavigate();
  const schema = Yup.object().shape({
    nome: Yup.string().required('Nome obrigatório'),
    cpf: Yup.string().required('Cpf é um campo obrigatório'),
    email: Yup.string()
      .email('Esse email não é válido')
      .required('E-mail obrigatório'),
    senha: Yup.string().required('Senha obrigatória'),
    confirmarSenha: Yup.string()
      .when('senha', {
        is: (val: any) => !!val.length,
        then: Yup.string().required('Campo Obrigatório'),
        otherwise: Yup.string(),
      })
      .oneOf([Yup.ref('senha')], 'Confirmação incorreta'),
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
      senha: '',
      nome: '',
      cpf: '',
      confirmarSenha: '',
    },
  });
  const [checked, setChecked] = useState(false);

  const handleToggleCheckBox = (): void => {
    setChecked(prevState => !prevState);
  };

  const signUp = useCallback(
    async ({ nome, cpf, email, senha }) => {
      try {
        if (checked) {
          await AuthService.signUpProducer({
            nome,
            cpf: onlyNumbers(cpf),
            email,
            senha,
          });
          toast.success('Cadastro de produtor solicitado com sucesso');
        } else {
          await AuthService.signUp({
            nome,
            cpf: onlyNumbers(cpf),
            email,
            senha,
          });
          toast.success('Cadastro realizado com sucesso');
        }
      } catch (err) {
        toast.error('Não conseguimos realizar seu cadastro.');
      }
    },
    [checked],
  );

  const handleSignUp = async (data: SignUpCredentials): Promise<void> => {
    await signUp(data);
    navigate('/sing-up');
  };
  return (
    <Container>
      <Box onSubmit={handleSubmit(handleSignUp)}>
        <Title>EventVS</Title>

        <Subtitle>Cadastrar</Subtitle>
        <Controller
          name="nome"
          control={control}
          render={({ field }) => (
            <Input {...field} errors={errors} placeholder="Nome" type="text" />
          )}
        />
        <Controller
          name="cpf"
          control={control}
          render={({ field }) => (
            <Input {...field} errors={errors} placeholder="CPF" mask="cpf" />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              errors={errors}
              placeholder="Email"
              type="email"
            />
          )}
        />
        <Controller
          name="senha"
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
        <Controller
          name="confirmarSenha"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              errors={errors}
              placeholder="Confirmar senha"
              type="password"
            />
          )}
        />

        <CheckBox
          name="check"
          checked={checked}
          errors={errors}
          onChange={handleToggleCheckBox}
          label="Solicitar conta de produtor de eventos"
        />
        <Button type="submit">Cadastrar</Button>

        <Link to="/">Voltar</Link>
      </Box>
    </Container>
  );
}

export default SignUp;
