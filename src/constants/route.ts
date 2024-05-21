import { Dashboard, SvgIconComponent } from '@mui/icons-material';
import { NoMatchPage, TopPage } from '../pages';

interface Route {
  path: string;
  component: () => JSX.Element;
  name: string;
  hideInSidebar?: boolean;
  icon?: SvgIconComponent;
}

export enum RoutePath {
  TOP = '/',
}

export const routes: Route[] = [
  {
    path: '/',
    component: TopPage,
    name: 'Dashboard',
    icon: Dashboard,
  },
  {
    path: '*',
    component: NoMatchPage,
    name: 'NoMatch',
    hideInSidebar: true,
  },
];
