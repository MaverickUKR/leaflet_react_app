import React from "react";
import NavBarLogo from "./NavBarLogo/NavBarLogo";
import NavBarRightBlock from "./NavBarRightBlock/NavBarRightBlock";
import "./NavBarTop.css";

const NavBarTop = () => {
  return (
    <div className="navBar__container">
      <div className="navBar__wrapperTop">
        <NavBarLogo />
        <NavBarRightBlock />
      </div>
    </div>
  );
};

export default NavBarTop;
