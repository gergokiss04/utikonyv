import React, { useState, useEffect } from "react";

const kategoria = {
  Múzeumok: "Muzeum",
  Műemlékek: "Muemlek",
  Szállások: "Szallas",
  Éttermek: "Etterem",
};

const Sidebar = ({ onAdatFrissites }) => {
  const [megyek, setMegyek] = useState([]);
  const [statisztika, setStatisztika] = useState([]);
  const [aktivMegye, setAktivMegye] = useState("");
  const [aktivKategoria, setAktivKategoria] = useState("Összes");

  useEffect(() => {
    fetch("http://localhost:5000/api/megyek")
      .then((res) => res.json())
      .then((data) => {
        setMegyek(data);
        if (data.length > 0) setAktivMegye(data[0].id);
      })
      .catch((err) => console.error("Megyék hiba:", err));
  }, []);

  useEffect(() => {
    if (aktivMegye) {
      const cleanId = aktivMegye.split(/[#/]/).pop();

      fetch(`http://localhost:5000/api/statisztika/${cleanId}`)
        .then((res) => res.json())
        .then((data) => setStatisztika(Array.isArray(data) ? data : []))
        .catch((err) => console.error("Statisztika hiba:", err));

      fetch(`http://localhost:5000/api/helyszinek/${cleanId}`)
        .then((res) => res.json())
        .then((data) => {
          let megjelenitendo = data;
          if (aktivKategoria !== "Összes") {
            const keresettTipus = kategoria[aktivKategoria];
            megjelenitendo = data.filter((h) => h.tipus === keresettTipus);
          }
          onAdatFrissites(megjelenitendo);
        });
    }
  }, [aktivMegye, aktivKategoria, onAdatFrissites]);

  return (
    <div className="card shadow-sm border-0 bg-white rounded-3 overflow-hidden">
      <div className="card-header fw-bold text-white py-3 text-center header-footer-color">
        📍 Vármegyék választása
      </div>

      <div
        className="list-group list-group-flush"
        style={{ maxHeight: "250px", overflowY: "auto", paddingBottom: "10px" }}
      >
        {megyek.map((m) => (
          <button
            key={m.id}
            className={`list-group-item list-group-item-action py-2 ${aktivMegye === m.id ? "bg-warning-subtle fw-bold border-start border-4 border-warning" : ""}`}
            onClick={() => setAktivMegye(m.id)}
          >
            {m.nev}
          </button>
        ))}
      </div>

      <div className="p-3 border-top bg-light text-center">
        <h6 className="fw-bold small text-muted text-uppercase mb-2">
          Kategóriák
        </h6>
        <div className="btn-group-vertical w-100 shadow-sm">
          {["Összes", "Múzeumok", "Műemlékek", "Szállások", "Éttermek"].map(
            (kat) => (
              <button
                key={kat}
                className={`btn btn-sm py-2 ${aktivKategoria === kat ? "btn-dark text-white" : "btn-outline-dark bg-white"}`}
                onClick={() => setAktivKategoria(kat)}
              >
                {kat}
              </button>
            ),
          )}
        </div>
      </div>

      {aktivMegye && (
        <div className="card-footer bg-white border-top p-3">
          <h6 className="fw-bold small text-muted text-uppercase mb-2 text-center">
            📊 Statisztika
          </h6>
          {statisztika.length > 0 ? (
            statisztika.map((s, i) => (
              <div
                key={i}
                className="d-flex justify-content-between small mb-1 border-bottom pb-1"
              >
                <span>{s.tipus}:</span>
                <span className="badge bg-warning text-dark rounded-pill px-2">
                  {s.db} db
                </span>
              </div>
            ))
          ) : (
            <p className="small text-muted text-center mb-0 italic">
              Nincs adat.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
