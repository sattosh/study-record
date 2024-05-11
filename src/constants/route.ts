import { TopPage, NoMatchPage } from '../pages';

export const routes = [
  {
    path: '/',
    component: TopPage,
    name: 'Top',
  },
  {
    path: '*',
    component: NoMatchPage,
    name: 'NoMatch',
  },
];
