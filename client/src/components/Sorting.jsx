import React, { useState } from 'react';
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md';

export default function Sorting() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const signs = ['произвольно', 'цене', 'алфавиту'];

  const handleClick = (index) => {
    setActiveIndex(index);
    setIsVisible(false);
  };

  return (
    <div className="sorting">
      <div className="sorting__top">
        {isVisible ? (
          <MdOutlineArrowDropDown size="30" style={{ color: '#323232', marginRight: '10' }} />
        ) : (
          <MdOutlineArrowDropUp size="30" style={{ color: '#323232', marginRight: '10' }} />
        )}

        <div className="sorting__top-title">
          Сортировать по: <span onClick={() => setIsVisible(!isVisible)}>{signs[activeIndex]}</span>
        </div>
      </div>
      {isVisible && (
        <div className="sorting__popup">
          <ul>
            {signs.map((s, i) => (
              <li
                key={s}
                className={i === activeIndex ? 'active' : ''}
                onClick={() => handleClick(i)}>
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
