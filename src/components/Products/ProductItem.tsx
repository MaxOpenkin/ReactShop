import { FC } from "react";
import { IProducts } from "../../redux/productsSlice";
import { useNavigate } from "react-router-dom";
import "./productItem.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Импорт компонента FontAwesome
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export interface IProductItemProps {
  productItem: IProducts;
}

const ProductItem: FC<IProductItemProps> = ({ productItem }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${productItem.id}`);
  };

  return (
    <div className="product-item_container">
    <li className="product-item_info" onClick={handleClick}>
      <img
        className="product-item-image"
        src={productItem.image}
        alt={productItem.title}
      />
      <h2 className="product-item_title">{productItem.title}</h2>
      <p className="product-item_category"> {productItem.category}</p>
    </li>
    <div className="product-item_buttons">
    <p className="product-item_price">${productItem.price}</p>
      <button className="product-item_addBtn">
      <FontAwesomeIcon className="fa-shopping-cart" icon={faShoppingCart} /> 1
      </button>
    </div>
    </div>
  );
};

export default ProductItem;
