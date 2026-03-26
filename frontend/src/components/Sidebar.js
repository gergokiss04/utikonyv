import React, { useState, useEffect } from "react";

const Sidebar = ({ onAdatFrissites }) => {
  const [megyek, setMegyek] = useState([]);
  const [statisztika, setStatisztika] = useState([]);
  const [aktivMegye, setAktivMegye] = useState("");
  const [aktivKategoria, setAktivKategoria] = useState("Összes");

  // 1. Megyék betöltése
  useEffect(() => {
    fetch("http://localhost:5000/api/megyek")
      .then((res) => res.json())
      .then((data) => setMegyek(data))
      .catch((err) => console.error("Hiba a megyék betöltésekor:", err));
  }, []);

  // 2. Adatok lekérése a "Mindentudó" végpontról
  useEffect(() => {
    if (aktivMegye) {
      const cleanId = aktivMegye.split(/[#/]/).pop();

      // Statisztika frissítése (alsó részhez)
      fetch(`http://localhost:5000/api/statisztika/${cleanId}`)
        .then((res) => res.json())
        .then((data) => setStatisztika(Array.isArray(data) ? data : []));

      // A TE MINDENTUDÓ VÉGPONTOD HÍVÁSA
      fetch(`http://localhost:5000/api/helyszinek/${cleanId}`)
        .then((res) => res.json())
        .then((data) => {
          let megjelenitendo = data;

          // Szűrés a frontenden, ha nem az "Összes" van kiválasztva
          if (aktivKategoria !== "Összes") {
            const katMap = {
              Múzeumok: "Muzeum",
              Műemlékek: "Muemlek",
              Szállások: "Szallas",
              Éttermek: "Etterem",
            };
            const keresettTipus = katMap[aktivKategoria];
            megjelenitendo = data.filter((h) => h.tipus === keresettTipus);
          }

          // Küldjük az App.js-nek a kész listát (legyen az 1 vagy 100 elem)
          onAdatFrissites(megjelenitendo);
        })
        .catch((err) => console.error("Hiba a helyszínek lekérésekor:", err));
    }
  }, [aktivMegye, aktivKategoria, onAdatFrissites]);

  return (
    <div className="card shadow-sm border-0 bg-white rounded-3">
      <div
        className="card-header fw-bold text-white py-3"
        style={{ backgroundColor: "#98863d" }}
      >
        📍 Vármegyék választása
      </div>
      <div
        className="list-group list-group-flush"
        style={{ maxHeight: "300px", overflowY: "auto" }}
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

      {/* Kategória gombok */}
      <div className="p-3 border-top bg-light">
        <h6 className="fw-bold small text-muted text-uppercase mb-2 text-center">
          Szűrés
        </h6>
        <div className="btn-group-vertical w-100 shadow-sm">
          {["Összes", "Múzeumok", "Műemlékek", "Szállások", "Éttermek"].map(
            (kat) => (
              <button
                key={kat}
                className={`btn btn-sm text-center py-2 ${aktivKategoria === kat ? "btn-dark" : "btn-outline-dark bg-white text-dark"}`}
                onClick={() => setAktivKategoria(kat)}
              >
                {kat}
              </button>
            ),
          )}
        </div>
      </div>

      {/* Statisztika rész (ez nálad már jó) */}
      {aktivMegye && (
        <div className="card-footer bg-white border-top p-3 text-center">
          {/* ... statisztika renderelés ... */}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
