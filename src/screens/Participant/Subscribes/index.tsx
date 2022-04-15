import { useEffect, useState, VFC } from 'react';
import Card from 'src/components/Card';
import SearchInput from 'src/components/SearchInput';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import SubscribeService, {
  ISubscribe,
} from '../../../services/SubscribeService';
import Header from '../../../components/Header';
import Container from '../../../components/Container';
import { Wrapper } from './styles';

const Subscribe: VFC = () => {
  const location = useLocation();

  const [subscribes, setSubscribes] = useState<ISubscribe[]>([]);
  const getSubscription = async (filterString: string): Promise<void> => {
    const dados = await SubscribeService.getSubscribeList();

    const filterDate = dados.filter(inscricao => {
      const nameEvento = inscricao.evento.nome.toLowerCase();
      const stringToComparative = String(filterString).toLowerCase();

      return nameEvento.includes(stringToComparative);
    });
    setSubscribes(filterDate);
  };
  useEffect(() => {
    getSubscription('');
  }, [location]);

  const handleCancelButton = async (id: number): Promise<void> => {
    Swal.fire({
      title: 'Tem certeza?',
      text: "'Você realmente deseja cancelar sua inscrição?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, remova!',
    }).then(async result => {
      if (result.isConfirmed) {
        await SubscribeService.cancelSubscription(id);
        getSubscription('');
        toast.success('Inscrição removida com sucesso');
      }
    });
  };
  useEffect(() => {
    getSubscription('');
  }, [location]);
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
            isOpen: true,
          },
          {
            name: 'Perfil',
            router: '/participant/subscribes/perfil',
          },
        ]}
      />
      <Container>
        <Wrapper>
          <SearchInput />
          {subscribes.map(inscricao => {
            return (
              <Card
                key={inscricao.id}
                title={inscricao.evento.nome}
                logradouro={inscricao.evento.endereco.logradouro}
                numero={inscricao.evento.endereco.numero}
                bairro={inscricao.evento.endereco.bairro}
                cidade={inscricao.evento.endereco.cidade}
                estado={inscricao.evento.endereco.estado}
                dataHoraInicio={inscricao.evento.dataHoraInicio}
                dataHoraFim={inscricao.evento.dataHoraFim}
                onPressButton={() => handleCancelButton(inscricao.id)}
                type="cancel"
                description={inscricao.evento.descricao}
              />
            );
          })}
        </Wrapper>
      </Container>
    </>
  );
};

export default Subscribe;
