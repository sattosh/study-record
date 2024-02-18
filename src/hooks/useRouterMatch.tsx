import { useLocation } from 'react-router-dom';

export const useRouteMatch = () => {
  const { pathname: currentPathname } = useLocation();

  const isMatchPathname = (pathname: string): boolean => {
    return currentPathname === pathname;
  };

  return {
    isMatchPathname,
  };
};
