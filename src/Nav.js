import React, { useEffect, useState } from "react";
import "./Nav.css";
function Nav() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);
  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img
        className="netflix-logo"
        src="netflix-logo.png"
        alt="netflix-logo"
        srcset=""
      />
      <img
        className="netflix-avatar"
        src="netflix-avatar.png"
        alt="netflix-avatar"
      />
    </div>
  );
}

export default Nav;
