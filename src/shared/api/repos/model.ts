// Типы для языков
interface Language {
  color: string | null;
  name: string | null;
}

// Типы для соединения языков
interface LanguageConnection {
  nodes: Language[] | null;
}

// Типы для репозитория
interface Repository {
  owner: string;
  id: string;
  name: string;

  url: string;
  stargazerCount: number;
  updatedAt: string;
  description: string | null;
  languages: LanguageConnection | null;
}

// Типы для информации о пагинации
interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

// Типы для соединения репозиториев
export interface RepositoryConnection {
  pageInfo: PageInfo;
  nodes: Repository[];
  totalCount: number;
}

// Типы для пользователя
interface User {
  url: string;
  avatarUrl: string;
  repositories: RepositoryConnection | null;
}

// Типы для запроса
export interface RepositoriesQuery {
  user: User | null;
}

// Типы для переменных запроса
export interface RepositoriesQueryVariables {
  login: string;
  after?: string | null;
}
