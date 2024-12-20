import { createEffect, createEvent, createStore, sample } from 'effector';
import { getRepos } from '@/shared/api/repos';
import { RepositoryConnection } from '@/shared/api/repos/model';
import { chainRoute } from 'atomic-router';
import { routes } from '@/shared/config/routes';

export const getReposFx = createEffect(getRepos);

export const setLogin = createEvent<string>();
export const setCurrentPage = createEvent<number>();
export const updatePagination = createEvent<{ totalCount: number }>();
export const resetRepositories = createEvent();

export const $currentPage = createStore<number>(
  Number(localStorage.getItem('currentPage')) || 1
).on(setCurrentPage, (state, page) => {
  localStorage.setItem('currentPage', page.toString());
  return page;
});
export const $login = createStore<string>(localStorage.getItem('login') || '').on(
  setLogin,
  (state, login) => {
    localStorage.setItem('login', login);
    return login;
  }
);
export const $repositories = createStore<RepositoryConnection>({
  nodes: [],
  pageInfo: { hasNextPage: false, endCursor: null },
  totalCount: 0
})
  .on(getReposFx.doneData, (state, user) => {
    if (!user || !user.repositories) return state;

    return {
      nodes: user?.repositories?.nodes,
      pageInfo: user?.repositories?.pageInfo,
      totalCount: user?.repositories?.totalCount
    };
  })
  .on(resetRepositories, () => ({
    nodes: [],
    pageInfo: { hasNextPage: false, endCursor: null },
    totalCount: 0
  }));

export const $totalPages = $repositories.map((state) => Math.ceil(state.totalCount / 10));

sample({
  clock: setCurrentPage,
  source: {
    login: $login,
    currentPage: $currentPage,
    endCursor: $repositories.map((state) => state.pageInfo.endCursor)
  },
  fn: ({ login, currentPage, endCursor }) => ({
    login,
    after: currentPage > 1 ? endCursor : null
  }),
  target: getReposFx
});
getReposFx.use(({ login, after }) => getRepos({ login, after }));

