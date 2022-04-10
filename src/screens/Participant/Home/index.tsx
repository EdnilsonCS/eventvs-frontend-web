import { VFC } from 'react';
import Card from 'src/components/Card';
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
  return (
    <>
      <Header />
      <Container>
        <Wrapper>
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
