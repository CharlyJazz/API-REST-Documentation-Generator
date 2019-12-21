import React from "react";
import "./styles.scss";

// This component will be use the the logo
// setted in the provider, the colors and brand name
const Header: React.FC = () => {
  return (
    <header className="Header">
      <div>
        <img
          src="https://baller-documentation.firebaseapp.com/static/media/logo.46eb94ae.png"
          alt="logo"
        />
      </div>
      <div>
        <button>
          <div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
