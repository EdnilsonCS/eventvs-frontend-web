import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { VFC } from 'react';
import { toast } from 'react-toastify';
import {
  Wrapper,
  Button,
  Row,
  ButtonCancel,
  Title,
  ButtonContainer,
} from './styles';
import Input from '../../../components/Input';
import Header from '../../../components/Header';
import Container from '../../../components/Container';
import CategoryService, {
  ICategoryCreateDTO,
} from '../../../services/CategoryService';

const AddCategory: VFC = () => {
  const schema = Yup.object().shape({
    nome: Yup.string().required('Titulo é um campo obrigatório'),
    descricao: Yup.string().required('Descrição é um campo obrigatório'),
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
      nome: '',
      descricao: '',
    },
  });
  const handleCreateNewEvent = async (
    data: ICategoryCreateDTO,
  ): Promise<void> => {
    try {
      await CategoryService.createNewCategory(data);
      setValue('nome', '');
      setValue('descricao', '');
      toast.success('Cadastro realizado com sucesso');
    } catch (err) {
      toast.error('Erro ao fazer login, check suas credenciais');
    }
  };
  return (
    <>
      <Header
        options={[
          {
            name: 'Eventos',
            router: '/producer/home',
          },
          {
            name: 'Adicionar Evento',
            router: '/producer/add-event',
          },
          {
            name: 'Adicionar Categoria',
            router: '/producer/add-category',
            isOpen: true,
          },
          {
            name: 'Perfil',
            router: '/user/profile',
          },
        ]}
      />
      <Container>
        <Wrapper onSubmit={handleSubmit(handleCreateNewEvent)}>
          <Row>
            <Title>Nova categoria</Title>
          </Row>
          <Row>
            <Controller
              name="nome"
              control={control}
              render={({ field }) => (
                <Input {...field} errors={errors} placeholder="Título" />
              )}
            />
            <Controller
              name="descricao"
              control={control}
              render={({ field }) => (
                <Input {...field} errors={errors} placeholder="Descrição" />
              )}
            />
          </Row>
          <ButtonContainer>
            <Button>Cadastrar</Button>
            <ButtonCancel>Cancelar</ButtonCancel>
          </ButtonContainer>
        </Wrapper>
      </Container>
    </>
  );
};

export default AddCategory;
