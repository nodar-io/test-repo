import ReactPaginate from 'react-paginate';

import './pagination.css';

import { IconLeft } from '@/shared/uikit/Icons/IconLeft';
import { IconRight } from '@/shared/uikit/Icons/IconRight';
export const Pagination = ({
  handleClick,
  currentPage,
  totalPages
}: {
  handleClick: (page: { selected: number }) => void
  currentPage: number;
  totalPages: number;
}) => {
  return (
    <ReactPaginate
      breakLabel={'...'}
      pageCount={totalPages}
      containerClassName='Pagination'
      onPageChange={handleClick}
      activeClassName='Pagination__active'
      breakClassName='Pagination__page-item'
      breakLinkClassName='Pagination__page-link'
      nextClassName='Pagination__page-item'
      nextLinkClassName='Pagination__page-link'
      pageClassName='Pagination__page-item'
      pageLinkClassName='Pagination__page-link'
      previousClassName='Pagination__page-item'
      previousLinkClassName='Pagination__page-link'
      forcePage={currentPage - 1}
      nextLabel={<IconLeft />}
      previousLabel={<IconRight />}
    />
  );
};
