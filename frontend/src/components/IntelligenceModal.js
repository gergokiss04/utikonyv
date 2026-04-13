import React, { useState, useEffect } from "react";

const IntelligenceModal = ({ helyszin, onClose }) => {
  const [okosAjanlatok, setOkosAjanlatok] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!helyszin) {
      setOkosAjanlatok([]);
      return;
    }

    setLoading(true);
    setOkosAjanlatok([]);

    const cleanId = helyszin.id.split(/[#/]/).pop();

    fetch(`http://localhost:5000/api/okos-ajanlo/${cleanId}`)
      .then((res) => res.json())
      .then((data) => {
        setOkosAjanlatok(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ajánló hiba:", err);
        setLoading(false);
      });
  }, [helyszin]);

  if (!helyszin) return null;

  return (
    <div
      className="modal show d-block modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title-id"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content rounded-4 overflow-hidden border-0 shadow-lg">
          <div className="modal-header bg-dark text-white border-0">
            <div>
              <h5 className="modal-title fw-bold" id="modal-title-id">
                {helyszin.nev}
              </h5>
              <small className="text-warning">
                Intelligens Helyszín-elemző
              </small>
            </div>
            <button
              className="btn-close btn-close-white"
              onClick={onClose}
              aria-label="Bezárás"
            />
          </div>

          <div className="modal-body p-0">
            <div className="row g-0">
              <div className="col-md-7 p-4 bg-white">
                <span className="badge bg-warning text-dark mb-2">
                  {helyszin.tipus}
                </span>
                <p className="text-muted small mb-3">📍 {helyszin.varos}</p>
                <h6 className="fw-bold border-bottom pb-2 mb-3">Leírás</h6>
                <p className="text-secondary" style={{ fontSize: "12px" }}>
                  {helyszin.leiras ||
                    "Ehhez a helyszínhez nem tartozik leírás."}
                </p>
              </div>

              <div className="col-md-5 p-4 bg-light border-start">
                <h6 className="fw-bold mb-3 small">Szemantikus ajánlatok:</h6>

                {loading ? (
                  <div className="text-center py-4">
                    <div
                      className="spinner-border spinner-border-sm text-warning me-2"
                      role="status"
                    ></div>
                    <span className="small">Elemzés folyamatban!</span>
                  </div>
                ) : okosAjanlatok.length > 0 ? (
                  <div className="d-flex flex-column gap-2">
                    {okosAjanlatok.map((a, i) => (
                      <div
                        key={i}
                        className="card border-0 shadow-sm p-3 bg-white hover-shadow transition"
                      >
                        <strong className="d-block mb-1 small">{a.nev}</strong>
                        <p
                          className="text-primary fw-bold mb-1"
                          style={{ fontSize: "12px" }}
                        >
                          {a.miert}
                        </p>
                        <small
                          className="text-muted"
                          style={{ fontSize: "12px" }}
                        >
                          📍 {a.varos}
                        </small>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="alert alert-info py-2 px-3 small">
                    Nincs elérhető ajánlat ehhez a helyszínhez.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="modal-footer bg-light border-0">
            <button
              className="btn btn-dark rounded-pill px-4"
              onClick={onClose}
            >
              Rendben
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntelligenceModal;
