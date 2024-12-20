import { updatePagination } from '@/pages/HomePage/model';
import { client } from '../graphql';
import GetRepos from '../graphql/docs/repositories.gql';
import { RepositoriesQuery, RepositoriesQueryVariables } from './model';

export const getRepos = async ({ login, after }: { login: string; after: string | null }) => {
  const { user } = await client.request<RepositoriesQuery, RepositoriesQueryVariables>(
    GetRepos,
    { login, after }
  );

  updatePagination({ totalCount: user?.repositories?.totalCount ?? 0 });
  return user;
};
