import React from 'react';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';

export default function Sorting() {
  return (
    <div className="sorting">
      <div className="sorting__top">
        <MdOutlineArrowDropDownCircle
          size="30"
          style={{ color: '#323232', cursor: 'pointer', marginRight: '10' }}
        />
        <div className='sorting__top-title'>Сортировать по:</div>
      </div>
      <div className="sorting__popup">
        <ul>
          <li className="active">произвольно</li>
          <li>цене</li>
          <li>алфавиту</li>
        </ul>
      </div>
    </div>
  );
}