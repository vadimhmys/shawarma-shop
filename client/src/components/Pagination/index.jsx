import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

export default function Pagination() {
  return (
    <div className={styles.root}>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => console.log(e)}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        pageCount={9}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}
