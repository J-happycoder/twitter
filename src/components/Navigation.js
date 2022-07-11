import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <ul className="links">
        <li className="link">
          <Link to="/">
            <i className="fa-brands fa-twitter navigation_icon" />
          </Link>
        </li>
        <li className="link">
          <Link to="/profile">
            <i className="fa-solid fa-user navigation_icon" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
