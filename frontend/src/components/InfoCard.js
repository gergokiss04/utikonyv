import React from "react";

const InfoCard = ({ adatok, onValasztas }) => {
  return (
    <div className="row g-3">
      {adatok.map((hely) => (
        <div key={hely.id} className="col-md-6 col-xl-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body d-flex flex-column">
              <div className="d-flex justify-content-between mb-2">
                <span className="badge bg-warning text-dark">{hely.tipus}</span>
                <small className="text-muted">📍 {hely.varos}</small>
              </div>

              <h5 className="fw-bold">{hely.nev}</h5>

              <p className="text-muted small flex-grow-1">
                {hely.leiras
                  ? hely.leiras.substring(0, 100) + "..."
                  : "Kattintson a részletekért!"}
              </p>

              <button
                className="btn btn-outline-dark btn-sm mt-3 w-100 fw-bold border-2"
                onClick={() => onValasztas(hely)}
              >
                Részletek
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoCard;
