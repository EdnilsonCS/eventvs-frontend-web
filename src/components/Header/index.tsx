import { useState, VFC } from 'react';
import { FiMenu } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Container from '../Container';
import { Wrapper, Logo, Content, NavbarEnd } from './styles';

const Header: VFC = () => {
  const [isOpen, setOpen] = useState(false);
  const toggleMenu = (): void => {
    setOpen(!isOpen);
  };
  return (
    <Wrapper>
      <Container>
        <Content>
          <Logo>EventVS</Logo>
          <button type="button" onClick={toggleMenu}>
            {isOpen ? (
              <AiOutlineClose color="white" size={30} />
            ) : (
              <FiMenu color="white" size={30} />
            )}
          </button>

          <NavbarEnd className="navbar-end" isOpen={isOpen}>
            <Link className="navbar-item" to="/class">
              Adicionar evento
            </Link>
            <Link className="navbar-item" to="/subjects">
              Adicionar categoria
            </Link>
          </NavbarEnd>
        </Content>
      </Container>
    </Wrapper>
  );
};

export default Header;
