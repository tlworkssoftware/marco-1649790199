export function maskCPFeCNPJ(document: string): string {
  if (
    !document ||
    document === null ||
    document === undefined ||
    document.includes('null')
  ) {
    return '';
  }

  document = document.replace(/\D/g, '');
  if (document.length > 11) {
    document = document.replace(/^(\d{2})(\d)/, '$1.$2');
    document = document.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    document = document.replace(/\.(\d{3})(\d)/, '.$1/$2');
    document = document.replace(/(\d{4})(\d)/, '$1-$2');
  } else {
    document = document.replace(/\D/g, '');
    document = document.replace(/(\d{3})(\d)/, '$1.$2');
    document = document.replace(/(\d{3})(\d)/, '$1.$2');
    document = document.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }
  return document;
}

export const maskNumber = (number: string): number | any => {
  try {
    number = number.replace(/\D/g, '');
    return Number(number);
  } catch (error) {
    console.log(error);
    return number;
  }
};

export const maskPhoneNumber = (phone = ''): string => {
  if (phone === null || phone === undefined || phone.includes('null')) {
    return '';
  }

  phone = phone.replace(/\D/g, '');

  if (phone.length > 11) {
    return phone.substring(0, 11);
  }

  phone = phone.replace(/\D/g, '');
  phone = phone.replace(/(\d{0})(\d)/, '($1$2');
  phone = phone.replace(/(\d{2})(\d)/, '$1) $2');
  phone = phone.replace(/(\d{5})(\d{1,4})$/, '$1-$2');

  return phone;
};

export const maskCurrencyReal = (amount: string): string => {
  try {
    if (amount.length === 2) {
      return '';
    }

    if (amount === '0') {
      return 'R$ 0,00';
    }

    amount = amount.replace(/\D/g, '');
    let tmp = amount + '';
    if (amount.length === 1) {
      tmp = `,${amount}`;
    }

    tmp = tmp.replace(/([0-9]{2})$/g, ',$1');
    if (tmp.length > 6) {
      tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2');
    }
    if (tmp.length > 8) {
      tmp = tmp.replace(/([0-9]{1})([0-9]{3})/g, '$1.$2');
    }
    return `R$ ${tmp}`;
  } catch (error) {
    console.log(error);
    return '';
  }
};

export const maskDate = (date: string): string => {
  try {
    if (date === null || date === undefined || date.includes('null')) {
      return '';
    }

    date = date.replace(/\D/g, '').slice(0, 10);
    date = date.replace(/(\d{2})(\d)/, '$1/$2');
    date = date.replace(/(\d{2})(\d)/, '$1/$2');

    return date;
  } catch (error) {
    console.log(error);
    return '';
  }
};
