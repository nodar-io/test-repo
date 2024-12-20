import { UserResponse, UserVariables } from './model';
import GetUser from '../graphql/docs/user.gql';
import { client } from '../graphql';

export const getUser = async ({ owner, name }: { owner: string; name: string }) => {
  const user = await client.request<UserResponse, UserVariables>(GetUser, { owner, name });

  return user;
};
