/* eslint-disable consistent-return */
import { useMemo, VFC } from 'react';
import { useAuth } from 'src/hooks/auth';
import { FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Container from '../../../components/Container';
import {
  Wrapper,
  Name,
  UserInformation,
  Email,
  TextsContainer,
  TitlePage,
  Button,
} from './styles';
import Header from '../../../components/Header';

const Perfil: VFC = () => {
  const { user, signOut } = useAuth();

  const headerValeu = useMemo(() => {
    switch (user.role) {
      case 'PRODUTOR':
        return [
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
          },
          {
            name: 'Perfil',
            router: '/user/profile',
            isOpen: true,
          },
        ];

      case 'ADMINISTRADOR':
        return [
          {
            name: 'Solicitações',
            router: '/admin/home',
          },
          {
            name: 'Perfil',
            router: '/user/profile',
            isOpen: true,
          },
        ];

      default:
        return [
          {
            name: 'Eventos',
            router: '/participant/home',
          },
          {
            name: 'Minhas inscrições',
            router: '/participant/subscribes',
          },
          {
            name: 'Perfil',
            router: '/user/profile',
            isOpen: true,
          },
        ];
    }
  }, [user.role]);
  const navigate = useNavigate();
  const handleChangePerfil = (): void => {
    navigate('/user/change-perfil');
  };

  const handleLogot = (): void => {
    Swal.fire({
      title: 'Tem certeza?',
      text: "'Você realmente deseja fazer o logout?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, realizar logout!',
    }).then(async result => {
      if (result.isConfirmed) {
        signOut();
        toast.success('Logout realizado com sucesso');
      }
    });
  };

  return (
    <>
      <Header options={headerValeu} />
      <Container>
        <Wrapper>
          <UserInformation>
            <FiUser size={100} />
            <TextsContainer>
              <Email>{user.email}</Email>
              <Name>{user.name}</Name>
            </TextsContainer>
          </UserInformation>
          <TitlePage>Configurações</TitlePage>

          <Button onClick={handleChangePerfil}>Altera dados</Button>
          <Button onClick={handleLogot}>Sair (fazer logout)</Button>
        </Wrapper>
      </Container>
    </>
  );
};

export default Perfil;
