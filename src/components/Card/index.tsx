/* eslint-disable react/require-default-props */
import { useMemo } from 'react';
import dayjs from '../../helpers/datas';

import { Bold, Button, Container, Title, Wrapper } from './styles';

interface ICard {
  title: string;
  description: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  dataHoraInicio: string;
  dataHoraFim: string;
  type?: 'cancel' | 'ok';
  onPress?: () => void;
  onPressButton?: () => void;
}

export default function Card({
  title,
  logradouro,
  numero,
  bairro,
  cidade,
  estado,

  description,
  dataHoraInicio,
  dataHoraFim,
  onPressButton,
  type,
  onPress,
}: ICard): JSX.Element {
  const formattedAndres = `${logradouro}, ${numero}, ${bairro}, ${cidade}, ${estado}`;
  const formattedDateInicio = useMemo(() => {
    return dayjs(dataHoraInicio).locale('pt-br').format('DD/MM/YYYY HH:mm');
  }, [dataHoraInicio]);
  const formattedDateFim = useMemo(() => {
    return dayjs(dataHoraFim).locale('pt-br').format('DD/MM/YYYY HH:mm');
  }, [dataHoraFim]);
  return (
    <Container onClick={onPress}>
      <Wrapper>
        <Title>{title}</Title>

        {onPressButton && (
          <Button
            onClick={onPressButton}
            style={{
              backgroundColor: type === 'cancel' ? '#DE0b20' : '#6A2ABA',
            }}
          >
            {type === 'cancel' ? 'Cancelar' : 'Inscrever'}
          </Button>
        )}
      </Wrapper>
      <span>{description}</span>
      <Wrapper>
        <Bold>{formattedAndres}</Bold>
      </Wrapper>

      <Bold>{formattedDateInicio}</Bold>
      <span> até </span>
      <Bold>{formattedDateFim}</Bold>
    </Container>
  );
}
