import { Routes, Route } from 'react-router-dom';
import Layout from './layout';
import Login from './login';
import Products from './product';
import Setting from './setting';
import NoAuth from './noauth';
import useToken from './hooks/useToken';
import { useEffect } from 'react';

export default function App() {
  const { token, setToken } = useToken();
  useEffect(() => {
    console.log(token);
  }, [token]);

  if (!token) {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login setToken={setToken} />} />
          <Route path="*" element={<NoAuth />} />
        </Route>
      </Routes>
    );
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Products />} />
          <Route path="products" element={<Products />} />
          <Route path="setting" element={<Setting />} />

          <Route
            path="*"
            element={<div className="h-screen mx-auto">Not found</div>}
          />
        </Route>
      </Routes>
    </div>
  );
}
