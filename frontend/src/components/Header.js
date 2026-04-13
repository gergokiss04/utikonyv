import React from "react";

const Header = () => {
  return (
    <div className="container-fluid border-bottom shadow-sm header-footer-color">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 px-4">
        <div className="col-12 col-md-3 mb-3 mb-md-0 text-center text-md-start">
          <a
            href="/"
            className="text-white text-decoration-none d-flex align-items-center justify-content-center justify-content-md-start"
          >
            <h1 className="fs-4 fw-bold">Intelligens Útikönyv</h1>
          </a>
        </div>
      </header>
    </div>
  );
};

export default Header;
