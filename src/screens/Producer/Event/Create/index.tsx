import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, VFC, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import Select from 'src/components/Select';
import CategoryService, { ICategory } from 'src/services/CategoryService';
import LocationService, { ICity, IState } from 'src/services/LocationService';
import dayjs from 'src/helpers/datas';
import { useNavigate } from 'react-router-dom';
import { Wrapper, Button, Row, ButtonCancel, Title } from './styles';
import Input from '../../../../components/Input';
import Header from '../../../../components/Header';
import Container from '../../../../components/Container';
import EventService from '../../../../services/EventService';

const AddEvent: VFC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [states, setStates] = useState<IState[]>([]);
  const [citys, setCitys] = useState<ICity[]>([]);
  const schema = Yup.object().shape({
    nome: Yup.string().required('Titulo é um campo obrigatório'),
    descricao: Yup.string().required('Descrição é um campo obrigatório'),
    statusEvento: Yup.string().required('Status é um campo obrigatório'),
    categoriaId: Yup.string().required('Categoria é um campo obrigatório'),
    dataHoraFim: Yup.string().required('Data de inicio é um campo obrigatório'),
    dataHoraInicio: Yup.string().required('Data de fim é um campo obrigatório'),
    logradouro: Yup.string().required('Logradouro é um campo obrigatório'),
    numero: Yup.number().required('Número é um campo obrigatório'),
    bairro: Yup.string().required('Bairro é um campo obrigatório'),
    cidade: Yup.string().required('Cidade é um campo obrigatório'),
    estado: Yup.string().required('Estado é um campo obrigatório'),
    cep: Yup.string().required('E-mail é um campo obrigatório'),
  });

  const {
    control,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      nome: '',
      descricao: '',
      statusEvento: '',
      categoriaId: '',
      dataHoraFim: '',
      dataHoraInicio: '',
      logradouro: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: '',
    },
  });

  const selectedState = watch('estado');
  const cepValue = watch('cep');

  useEffect(() => {
    const getCityList = async (): Promise<void> => {
      const serviceCity = await LocationService.getCityList({
        UF: selectedState,
      });

      setCitys(serviceCity);
    };

    getCityList();
  }, [getValues, selectedState]);
  useEffect(() => {
    const getInformationBycep = async (): Promise<void> => {
      if (cepValue && cepValue.length > 7) {
        const cepInformation = await LocationService.getInformationByCep({
          cepNumber: cepValue.replace('-', ''),
        });

        if (cepInformation.state)
          setValue('estado', cepInformation.state, {
            shouldValidate: true,
          });
        if (cepInformation.street)
          setValue('logradouro', cepInformation.street);

        if (cepInformation.city) setValue('cidade', cepInformation.city);

        if (cepInformation.neighborhood)
          setValue('bairro', cepInformation.neighborhood);
      }
    };

    getInformationBycep();
  }, [cepValue, setValue]);
  useEffect(() => {
    const getCategoryList = async (): Promise<void> => {
      const serviceCategories = await CategoryService.getCategoryList();

      setCategories(serviceCategories);
    };

    getCategoryList();
  }, []);
  const formattedCategories = useMemo(() => {
    return categories.map(item => {
      return {
        label: item.nome,
        value: String(item.id),
      };
    });
  }, [categories]);

  useEffect(() => {
    const getStateList = async (): Promise<void> => {
      const serviceState = await LocationService.getStateList();

      setStates(serviceState);
    };

    getStateList();
  }, []);

  useEffect(() => {
    const getCityList = async (): Promise<void> => {
      const serviceCity = await LocationService.getCityList({
        UF: selectedState,
      });

      setCitys(serviceCity);
    };

    getCityList();
  }, [getValues, selectedState]);

  const statusEvent = [
    {
      value: 'PUBLICADO',
      label: 'Publicado',
    },
    {
      value: 'CRIADO',
      label: 'Criado',
    },
  ];

  const formattedStates = useMemo(() => {
    return states.map(item => {
      return {
        label: item.nome,
        value: item.sigla,
      };
    });
  }, [states]);

  const formattedCitys = useMemo(() => {
    return citys.map(item => {
      return {
        label: item.nome,
        value: item.nome,
      };
    });
  }, [citys]);
  const handleCreateNewEvent = async (data: any): Promise<void> => {
    const endereco = {
      logradouro: data.logradouro,
      numero: data.numero,
      bairro: data.bairro,
      cidade: data.cidade,
      estado: data.estado,
      cep: data.cep,
    };

    const event = {
      endereco,
      nome: data.nome,
      descricao: data.descricao,
      statusEvento: data.statusEvento,
      categoriaId: data.categoriaId,
      dataHoraFim: dayjs(data.dataHoraFim).format('YYYY-MM-DDTHH:mm:ss'),
      dataHoraInicio: dayjs(data.dataHoraInicio).format('YYYY-MM-DDTHH:mm:ss'),
    };

    try {
      await EventService.createNewEvent(event);
      setValue('logradouro', '');
      setValue('numero', '');
      setValue('bairro', '');
      setValue('cidade', '');
      setValue('estado', '');
      setValue('cep', '');

      setValue('nome', '');
      setValue('descricao', '');
      setValue('dataHoraFim', '');
      setValue('dataHoraInicio', '');
      toast.success('Cadastro realizado com sucesso');
    } catch (err) {
      toast.error('Erro ao fazer login, check suas credenciais');
    }
  };
  const handleGoBack = (): void => {
    navigate(-1);
  };
  console.log(errors);
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
            isOpen: true,
          },
          {
            name: 'Adicionar Categoria',
            router: '/producer/add-category',
          },
        ]}
      />
      <Container>
        <Wrapper onSubmit={handleSubmit(handleCreateNewEvent)}>
          <Row>
            <Title>Novo Evento</Title>
          </Row>
          <Row>
            <Controller
              name="nome"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  errors={errors}
                  placeholder="Digite o título..."
                  label="Título:"
                />
              )}
            />
          </Row>
          <Row>
            <Controller
              name="descricao"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  errors={errors}
                  placeholder="Digite a descrição..."
                  label="Descrição:"
                />
              )}
            />
          </Row>
          <Row>
            <Controller
              name="dataHoraInicio"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  errors={errors}
                  label="Data e horário de inicio:"
                  placeholder="Data de inicio"
                  type="datetime-local"
                />
              )}
            />

            <Controller
              name="dataHoraFim"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  errors={errors}
                  label="Data e horário de encerramento:"
                  placeholder="Data de encerramento"
                  type="datetime-local"
                />
              )}
            />
          </Row>
          <Row>
            <Controller
              name="statusEvento"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Selecione o status:"
                  placeholder="Selecionar Status"
                  options={statusEvent}
                  errors={errors}
                />
              )}
            />
            <Controller
              name="categoriaId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Selecione a categoria:"
                  placeholder="Selecionar Categoria"
                  options={formattedCategories}
                  errors={errors}
                />
              )}
            />
          </Row>

          <Row>
            <Controller
              name="cep"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="CEP:"
                  errors={errors}
                  placeholder="Digite o cep"
                  mask="cep"
                />
              )}
            />

            <Controller
              name="numero"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Número:"
                  errors={errors}
                  placeholder="Digite o numero..."
                />
              )}
            />
          </Row>
          <Row>
            <Controller
              name="logradouro"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  errors={errors}
                  label="Logradouro"
                  placeholder="Digite o logradouro..."
                />
              )}
            />
          </Row>
          <Row>
            <Controller
              name="bairro"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  errors={errors}
                  label="Bairro:"
                  placeholder="Digite o bairro..."
                />
              )}
            />
          </Row>

          <Row>
            <Controller
              name="estado"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Estado:"
                  placeholder="Selecionar o estado"
                  options={formattedStates}
                  errors={errors}
                />
              )}
            />

            <Controller
              name="cidade"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Cidade:"
                  placeholder="Digite a cidade..."
                  options={formattedCitys}
                  errors={errors}
                />
              )}
            />
          </Row>

          <Row>
            <Button type="submit">Cadastrar</Button>
            <ButtonCancel onClick={handleGoBack}>Cancelar</ButtonCancel>
          </Row>
        </Wrapper>
      </Container>
    </>
  );
};

export default AddEvent;
