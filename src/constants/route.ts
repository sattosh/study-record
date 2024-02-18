import { HomePage, NoMatchPage } from '../pages';

export const routes = [
  {
    path: '/',
    component: HomePage,
    name: 'Home',
  },
  {
    path: '*',
    component: NoMatchPage,
    name: 'NoMatch',
  },
];
