import React, { useEffect, useState } from 'react';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    fetch('http://localhost:7000/api/category/getall')
      .then((res) => res.json())
      .then((arr) => setCategories(arr));
  }, []);

  return (
    <div className="categories">
      <ul>
        {categories.map((c, i) => (
          <li
            key={c.id}
            className={i === activeIndex ? 'active' : ''}
            onClick={() => handleClick(i)}>
            {c.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
