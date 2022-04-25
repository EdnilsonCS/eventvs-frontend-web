import { useEffect, useState, VFC } from 'react';
import Card from 'src/components/Card';
import SearchInput from 'src/components/SearchInput';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import EventService, { IEvent } from 'src/services/EventService';
import dayjs from 'src/helpers/datas';
import { useLocation } from 'react-router-dom';
import Filter, { DataFilter } from '../../../components/Filter';
import Header from '../../../components/Header';
import Container from '../../../components/Container';
import { Wrapper } from './styles';

const Home: VFC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [oldArray, setOldArray] = useState<IEvent[]>([]);

  const getEventsList = async (): Promise<void> => {
    const data = await EventService.getEvents();
    const eventsNotPublic = await EventService.getEventsNaoPublicado();

    const eventsList = [...data, ...eventsNotPublic];

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
    getEventsList();
  }, [location]);

  const onHandleFilter = async (data: DataFilter): Promise<void> => {
    let filterEvents: IEvent[] = [];
    if (data.statusEvento === 'PUBLICADO') {
      let dataFilter: IEvent[] = [];

      dataFilter = await EventService.getEvents();

      filterEvents = [...dataFilter];

      if (data.categoriaId) {
        dataFilter = await EventService.getEventsPublicadoByCategoria(
          data.categoriaId,
        );
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
    } else {
      let dataFilter: IEvent[] = [];

      dataFilter = await EventService.getEventsNaoPublicado();

      filterEvents = [...dataFilter];

      if (data.categoriaId) {
        dataFilter = await EventService.getEventsNaoPublicadoByCategoria(
          data.categoriaId,
        );
      }

      filterEvents = [...dataFilter];

      if (data.dataInicial && data.dataFinal) {
        dataFilter = await EventService.getEventsNaoPublicadoByDate({
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
    }

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
  const handleNavigationToDetail = async (id: number): Promise<void> => {
    navigate(`/producer/event/${id}`);
  };
  return (
    <>
      <Header
        options={[
          {
            name: 'Eventos',
            router: '/producer/home',
            isOpen: true,
          },
          {
            name: 'Adicionar Evento',
            router: '/producer/add-event',
          },
          {
            name: 'Adicionar Categoria',
            router: '/producer/add-category',
          },
          {
            name: 'Perfil',
            router: '/user/profile',
          },
        ]}
      />
      <Container>
        <Wrapper>
          <SearchInput />
          <Filter
            onHandleFilter={onHandleFilter}
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
                onPress={() => handleNavigationToDetail(event.id)}
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
