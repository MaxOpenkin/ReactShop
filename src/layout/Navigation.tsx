import { NavLink } from "react-router-dom";
import "./navigation.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";


const Navigation = () => {
  return (
    <div className="nav_container">
      <ul className="nav-ul_container">
        <li className="nav-item">
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/contacts" className={({ isActive }) => (isActive ? "active" : "")}>
            Contacts
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/cart" className={({ isActive }) => (isActive ? "active" : "")}>
          <FontAwesomeIcon className="nav-icon_cart" icon={faShoppingCart} />
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/user" className={({ isActive }) => (isActive ? "active" : "")}>
          <FontAwesomeIcon icon={faUser} className="nav-icon_user" />
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
