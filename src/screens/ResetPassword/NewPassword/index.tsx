import { Link, Route, Router } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';
import ResetPasswordService from 'src/services/ResetPasswordService';
import Input from 'src/components/Input';
import { useCallback } from 'react';
import { Container, Box, Title, Subtitle, Button } from './styles';
import CheckCode from '../CheckCode';

interface NewPasswordCredentials {
  token: string;
  novaSenha: string;
  confirmarNovaSenha: string;
}

function NewPassword(): JSX.Element {
  const navigate = useNavigate();
  const schema = Yup.object().shape({
    novaSenha: Yup.string()
      .required('Senha obrigatória')
      .min(8, 'Deve ser maior que 8 dígitos'),
    confirmarNovaSenha: Yup.string().required('Campo Obrigatório'),
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
      novaSenha: '',
      confirmarNovaSenha: '',
    },
  });

  const newPassword = useCallback(
    async ({ token, novaSenha, confirmarNovaSenha }) => {
      try {
        console.log(token);
        await ResetPasswordService.resetPassword({
          token,
          novaSenha,
          confirmarNovaSenha,
        });
        toast.success('Senha alterada com sucesso.');
      } catch (err: any) {
        toast.error('Não foi possível alterar sua senha.');
      }
    },
    [],
  );

  const handleNewPassword = async (
    data: NewPasswordCredentials,
  ): Promise<void> => {
    if (data.novaSenha !== data.confirmarNovaSenha) {
      return;
    }
    await newPassword(data);
    navigate('/');
  };

  return (
    <Container hidden>
      <Box onSubmit={handleSubmit(handleNewPassword)}>
        <Title>EventVS</Title>

        <Subtitle>Recuperar senha</Subtitle>
        <Controller
          name="novaSenha"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              errors={errors}
              placeholder="Nova senha"
              type="password"
            />
          )}
        />
        <Controller
          name="confirmarNovaSenha"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              errors={errors}
              placeholder="Confirmar nova senha"
              type="password"
            />
          )}
        />
        <Button type="submit">Salvar</Button>

        <Link to="/">Voltar</Link>
      </Box>
    </Container>
  );
}

export default NewPassword;
