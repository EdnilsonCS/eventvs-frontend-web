import { VFC } from 'react';
import Card from 'src/components/Card';
import SearchInput from 'src/components/SearchInput';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Filter, { DataFilter } from '../../../components/Filter';
import Header from '../../../components/Header';
import Container from '../../../components/Container';
import { Wrapper } from './styles';

const Home: VFC = () => {
  const navigate = useNavigate();
  const handleNavigationToDetail = async (id: string): Promise<void> => {
    navigate(`/producer/event/${id}`);
  };
  const onHandleFilter = async (
    data: DataFilter | undefined,
  ): Promise<void> => {
    console.log();
  };

  const getEventsList = async (): Promise<void> => {
    console.log();
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
        ]}
      />
      <Container>
        <Wrapper>
          <SearchInput />
          <Filter
            onHandleFilter={onHandleFilter}
            onClean={() => getEventsList()}
          />
          {[1, 2, 3, 4, 5, 4, 2, 2, 2, 2, 2, 2].map(() => {
            return (
              <Card
                key="1"
                title="Title"
                logradouro="Logradouro"
                numero="260"
                bairro="Rosa elze"
                cidade="São Cristovão"
                estado="Sergipe"
                dataHoraInicio=""
                dataHoraFim=""
                onPress={() => handleNavigationToDetail('1')}
                description="Descrição"
              />
            );
          })}
        </Wrapper>
      </Container>
    </>
  );
};

export default Home;
