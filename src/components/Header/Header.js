import React from "react";

function Header() {
  return (
    <nav class="navbar navbar-dark bg-primary">
      <a href="#" className="navbar-brand">
        Banking App
      </a>

      <ul className="navbar-nav">
        <li className="nav-item mr-auto">
          <a href="#" className="nav-link">
            Home
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
