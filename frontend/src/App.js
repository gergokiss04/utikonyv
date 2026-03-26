import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [helyszinek, setHelyszinek] = useState([]);

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Header />

      <main className="container-fluid py-4 px-4 flex-grow-1">
        <div className="row g-4">
          {/* SIDEBAR */}
          <aside className="col-12 col-lg-3">
            <Sidebar onAdatFrissites={setHelyszinek} />
          </aside>

          {/* TARTALOM (Kártyák) */}
          <section className="col-12 col-lg-9">
            {helyszinek.length > 0 ? (
              <div className="row g-3">
                {helyszinek.map((hely, index) => (
                  <div key={index} className="col-md-6 col-xl-4">
                    <div className="card h-100 border-0 shadow-sm hover-shadow transition">
                      <div className="card-body">
                        <div className="d-flex justify-content-between mb-2">
                          <span className="badge bg-warning text-dark">
                            {hely.tipus}
                          </span>
                          <small className="text-muted">📍 {hely.varos}</small>
                        </div>
                        <h5 className="fw-bold text-dark">{hely.nev}</h5>
                        <p className="card-text text-muted small mt-2">
                          {hely.leiras ||
                            "Nincs elérhető leírás ehhez a helyszínhez."}
                        </p>
                        <button className="btn btn-outline-dark btn-sm w-100 mt-auto fw-bold">
                          Részletek
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-100 d-flex align-items-center justify-content-center">
                <div className="alert alert-info text-center shadow-sm py-5 px-5 rounded-4">
                  <i className="bi bi-search fs-1 d-block mb-3"></i>
                  <h4>Fedezd fel Magyarország kincseit!</h4>
                  <p className="mb-0">
                    Válassz egy vármegyét a bal oldali listából a kezdéshez.
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
