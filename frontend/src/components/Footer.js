import React from "react";

function Footer() {
  return (
    <footer
      className="container-fluid d-flex flex-wrap flex-column flex-md-row justify-content-between align-items-center py-4 border-top"
      style={{ backgroundColor: "#98863d" }}
    >
      <div className="col-12 col-md-4 mb-3 mb-md-0 text-center text-md-start">
        <p className="mb-0 text-white">Készítette: Kiss Gergő Zsolt</p>
      </div>

      <div className="col-12 col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0">
        <span className="fs-3" role="img" aria-label="globe">
          🌍
        </span>
      </div>

      <div className="col-12 col-md-4 text-center text-md-end text-white small opacity-75">
        Szemantikus web alkalmazása egy intelligens útikönyv fejlesztésében
      </div>
    </footer>
  );
}

export default Footer;
