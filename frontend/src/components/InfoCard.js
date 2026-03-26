import React, { useState, useEffect } from "react";

const InfoCard = ({ megyeId }) => {
  const [helyszinek, setHelyszinek] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (megyeId) {
      setLoading(true);
      fetch(`http://localhost:5000/api/ajanlo/${megyeId}`)
        .then((res) => res.json())
        .then((data) => {
          setHelyszinek(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Hiba a helyszínek betöltésekor:", err);
          setLoading(false);
        });
    }
  }, [megyeId]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-grow text-warning" role="status"></div>
        <p className="mt-2 text-muted">Kincsek keresése a megyében...</p>
      </div>
    );
  }

  return (
    <div className="row g-4">
      {helyszinek.length > 0 ? (
        helyszinek.map((hely, index) => (
          <div key={index} className="col-12 col-md-6 col-xl-4">
            <div className="card h-100 shadow-sm border-0 hover-shadow transition">
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <span className="badge bg-warning text-dark px-2 py-1 small">
                    {hely.tipus}
                  </span>
                  <small className="text-muted italic">📍 {hely.varos}</small>
                </div>
                <h5 className="card-title fw-bold text-dark mb-3">
                  {hely.nev}
                </h5>
                <p className="card-text text-muted small flex-grow-1">
                  {hely.leiras ||
                    "Fedezze fel ezt a csodálatos helyszínt és ismerje meg a környék történelmét!"}
                </p>
                <button className="btn btn-outline-dark btn-sm mt-3 w-100 border-2 fw-bold">
                  Részletek megtekintése
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-12 text-center py-5">
          <h4 className="text-muted">Válassz egy vármegyét a felfedezéshez!</h4>
        </div>
      )}
    </div>
  );
};

export default InfoCard;
