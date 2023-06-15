import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    let tokenString = '{"access_token": ""}'
    if (localStorage.getItem('access_token') !== null){
      tokenString = localStorage.getItem('access_token') as string;
    } 
    const userToken = JSON.parse(tokenString);
    return userToken?.access_token
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