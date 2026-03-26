import React, { useState, useEffect } from "react";

const Recommendation = ({ megyeId }) => {
  const [adatok, setAdatok] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/ajanlo/${megyeId}`)
      .then((valasz) => valasz.json())
      .then((tisztazottAdat) => {
        setAdatok(tisztazottAdat);
      })
      .catch((hiba) => console.error("Hiba történt:", hiba));
  }, [megyeId]);

  return (
    <div className="row g-3">
      {adatok.map((hely) => (
        <div className="col-md-4" key={hely.id}>
          <div className="card h-100 shadow-sm border-warning">
            <div className="card-body text-center">
              <h5 className="card-title fw-bold">{hely.nev}</h5>
              <p className="card-text text-muted small">{hely.varos}</p>
              <span className="badge bg-warning text-dark">{hely.tipus}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recommendation;
