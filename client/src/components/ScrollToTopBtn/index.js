import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';

const ScrollToTopBtn = () => {
  // controls visibility of button
  const [showTopBtn, setShowTopBtn] = useState(false);

  // event listener for scroll
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  // scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0
    });
  };

  return (
    // back to top button
    <>
      {showTopBtn && (
        <Button 
          variant="dark"
          type="button"
          id="myBtn"
          className="back-to-top fs-4 rounded-circle animate__animated animate__fadeIn shadow"
          onClick={() => scrollToTop()}
        >
          <i className="bi bi-arrow-up-circle text-success"></i>
        </Button>
      )}
    </>
  );
};

export default ScrollToTopBtn;