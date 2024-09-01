import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByIdThunk } from "../../redux/productsSlice";
import { useEffect } from "react";
import "./productDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedProduct, status } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductsByIdThunk(Number(id)));
    }
  }, [dispatch, id]);

  return (
    <div className="product-details">
      {status === "loading" && (
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading product...</span>
        </div>
      )}

      {status === "success" && selectedProduct && (
        <div className="product-details-content">
          {/* <button className="back-button" onClick={() => navigate(-1)}>
            Back to Products
          </button> */}
          <h1>{selectedProduct.title}</h1>
          <img src={selectedProduct.image} alt={selectedProduct.title} />
          <div className="product-info">
            <p>Category: {selectedProduct.category}</p>
            <p>Description: {selectedProduct.description}</p>
          </div>
          <div className="product-item_buttons">
            <p className="price">${selectedProduct.price}</p>
            <button className="product-item_addBtn">
              <FontAwesomeIcon
                className="fa-shopping-cart"
                icon={faShoppingCart}
              />{" "}
              1
            </button>
          </div>
          <button className="back-button" onClick={() => navigate(-1)}>
            {"<<"} Back to Products
          </button>
        </div>
      )}

      {status === "error" && <div>Error loading product!</div>}

      {status === "success" && !selectedProduct && <p>Product not found.</p>}
    </div>
  );
};

export default ProductDetails;
