/* eslint-disable react/jsx-no-useless-fragment */
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
  onClose(): void;
}

const ModalParticipants: React.FC<ModalParticipantsProps> = ({
  open,
  participantes,
  onClose,
}) => {
  return (
    <>
      {open && (
        <Card>
          <WrapperParticipante>
            <TitleWrapper>
              <Title>Participantes do evento</Title>
              <button type="button" onClick={onClose}>
                <AiOutlineClose size={40} />
              </button>
            </TitleWrapper>
            {participantes.map(item => (
              <NameParticipante key={Math.random().toString()}>
                {item.participante.pessoa.nome}
              </NameParticipante>
            ))}
          </WrapperParticipante>
        </Card>
      )}
    </>
  );
};

export default ModalParticipants;
