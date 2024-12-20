interface Language {
  name: string;
  color: string;
}

// Определяем тип для владельца репозитория
interface Owner {
  avatarUrl: string;
  login: string;
  url: string;
}

// Определяем тип для репозитория
interface Repository {
  description: string | null;
  id: string;
  languages: {
    nodes: Language[];
  };
  name: string;
  owner: Owner;
  stargazerCount: number;
  updatedAt: string; 
}
// Тип для ответа на запрос
export interface UserResponse {
  repository: Repository | null;
}

// Типы переменных для запроса
export interface UserVariables {
  owner: string;
  name: string;
}
