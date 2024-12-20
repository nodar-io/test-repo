import { createRoutesView } from 'atomic-router-react';
import { HomePageRoute } from './HomePage';
import { CardPageRoute } from './CardPage';

export const Pages = createRoutesView({
  routes: [HomePageRoute, CardPageRoute]
});
