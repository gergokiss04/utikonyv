import React from 'react';

const Header = () => {
  return (
    <div className="container-fluid border-bottom bg-white shadow-sm">
      <header className="d-flex flex-wrap align-items-center justify-content-between py-3 px-4">
        
        <div className="col-md-3">
          <a href="/" className="text-dark text-decoration-none d-flex align-items-center">
            <span className="fs-4 fw-bold">Intelligens Útikönyv</span>
          </a>
        </div>

        <div className="col-md-auto mb-2 mb-md-0">
          <div className="btn-group" role="group" aria-label="Kategóriák">
            <button type="button" className="btn btn-outline-primary px-3">Összes</button>
            <button type="button" className="btn btn-outline-primary px-3">Múzeumok</button>
            <button type="button" className="btn btn-outline-primary px-3">Műemlékek</button>
            <button type="button" className="btn btn-outline-primary px-3">Szállások</button>
            <button type="button" className="btn btn-outline-primary px-3">Éttermek</button>
          </div>
        </div>

        <div className="col-md-3 d-flex justify-content-end align-items-center">
          <div className="btn-group btn-group-sm" role="group" aria-label="Vármegyék">
            <button type="button" className="btn btn-outline-primary px-3">Borsod</button>
            <button type="button" className="btn btn-outline-primary px-3">Heves</button>
            <button type="button" className="btn btn-outline-primary px-3">Nógrád</button>
          </div>
        </div>

      </header>
    </div>
  );
};

export default Header;