import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

export default function Pagination({numberOfItems, limit, onPageChange, currentPage}) {
  const pageCount = Math.ceil(numberOfItems / limit);

  return (
    <div className={styles.root}>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => onPageChange(e.selected + 1)}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        forcePage={currentPage - 1}
      />
    </div>
  );
}
