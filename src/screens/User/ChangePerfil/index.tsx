/* eslint-disable consistent-return */
import { useMemo, VFC } from 'react';
import { useAuth } from 'src/hooks/auth';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import CommonServices, { IData } from 'src/services/CommonServices';
import { toast } from 'react-toastify';
import Container from '../../../components/Container';
import { Wrapper, Row, TitlePage, ButtonCancel, Button } from './styles';
import Input from '../../../components/Input';
import Header from '../../../components/Header';

const ChangePerfil: VFC = () => {
  const { user } = useAuth();
  const schema = Yup.object().shape({
    nome: Yup.string().required('Nome obrigatório'),
    senha: Yup.string().required('Senha obrigatória'),
    novaSenha: Yup.string().when('senha', {
      is: (val: string) => !!val.length,
      then: Yup.string().required('Campo Obrigatório'),
      otherwise: Yup.string(),
    }),
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      nome: user.name,
      senha: '',
      novaSenha: '',
    },
  });
  const headerValeu = useMemo(() => {
    switch (user.role) {
      case 'PRODUTOR':
        return [
          {
            name: 'Eventos',
            router: '/participant/home',
          },
          {
            name: 'Minhas inscrições',
            router: '/participant/subscribes',
          },
          {
            name: 'Perfil',
            router: '/user/profile',
          },
        ];

      case 'ADMINISTRADOR':
        return [
          {
            name: 'Solicitações',
            router: '/admin/home',
          },
          {
            name: 'Perfil',
            router: '/user/profile',
          },
        ];

      default:
        return [
          {
            name: 'Eventos',
            router: '/participant/home',
          },
          {
            name: 'Minhas inscrições',
            router: '/participant/subscribes',
          },
          {
            name: 'Perfil',
            router: '/user/profile',
          },
        ];
    }
  }, [user.role]);
  const navigate = useNavigate();
  const handleUpdate = async (data: IData): Promise<void> => {
    try {
      await CommonServices.updateData(data);

      setValue('nome', '');
      setValue('senha', '');
      setValue('novaSenha', '');
      toast.success('Perfil atualizado');
    } catch {
      toast.error('Problema ao atualizar os dados do perfil');
    }
  };
  const handleGoBack = (): void => {
    navigate(-1);
  };
  return (
    <>
      <Header options={headerValeu} />
      <Container>
        <Wrapper onSubmit={handleSubmit(handleUpdate)}>
          <TitlePage>Configurações</TitlePage>
          <Row>
            <Controller
              name="nome"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  errors={errors}
                  placeholder="Digite o novo nome..."
                  label="Nome:"
                />
              )}
            />
          </Row>
          <Row>
            <Controller
              name="senha"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  errors={errors}
                  placeholder="Digite a senha atual..."
                  label="Senha:"
                />
              )}
            />
          </Row>
          <Row>
            <Controller
              name="novaSenha"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  errors={errors}
                  placeholder="Digite a nova senha..."
                  label="Nova Senha:"
                />
              )}
            />
          </Row>
          <Row>
            <Button type="submit">Alterar</Button>
            <ButtonCancel onClick={handleGoBack}>Cancelar</ButtonCancel>
          </Row>
        </Wrapper>
      </Container>
    </>
  );
};

export default ChangePerfil;
