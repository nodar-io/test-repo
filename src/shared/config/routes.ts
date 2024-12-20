import { createHistoryRouter, createRoute } from 'atomic-router';
import { sample } from 'effector';
import { appStarted } from './init';
import { createBrowserHistory } from 'history';

export const routes = {
  HomePage: createRoute(),
  CardPage: createRoute<{ owner: string; name: string }>()
};

const mappedRoutes = [
  { path: '/', route: routes.HomePage },
  { path: '/card-page/:owner/:name', route: routes.CardPage }
];

export const router = createHistoryRouter({
  routes: mappedRoutes
});

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory
});
