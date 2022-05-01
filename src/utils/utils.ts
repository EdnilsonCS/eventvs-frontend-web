export const onlyNumbers = (data: string): string =>
  data?.toString()?.replace(/[^0-9]/g, '');

export const stringContainsNumber = (str: string | undefined): boolean => {
  if (!str) {
    return true;
  }

  return /[0-9]/.test(str);
};
