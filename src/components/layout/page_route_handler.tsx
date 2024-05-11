import React from 'react';
import { useEffectOnce } from 'react-use';
import { Route, Routes } from 'react-router-dom';
import { routes, DatabaseInstance } from '../../constants';
import { BaseBackDropProgress } from './base_backdrop_progress';
import { Box } from '@mui/material';

export const PageRouteHandler = () => {
  const [initated, setInitated] = React.useState(false);
  const [error, setError] = React.useState('');

  useEffectOnce(() => {
    const init = async () => {
      try {
        // 1秒待つ
        await new Promise((resolve) => setTimeout(resolve, 10000));
        await DatabaseInstance.getInstance();
      } catch (e) {
        setError(`${e}`);
      }
      setInitated(true);
    };

    init();
  });

  if (!initated)
    return (
      <>
        <BaseBackDropProgress open={true} />
      </>
    );

  if (error) return <div>{error}</div>;

  return (
    <Routes>
      {routes.map(({ path, component: Component, name }) => (
        <Route
          key={name}
          path={path}
          element={
            <Box sx={{ width: '100vw', height: '100vh', overflow: 'scroll', overscroll: 'auto' }}>
              <Component />
            </Box>
          }
        />
      ))}
    </Routes>
  );
};
