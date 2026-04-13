import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import InfoCard from "./components/InfoCard";
import IntelligenceModal from "./components/IntelligenceModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [helyszinek, setHelyszinek] = useState([]);
  const [kivalasztottHely, setKivalasztottHely] = useState(null);

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Header />
      <main className="container-fluid py-4 px-4 flex-grow-1">
        <div className="row g-4">
          <aside className="col-12 col-lg-3">
            <Sidebar onAdatFrissites={setHelyszinek} />
          </aside>
          <section className="col-12 col-lg-9">
            {helyszinek.length > 0 ? (
              <InfoCard adatok={helyszinek} onValasztas={setKivalasztottHely} />
            ) : (
              <div className="h-100 d-flex align-items-center justify-content-center">
                <div className="alert alert-info text-center shadow-sm py-5 px-5 rounded-4 border-0 bg-white">
                  <span
                    className="d-block mb-3"
                    style={{ fontSize: "5px" }}
                    role="img"
                    aria-label="térkép"
                  >
                    🗺️
                  </span>
                  <h4 className="fw-bold text-dark">
                    Fedezd fel Magyarország kincseit!
                  </h4>
                  <p className="text-muted mb-0">
                    Válassz egy vármegyét a bal oldali listából a kezdéshez.
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
      {kivalasztottHely && (
        <IntelligenceModal
          helyszin={kivalasztottHely}
          onClose={() => setKivalasztottHely(null)}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
