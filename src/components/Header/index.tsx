import { useState, VFC } from 'react';
import { FiMenu } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Container from '../Container';
import { Wrapper, Logo, Content, NavbarEnd } from './styles';

interface Header {
  options: {
    name: string;
    router: string;
    isOpen?: boolean;
  }[];
}

const Header: React.FC<Header> = ({ options }) => {
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
            {options.map(item => {
              return (
                <Link
                  className={`navbar-item ${item.isOpen ? 'now' : ''}`}
                  to={item.router}
                >
                  {item.name}
                </Link>
              );
            })}
          </NavbarEnd>
        </Content>
      </Container>
    </Wrapper>
  );
};

export default Header;
