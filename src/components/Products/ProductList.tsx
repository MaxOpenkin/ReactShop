import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { fetchProductsThunk } from "../../redux/productsSlice";
import ProductItem from "./ProductItem";
import Categories from "../Categories/Categories";
import "./productList.css";
import Sort from "../Sort/Sort";
import SearchBar from "../Search/SearchBar";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import SkeletonCard from "./SkeletonCard";
// import ProductSlider from "./ProductSlider";

const ProductList = () => {
  const { products, status } = useSelector(
    (state: RootState) => state.products
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6; // количество элементов на страницу

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (status === "loading") {
      dispatch(fetchProductsThunk());
    }
  }, [dispatch, status]);

  // Обновление состояния из URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get("page") || "1", 10);
    const category = params.get("category") || null;
    const sort = params.get("sort") || "";
    const query = params.get("search") || "";

    setCurrentPage(page);
    setSelectedCategory(category);
    setSortOrder(sort);
    setSearchQuery(query);
  }, [location.search]);

  // Обновление URL при изменении состояния
  useEffect(() => {
    const queryParams = new URLSearchParams();
    queryParams.set("page", currentPage.toString());
    if (selectedCategory) queryParams.set("category", selectedCategory);
    if (sortOrder) queryParams.set("sort", sortOrder);
    if (searchQuery) queryParams.set("search", searchQuery);

    navigate(`?${queryParams.toString()}`);
  }, [currentPage, selectedCategory, sortOrder, searchQuery, navigate]);

  // Функция для изменения страницы
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Функция для выбора категории
  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1); // сброс на первую страницу при изменении категории
  };

  // Функция для установки поискового запроса
  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // сброс на первую страницу при изменении поискового запроса
  };

  // Функция для сортировки
  const handleSortChange = (order: string) => {
    setSortOrder(order);
  };

  // Функция для фильтрации товаров по категории
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  // Фильтрация товаров по поисковому запросу (по названию и описанию)
  const searchedProducts = filteredProducts.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Функция для сортировки товаров по цене
  const sortedProducts = [...searchedProducts].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    } else if (sortOrder === "desc") {
      return b.price - a.price;
    }
    return 0;
  });

  // Пагинация товаров
  const pageCount = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      {status === "loading" && (
        <div className="product-list">
          {[...Array(itemsPerPage)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      )}

      {status === "success" && (
        <div>
          {/* <ProductSlider products={products} /> */}
          <div className="categories-search_container">
            {/* Передаем функцию для выбора категории */}
            <Categories onCategorySelect={handleCategorySelect} />
            <Sort sortOrder={sortOrder} setSortOrder={handleSortChange} />
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={handleSearchQueryChange}
            />
          </div>
          <div className="content-wrapper">
            <ul className="product-list">
              {paginatedProducts.map((product) => (
                <ProductItem key={product.id} productItem={product} />
              ))}
            </ul>
            <Pagination
              currentPage={currentPage}
              onChangePage={handlePageChange}
              pageCount={pageCount} // передаем общее количество страниц
            />
          </div>
        </div>
      )}

      {status === "error" && <div>Error loading products!</div>}
    </div>
  );
};

export default ProductList;
