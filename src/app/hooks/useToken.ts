import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    let tokenString = ''
    if (localStorage.getItem('access_token') === null){
      localStorage.setItem('access_token', JSON.stringify({access_token: ''}));
    } else {
      tokenString = localStorage.getItem('access_token') as string;
    }
    const userToken = JSON.parse(tokenString);
    return userToken?.acess_token
  };
  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: object) => {
    localStorage.setItem('access_token', JSON.stringify(userToken));
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token
  }

}