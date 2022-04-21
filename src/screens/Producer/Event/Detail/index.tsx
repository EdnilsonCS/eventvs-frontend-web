import { useEffect, useMemo, useState, VFC } from 'react';
import dayjs from 'src/helpers/datas';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ParticipantsService, {
  IParticipantes,
} from 'src/services/ParticipantsService';
import ModalParticipants from 'src/components/ModalParticipantes';
import EventService, { IEvent } from '../../../../services/EventService';
import Header from '../../../../components/Header';
import Container from '../../../../components/Container';
import {
  Wrapper,
  Title,
  Subtitle,
  Description,
  Address,
  ButtonContainer,
  Button,
  ButtonCancel,
  ButtonBack,
} from './styles';

const Details: VFC = () => {
  const navigate = useNavigate();
  const [participantes, setParticipantes] = useState<IParticipantes[]>([]);
  const [dados, setDados] = useState<IEvent | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const routeParams = useParams() as { id: string };
  const handleGoBack = (): void => {
    navigate(-1);
  };
  const handleEdit = async (id: string): Promise<void> => {
    navigate(`/producer/event/edit/${id}`);
  };
  const handlePublicar = async (id: string): Promise<void> => {
    try {
      await EventService.publicEvent(id);
      navigate(-1);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  const handleCancelar = async (id: string): Promise<void> => {
    try {
      await EventService.cancelEvent(id);
      navigate(-1);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const handleRemover = async (id: string): Promise<void> => {
    try {
      await EventService.deleteEvent(id);
      navigate(-1);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const handleOpenParticipantes = (): void => {
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    const getEventDetail = async (): Promise<void> => {
      const data = await ParticipantsService.getParticipantsByEventId(
        routeParams.id,
      );
      setParticipantes(data);
    };

    getEventDetail();
  }, [routeParams.id]);

  useEffect(() => {
    const getEventDetail = async (): Promise<void> => {
      const data = await EventService.getEventDetail(routeParams.id);
      setDados(data);
    };

    getEventDetail();
  }, [routeParams.id]);
  const formattedAddress = useMemo(() => {
    return `${dados?.endereco.logradouro}, ${dados?.endereco.numero}, ${dados?.endereco.bairro}, ${dados?.endereco.cidade},${dados?.endereco.estado}`;
  }, [dados]);
  const formattedDateInicio = useMemo(() => {
    return dayjs(dados?.dataHoraInicio)
      .locale('pt-br')
      .format('DD/MM/YYYY HH:mm');
  }, [dados]);
  const formattedDateFim = useMemo(() => {
    return dayjs(dados?.dataHoraFim).locale('pt-br').format('DD/MM/YYYY HH:mm');
  }, [dados]);

  const onCloseModal = (): void => {
    setModalOpen(!modalOpen);
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
            isOpen: true,
          },
          {
            name: 'Adicionar Categoria',
            router: '/producer/add-category',
          },
        ]}
      />
      <Container>
        <ModalParticipants
          open={modalOpen}
          participantes={participantes}
          onClose={onCloseModal}
        />
        <Wrapper>
          <Title>Detalhes do evento</Title>
          <Subtitle>{dados?.nome}</Subtitle>
          <Description>{dados?.descricao}</Description>
          <Address>{formattedAddress}</Address>
          <Address>
            <strong>{formattedDateInicio}</strong> até{' '}
            <strong>{formattedDateFim}</strong>
          </Address>

          <ButtonContainer>
            {dados?.statusEvento === 'PUBLICADO' ? (
              <>
                <Button type="button" onClick={handleOpenParticipantes}>
                  Visualizar participantes
                </Button>
                <ButtonCancel
                  type="button"
                  onClick={() => handleCancelar(routeParams.id)}
                >
                  cancelar
                </ButtonCancel>
              </>
            ) : (
              <>
                <Button
                  type="button"
                  onClick={() => handlePublicar(routeParams.id)}
                >
                  Publicar
                </Button>
                <Button
                  type="button"
                  onClick={() => handleEdit(routeParams.id)}
                >
                  editar
                </Button>
                <ButtonCancel
                  type="button"
                  onClick={() => handleRemover(routeParams.id)}
                >
                  Remover
                </ButtonCancel>
              </>
            )}

            <ButtonBack type="button" onClick={handleGoBack}>
              Voltar
            </ButtonBack>
          </ButtonContainer>
        </Wrapper>
      </Container>
    </>
  );
};

export default Details;
