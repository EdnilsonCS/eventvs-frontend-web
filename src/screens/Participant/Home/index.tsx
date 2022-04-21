import { useEffect, useRef, useState, VFC } from 'react';
import Card from 'src/components/Card';
import SearchInput from 'src/components/SearchInput';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import EventService, { IEvent } from '../../../services/EventService';
import SubscribeService from '../../../services/SubscribeService';
import Filter, { DataFilter } from '../../../components/Filter';
import Header from '../../../components/Header';
import Container from '../../../components/Container';
import { Wrapper } from './styles';
import dayjs from '../../../helpers/datas';
import { useAuth } from '../../../hooks/auth';

const Home: VFC = () => {
  const location = useLocation();
  const { user } = useAuth();

  const [events, setEvents] = useState<IEvent[]>([]);
  const [oldArray, setOldArray] = useState<IEvent[]>([]);
  const filterRefModal = useRef<any>(null);

  const getEventsList = async (): Promise<void> => {
    const data = await EventService.getEvents();

    const eventsList = [...data];

    setEvents(eventsList);
  };

  const onHandleSearchFilter = async (filterString: string): Promise<void> => {
    let eventsDate = [];
    if (oldArray.length >= events.length) {
      setEvents(oldArray);
      eventsDate = oldArray;
    } else {
      eventsDate = events;
      setOldArray(events);
    }

    const filterDate = eventsDate.filter(evento => {
      const nameEvento = evento.nome.toLowerCase();
      const stringToComparation = String(filterString).toLowerCase();

      return nameEvento.includes(stringToComparation);
    });

    setEvents(filterDate);
  };

  useEffect(() => {
    filterRefModal?.current?.clean();
    getEventsList();
  }, [location]);

  const onHandleFilter = async (data: DataFilter): Promise<void> => {
    let filterEvents: IEvent[] = [];

    let dataFilter: IEvent[] = [];

    if (data.categoriaId) {
      dataFilter = await EventService.getEventsPublicadoByCategoria(
        data.categoriaId,
      );
    } else {
      dataFilter = await EventService.getEvents();

      filterEvents = [...dataFilter];
    }

    filterEvents = [...dataFilter];

    if (data.dataInicial && data.dataFinal) {
      dataFilter = await EventService.getEventsPublicadoByDate({
        StartDate: dayjs(data.dataInicial).utc().startOf('day').toDate(),
        EndDate: dayjs(data.dataFinal).utc().endOf('day').toDate(),
      });
    }
    filterEvents = [...filterEvents, ...dataFilter];

    filterEvents.forEach((itemF, i) => {
      const findItem = filterEvents.find((item, j) => {
        return itemF.id === item.id && i !== j;
      });
      if (findItem) {
        filterEvents = filterEvents.filter(item => {
          return item.id !== findItem.id;
        });

        filterEvents = [findItem, ...filterEvents];
      }
    });

    filterEvents = filterEvents.filter(evento => {
      let isToRemove = false;

      if (
        data.categoriaId &&
        String(evento.categoria.id) !== String(data.categoriaId)
      ) {
        isToRemove = true;
      }

      if (
        data.dataInicial &&
        !(
          dayjs(dayjs(evento.dataHoraInicio)).isAfter(data.dataInicial) &&
          dayjs(dayjs(data.dataFinal)).isBefore(evento.dataHoraFim)
        )
      ) {
        isToRemove = true;
      }

      return !isToRemove;
    });

    setEvents(filterEvents);
  };

  const handleSubscribe = async (id: number): Promise<void> => {
    try {
      await SubscribeService.submitSubscribe({
        evento_id: Number(id),
        participante_id: Number(user.id),
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
    }

    getEventsList();
  };
  useEffect(() => {
    getEventsList();
  }, [location]);
  return (
    <>
      <Header
        options={[
          {
            name: 'Eventos',
            router: '/participant/home',
            isOpen: true,
          },
          {
            name: 'Minhas inscrições',
            router: '/participant/subscribes',
          },
          {
            name: 'Perfil',
            router: '/participant/subscribes/perfil',
          },
        ]}
      />
      <Container>
        <Wrapper>
          <SearchInput
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onHandleSearchFilter(e.target.value);
            }}
          />
          <Filter
            onHandleFilter={onHandleFilter}
            isNotState
            onClean={() => getEventsList()}
          />
          {events.map(event => {
            return (
              <Card
                key={event.id}
                title={event.nome}
                logradouro={event.endereco.logradouro}
                numero={event.endereco.numero}
                bairro={event.endereco.bairro}
                cidade={event.endereco.cidade}
                estado={event.endereco.estado}
                dataHoraInicio={event.dataHoraInicio}
                dataHoraFim={event.dataHoraFim}
                onPressButton={() => handleSubscribe(event.id)}
                type="ok"
                description={event.descricao}
              />
            );
          })}
        </Wrapper>
      </Container>
    </>
  );
};

export default Home;
