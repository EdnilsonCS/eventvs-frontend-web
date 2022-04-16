/* eslint-disable react/require-default-props */
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';
import { BsFilter } from 'react-icons/bs';
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from '../Select';
import Input from '../Input';
import CategoryService, { ICategory } from '../../services/CategoryService';
import { ButtonFilter, ModalFilter, Container, Button } from './styles';

export interface DataFilter {
  categoriaId?: string;
  dataInicial: string;
  dataFinal: string;
  statusEvento?: 'PUBLICADO' | 'CRIADO' | undefined;
}
interface IFilterModal {
  onHandleFilter: (value: DataFilter) => void;
  onClean: () => void;
  isNotState?: boolean;
}

interface IFilterRef {
  clean(): void;
}

const Filter: React.ForwardRefRenderFunction<IFilterRef, IFilterModal> = (
  { onHandleFilter, isNotState, onClean },
  ref,
) => {
  const location = useLocation();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const schema = Yup.object().shape({
    categoriaId: Yup.string().optional(),
    statusEvento: Yup.string().when('dataInicial', {
      is: () => !isNotState,
      then: Yup.string().required('Campo Obrigatório'),
      otherwise: Yup.string().optional(),
    }),
    dataInicial: Yup.date()
      .transform((curr, orig) => (orig === '' ? null : curr))
      .nullable()
      .optional(),
    dataFinal: Yup.date()
      .transform((curr, orig) => (orig === '' ? null : curr))
      .nullable()
      .when('dataInicial', {
        is: (val: any) => !!val,
        then: Yup.date().required('Campo Obrigatório'),
        otherwise: Yup.date()
          .transform((curr, orig) => (orig === '' ? null : curr))
          .nullable()
          .optional(),
      }),
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      categoriaId: '',
      dataInicial: '',
      dataFinal: '',
      statusEvento: undefined,
    },
  });
  const handleCleanFilter = (): void => {
    setValue('dataInicial', '');
    setValue('dataFinal', '');
    setValue('statusEvento', undefined);
    setValue('categoriaId', '');
    onClean();
  };
  useImperativeHandle(ref, () => ({
    clean() {
      handleCleanFilter();
    },
  }));
  const formattedCategories = useMemo(() => {
    return categories.map(item => {
      return {
        label: item.nome,
        value: String(item.id),
      };
    });
  }, [categories]);
  const statusEvent = [
    {
      value: 'PUBLICADO',
      label: 'Publicado',
    },
    {
      value: 'CRIADO',
      label: 'Criado',
    },
  ];
  useEffect(() => {
    const getCategoryList = async (): Promise<void> => {
      const serviceCategories = await CategoryService.getCategoryList();

      setCategories(serviceCategories);
    };

    getCategoryList();
  }, [location]);
  const onSubmit = (data: DataFilter): void => {
    onHandleFilter(data);
  };

  const [isOpen, setOpen] = useState(false);

  const handleToggleModalState = (): void => {
    setOpen(!isOpen);
  };
  return (
    <Container>
      <ButtonFilter onClick={handleToggleModalState}>
        {isOpen ? <AiOutlineClose size={24} /> : <BsFilter size={24} />}
        <span> Filter</span>
      </ButtonFilter>
      {isOpen && (
        <ModalFilter onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="dataInicial"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Data Inicial:"
                type="date"
                placeholder="Data Inicial"
                errors={errors}
              />
            )}
          />

          <Controller
            name="dataFinal"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="date"
                label="Data Final:"
                placeholder="Data Inicial"
                errors={errors}
              />
            )}
          />

          <Controller
            name="statusEvento"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Status:"
                options={statusEvent}
                errors={errors}
              />
            )}
          />

          <Controller
            name="categoriaId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Categoria:"
                options={formattedCategories}
                errors={errors}
              />
            )}
          />

          <Button type="submit">Filtrar</Button>
        </ModalFilter>
      )}
    </Container>
  );
};

export default forwardRef(Filter);
