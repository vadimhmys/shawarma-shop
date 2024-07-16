import React from 'react';
import ContentLoader from 'react-content-loader';

 const CardLoader: React.FC = () => {
  return (
    <ContentLoader
      style={{ margin: '0 10px 20px' }}
      speed={2}
      width={288}
      height={430}
      viewBox="0 0 288 430"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <rect x="67" y="568" rx="0" ry="0" width="0" height="1" />
      <rect x="247" y="541" rx="0" ry="0" width="1" height="3" />
      <rect x="0" y="0" rx="16" ry="16" width="288" height="200" />
      <rect x="10" y="210" rx="13" ry="13" width="268" height="25" />
      <rect x="0" y="245" rx="9" ry="9" width="288" height="96" />
      <rect x="10" y="351" rx="17" ry="17" width="262" height="25" />
      <rect x="10" y="385" rx="14" ry="14" width="81" height="46" />
      <rect x="80" y="504" rx="0" ry="0" width="1" height="0" />
      <rect x="172" y="385" rx="16" ry="16" width="105" height="40" />
    </ContentLoader>
  );
}

export default CardLoader;