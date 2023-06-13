import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString: string | null = localStorage.getItem('access_token');
    const userToken = JSON.parse(tokenString || '');
    return userToken?.acess_token
  };
  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: object) => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token
  }

}