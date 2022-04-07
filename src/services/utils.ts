export const onlyNumbers = (data: string): string =>
  data?.toString()?.replace(/[^0-9]/g, '');
