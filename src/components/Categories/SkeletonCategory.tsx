import './categories.css';

const SkeletonCategory: React.FC = () => {
  return (
    <div className="skeleton-category-container">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="skeleton-category-item"></div>
      ))}
    </div>
  );
};

export default SkeletonCategory;