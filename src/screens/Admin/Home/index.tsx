import { useEffect, useState, VFC } from 'react';
import Header from '../../../components/Header';
import Container from '../../../components/Container';
import {
  Wrapper,
  Card,
  CardTitle,
  Paragraph,
  TopCard,
  ButtonNot,
  Button,
  CardBottom,
} from './styles';
import AdministratorService, {
  IApplicants,
} from '../../../services/AdministratorService';

const Home: VFC = () => {
  const [producers, setProducers] = useState<IApplicants[]>([]);

  const acceptProducer = async (id: number): Promise<void> => {
    await AdministratorService.getAccept(id);

    setProducers(producers.filter(data => data.id !== id));
  };

  const denyProducer = async (id: number): Promise<void> => {
    await AdministratorService.getDeny(id);

    setProducers(producers.filter(data => data.id !== id));
  };

  const getProducers = async (): Promise<void> => {
    const data = await AdministratorService.getApplicants();
    setProducers(data);
  };

  useEffect(() => {
    getProducers();
  }, []);

  return (
    <>
      <Header
        options={[
          {
            name: 'Solicitações',
            router: '/admin/home',
            isOpen: true,
          },
          {
            name: 'Perfil',
            router: '/user/profile',
          },
        ]}
      />
      <Container>
        <Wrapper>
          {producers.map(produtor => {
            return (
              <Card>
                <TopCard>
                  <CardTitle>Nome: {produtor.nome}</CardTitle>
                  <Paragraph>Situação: {produtor.situacao}</Paragraph>
                  <Paragraph>
                    Email: <strong>{produtor.email}</strong>
                  </Paragraph>
                </TopCard>
                <CardBottom>
                  <ButtonNot onClick={() => denyProducer(produtor.id)}>
                    Negar
                  </ButtonNot>
                  <Button onClick={() => acceptProducer(produtor.id)}>
                    Conceder
                  </Button>
                </CardBottom>
              </Card>
            );
          })}
        </Wrapper>
      </Container>
    </>
  );
};

export default Home;
