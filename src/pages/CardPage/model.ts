import { getUser } from '@/shared/api/user';
import { routes } from '@/shared/config/routes';

import { chainRoute } from 'atomic-router';
import { createEffect, restore, sample } from 'effector';

export const currentRoute = routes.CardPage;

// stores region
export const getUserFx = createEffect(getUser);
export const $userRepo = restore(getUserFx, null);

const route = chainRoute({
  route: currentRoute,
  beforeOpen: {
    effect: getUserFx,
    mapParams: ({ params }) => {
      
      return {
        owner: params.owner,
        name: params.name
      };
    }
  }
});

// sample({
//   clock: getUserFx.doneData,
//   source: route.$params,
//   fn(src) {
//     return {
//       owner: src.owner,
//       name: src.name
//     };
//   },
//   target: [getUserFx]
// });
