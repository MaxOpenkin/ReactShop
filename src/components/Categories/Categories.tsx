import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchCategoriesThunk } from "../../redux/productsSlice";
import "./categories.css";
import SkeletonCategory from "./SkeletonCategory";

interface CategoriesProps {
  onCategorySelect: (category: string | null) => void;
}

const Categories: React.FC<CategoriesProps> = ({ onCategorySelect }) => {
  const { categories, categoriesStatus } = useSelector(
    (state: RootState) => state.products
  );
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (categoriesStatus === "loading") {
      dispatch(fetchCategoriesThunk());
    }
  }, [dispatch, categoriesStatus]);

  const handleCategorySelect = (category: string | null) => {
    setActiveCategory(category); // Устанавливаем активную категорию
    onCategorySelect(category); // Вызываем функцию из пропсов
  };

  return (
    <div>
      {categoriesStatus === "loading" && <SkeletonCategory />}

      {categoriesStatus === "success" && (
        <div className="category_container">
          <ul className="category-ul_container">
            {/* Проверяем, является ли текущая категория активной */}
            <li
              className={`category-item ${
                activeCategory === null ? "active" : ""
              }`}
              onClick={() => handleCategorySelect(null)}
            >
              All
            </li>
            {categories.map((category, index) => (
              <li
                key={index}
                className={`category-item ${
                  activeCategory === category ? "active" : ""
                }`}
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      )}

      {categoriesStatus === "error" && <div>Error loading categories!</div>}
    </div>
  );
};

export default Categories;
