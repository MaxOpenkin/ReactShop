import Navigation from "./Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import "./header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <div className="header-container">
        <div className="header-branding">
          <FontAwesomeIcon icon={faShoppingBag} className="header-icon" />
          <Link to="/" className="header-title-link">
            <h1 className="header-title">Online Store</h1>
          </Link>
        </div>
      <Navigation />
      </div>
    </div>
  );
};

export default Header;
