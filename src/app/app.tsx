import { RouterProvider } from 'atomic-router-react';
import './styles/App.css';

import { router } from '@/shared/config/routes';
import { Pages } from '@/pages';

export function App() {
  return (
    <RouterProvider router={router}>
      <Pages />
    </RouterProvider>
  );
}
