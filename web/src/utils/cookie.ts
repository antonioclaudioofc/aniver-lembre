import Cookies from 'js-cookie';

export const setCookie = (name: string, value: string, options?: Cookies.CookieAttributes) => {
  Cookies.set(name, value, options);
};
