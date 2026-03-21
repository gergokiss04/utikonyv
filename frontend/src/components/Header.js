import React from "react";

const Header = () => {
  return (
    <div
      className="container-fluid border-bottom shadow-sm"
      style={{ backgroundColor: "#98863d" }}
    >
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 px-4">
        <div className="col-12 col-md-3 mb-3 mb-md-0 text-center text-md-start">
          <a
            href="/"
            className="text-white text-decoration-none d-flex align-items-center justify-content-center justify-content-md-start"
          >
            <span className="fs-4 fw-bold">Intelligens Útikönyv</span>
          </a>
        </div>

        <div className="col-12 col-md-auto mb-3 mb-md-0 d-flex justify-content-center">
          <div
            className="btn-group flex-wrap justify-content-center"
            role="group"
            aria-label="Kategóriák"
          >
            <button type="button" className="btn btn-outline-light px-3">
              Összes
            </button>
            <button type="button" className="btn btn-outline-light px-3">
              Múzeumok
            </button>
            <button type="button" className="btn btn-outline-light px-3">
              Műemlékek
            </button>
            <button type="button" className="btn btn-outline-light px-3">
              Szállások
            </button>
            <button type="button" className="btn btn-outline-light px-3">
              Éttermek
            </button>
          </div>
        </div>

        <div className="col-12 col-md-3 d-flex justify-content-center justify-content-md-end align-items-center">
          <div
            className="btn-group btn-group-sm"
            role="group"
            aria-label="Vármegyék"
          >
            <button type="button" className="btn btn-outline-light px-3">
              Borsod
            </button>
            <button type="button" className="btn btn-outline-light px-3">
              Heves
            </button>
            <button type="button" className="btn btn-outline-light px-3">
              Nógrád
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
