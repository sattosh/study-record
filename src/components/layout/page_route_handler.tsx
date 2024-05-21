import { Box } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useEffectOnce } from 'react-use';
import { DatabaseInstance, routes } from '../../constants';
import { BaseBackDropProgress } from './base_backdrop_progress';
import { Sidebar } from './sidebar';

export const PageRouteHandler = () => {
  const [initated, setInitated] = React.useState(false);
  const [error, setError] = React.useState('');
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  useEffectOnce(() => {
    const init = async () => {
      // 1秒待つ
      await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        // データベースの初期化する。ただしリトライを3回まで行う
        let retryCount = 0;
        while (retryCount < 3) {
          try {
            await DatabaseInstance.getInstance();
            break;
          } catch (e) {
            // ３回を超えたらエラーを投げる
            if (retryCount >= 2) {
              throw e;
            }
            retryCount++;
            await new Promise((resolve) => setTimeout(resolve, 500));
          }
        }

        // await DatabaseInstance.getInstance();
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
        <BaseBackDropProgress open />
      </>
    );

  if (error) return <div>{error}</div>;

  return (
    <>
      <Sidebar open={sidebarOpen} drawerHandler={setSidebarOpen} />
      <Routes>
        {routes.map(({ path, component: Component, name }) => (
          <Route
            key={name}
            path={path}
            element={
              <Box
                sx={(theme) => ({
                  width: `calc(100vw -  ${theme.spacing(4.5)} - 1px)`,
                  marginLeft: `calc(${theme.spacing(4.5)} + 1px)`,
                  height: '100vh',
                  overflow: 'scroll',
                  overscroll: 'auto',
                })}
              >
                <Component />
              </Box>
            }
          />
        ))}
      </Routes>
    </>
  );
};
