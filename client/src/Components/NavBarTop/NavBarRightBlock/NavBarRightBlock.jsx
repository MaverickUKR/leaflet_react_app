import React from "react";
import "./NavBarRightBlock.css";
import NavBarLang from "../NavBarLang/NavBarLang";

const NavBarRightBlock = () => {
  return (
    <div className="navBar__rightBlock-container">
      <div className="navBar__addAnnounce-wrapper">
        <a className="navBar__addAnnounce" href="/announcement">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 7H1M7 13V7V13ZM7 7V1V7ZM7 7H13H7Z"
              stroke="#283149"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="navBar__announceText">Подати оголошення</span>
        </a>
      </div>
      <NavBarLang />
    </div>
  );
};

export default NavBarRightBlock;
