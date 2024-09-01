import React from 'react';
import './skeleton.css'; // импортируем стили для скелетона

const SkeletonCard: React.FC = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-title"></div>
      <div className="skeleton-category"></div>
      <div className="skeleton-price"></div>
    </div>
  );
};

export default SkeletonCard;