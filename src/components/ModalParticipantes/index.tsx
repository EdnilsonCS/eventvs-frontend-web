import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { IParticipantes } from 'src/services/ParticipantsService';
import {
  Title,
  Card,
  WrapperParticipante,
  NameParticipante,
  TitleWrapper,
} from './styles';

interface ModalParticipantsProps {
  participantes: IParticipantes[];
  open: boolean;
}

const ModalParticipants: React.FC<ModalParticipantsProps> = ({
  open,
  participantes,
}) => {
  return (
    <Card>
      {open && (
        <WrapperParticipante>
          <TitleWrapper>
            <Title>Participantes do evento</Title>
            <button type="button">
              <AiOutlineClose size={40} />
            </button>
          </TitleWrapper>
          {participantes.map(item => (
            <NameParticipante key={Math.random().toString()}>
              Ednilson Cardoso dos santos
            </NameParticipante>
          ))}
        </WrapperParticipante>
      )}
    </Card>
  );
};

export default ModalParticipants;
