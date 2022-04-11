import { InputHTMLAttributes } from 'react';

import { Input } from './styles';

type ISearchInput = InputHTMLAttributes<HTMLInputElement>;

function SearchInput({ onChange, ...props }: ISearchInput): JSX.Element {
  return <Input {...props} onChange={onChange} placeholder="Pesquisar..." />;
}

export default SearchInput;
