import React from "react";

const InfoCard = ({ adatok }) => {
  if (!adatok || adatok.length === 0) return null;

  return (
    <div className="row g-3">
      {adatok.map((hely, index) => (
        <div key={index} className="col-md-6 col-xl-4">
          <div className="card h-100 border-0 shadow-sm hover-shadow transition">
            <div className="card-body d-flex flex-column">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <span className="badge bg-warning text-dark px-2 py-1 small">
                  {hely.tipus}
                </span>
                <small className="text-muted italic">📍 {hely.varos}</small>
              </div>

              <h5 className="fw-bold text-dark mb-3">{hely.nev}</h5>

              <p className="card-text text-muted small flex-grow-1">
                {hely.leiras ||
                  "Fedezze fel ezt a csodálatos helyszínt és ismerje meg a környék történelmét!"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoCard;
