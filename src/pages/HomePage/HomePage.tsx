import styles from './homepage.module.css';

import { Pagination } from '@/shared/uikit/Pagination/Pagination';
import { Link } from 'atomic-router-react';
import { routes } from '@/shared/config/routes';
import { useRepositories } from '@/shared/hooks';

export const HomePage = () => {
  const { currentPage, handleInputChange, handlePageClick, loginValue, repositories, totalPages } =
    useRepositories();
  return (
    <div className={styles.container}>
      <h2>Список Репозиториев</h2>
      <input
        type='text'
        value={loginValue}
        onChange={handleInputChange}
        placeholder='Введите имя пользователя GitHub'
      />

      <ul>
        {repositories?.nodes?.map((repo) => (
          <li key={repo.id} className={styles.repoItem}>
            <Link params={{ owner: loginValue, name: repo.name }} to={routes.CardPage}>
              <p className={styles.repoName}>
                Название: <span>{repo.name}</span>
              </p>
            </Link>

            <p>
              Stars: {repo.stargazerCount}
              <span style={{ color: 'gold' }}>★</span>
            </p>
            <p>Последний коммит: {new Date(repo.updatedAt).toLocaleDateString()}</p>
            <a target='_blank' href={repo.url} rel='noopener noreferrer'>
              {repo.url}
            </a>
          </li>
        ))}
      </ul>
      {repositories.nodes.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handleClick={handlePageClick}
        />
      )}
    </div>
  );
};
