import { useEffect, useState } from "react";
import "./productSlider.css";
import { IProducts } from "../../redux/productsSlice";

type ProductSliderProps = {
    products: IProducts[];
  };
  
  const ProductSlider: React.FC<ProductSliderProps> = ({ products }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  
    // Для случайного выбора карточек
    const randomProducts = [...products].sort(() => 0.5 - Math.random()).slice(0, 5);
  
    useEffect(() => {
      const autoScroll = setInterval(() => {
        if (isAutoScrolling) {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % randomProducts.length);
        }
      }, 5000); // Меняем слайд каждые 5 секунд
  
      return () => clearInterval(autoScroll);
    }, [isAutoScrolling, randomProducts.length]);
  
    const handlePrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + randomProducts.length) % randomProducts.length);
      setIsAutoScrolling(false); // Останавливаем автоматическое пролистывание
    };
  
    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % randomProducts.length);
      setIsAutoScrolling(false); // Останавливаем автоматическое пролистывание
    };
  
    const displayedProduct = randomProducts[currentIndex];
  
    return (
      <div className="product-slider">
        <button className="slider-button prev-button" onClick={handlePrev}>
          &#10094;
        </button>
        <div className="slider-container">
          {displayedProduct && (
            <div className="product-card">
              <div className="product-info">
                <h2 className="product-title">{displayedProduct.title}</h2>
                <p className="product-description">{displayedProduct.description}</p>
                <p>${displayedProduct.price}</p>
              </div>
              <div className="product-image">
                <img src={displayedProduct.image} alt={displayedProduct.title} />
              </div>
            </div>
          )}
        </div>
        <button className="slider-button next-button" onClick={handleNext}>
          &#10095;
        </button>
      </div>
    );
  };
  
  export default ProductSlider;