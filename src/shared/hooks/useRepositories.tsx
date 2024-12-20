import {
  $currentPage,
  $repositories,
  $totalPages,
  getReposFx,
  resetRepositories,
  setCurrentPage,
  setLogin
} from '@/pages/HomePage/model';
import { useUnit } from 'effector-react';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

export const useRepositories = () => {
  const [loginValue, setLoginValue] = useState('');
  const [value] = useDebounce(loginValue, 150);
  const [repositories, totalPages, currentPage] = useUnit([
    $repositories,
    $totalPages,
    $currentPage
  ]);

  useEffect(() => {
    resetRepositories();
    const storedLogin = localStorage.getItem('login');
    if (storedLogin) {
      setLoginValue(storedLogin);
      setLogin(storedLogin);
      getReposFx({ login: storedLogin, after: null });
    }
  }, []);

  useEffect(() => {
    if (value) {
      getReposFx({ login: value, after: null });
    }
  }, [value]);
  useEffect(() => {
    if (loginValue === '') {
      resetRepositories();
    }
    setLogin(loginValue);
  }, [loginValue]);
  useEffect(() => {
    if (value) {
      const currentPage = repositories.pageInfo.hasNextPage
        ? repositories.pageInfo.endCursor
        : null;
      getReposFx({ login: value, after: currentPage });
    }
  }, [value]);

  const handlePageClick = (page: { selected: number }) => {
    const selectedPage = page.selected + 1;
    setCurrentPage(selectedPage);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLogin = e.target.value;
    setLoginValue(newLogin);
    setCurrentPage(1);

    if (loginValue === '') {
      resetRepositories();
      return;
    }
  };

  return {
    repositories,
    loginValue,
    handleInputChange,
    handlePageClick,
    totalPages,
    currentPage
  };
};
