import { VFC } from 'react';
import Card from 'src/components/Card';
import SearchInput from 'src/components/SearchInput';
import Filter, { DataFilter } from '../../../components/Filter';
import Header from '../../../components/Header';
import Container from '../../../components/Container';
import { Wrapper } from './styles';

const Home: VFC = () => {
  const handleSubscribe = async (id: string): Promise<void> => {
    // try {
    //   await SubscribeService.submitSubscribe({
    //     evento_id: Number(id),
    //     participante_id: Number(user.id),
    //   });
    // } catch (error) {
    //   toast.error(error.response.data.message);
    //   showMessage({
    //     message: error.response.data.message,
    //     type: 'danger',
    //     icon: 'danger',
    //     duration: 5000,
    //   });
    // }
    // getEventsList();
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
            router: '/participant/home',
          },
          {
            name: 'Minhas inscrições',
            router: '/participant/subscribes',
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
                dataHoraInicio={new Date()}
                dataHoraFim={new Date()}
                onPressButton={() => handleSubscribe('1')}
                type="ok"
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
