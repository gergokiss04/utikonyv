import React, { useState, useEffect, useRef } from "react";
import * as bootstrap from "bootstrap";

const IntelligenceModal = ({ helyszin, onClose }) => {
  const [okosAjanlatok, setOkosAjanlatok] = useState([]);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);
  const modalInstance = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      modalInstance.current = new bootstrap.Modal(modalRef.current, {
        backdrop: true,
      });
    }
  }, []);

  useEffect(() => {
    if (!modalInstance.current) return;
    if (helyszin) {
      modalInstance.current.show();
    } else {
      modalInstance.current.hide();
    }
  }, [helyszin]);

  useEffect(() => {
    if (!helyszin) return;

    setLoading(true);
    const cleanId = helyszin.id.split(/[#/]/).pop();

    fetch(`http://localhost:5000/api/okos-ajanlo/${cleanId}`)
      .then((res) => res.json())
      .then((data) => {
        setOkosAjanlatok(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [helyszin]);

  useEffect(() => {
    return () => {
      modalInstance.current?.dispose();
    };
  }, []);

  return (
    <div ref={modalRef} className="modal fade" tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content rounded-4 overflow-hidden border-0 shadow">
          <div className="modal-header bg-dark text-white border-0">
            <div>
              <h5 className="modal-title fw-bold">
                {helyszin?.nev || "Betöltés..."}
              </h5>
              <small style={{ color: "#ffc107" }}>
                Intelligens Helyszín-elemző
              </small>
            </div>
            <button className="btn-close btn-close-white" onClick={onClose} />
          </div>

          <div className="modal-body p-0">
            <div className="row g-0">
              <div className="col-md-7 p-4 bg-white">
                <span className="badge bg-warning text-dark mb-3">
                  {helyszin?.tipus || "Helyszín"}
                </span>
                <p className="text-muted mb-4">Település: {helyszin?.varos}</p>

                <h6 className="fw-bold border-bottom pb-2 mb-3 small">
                  LEÍRÁS
                </h6>
                <p
                  className="text-secondary"
                  style={{ fontSize: "0.9rem", lineHeight: "1.5" }}
                >
                  {helyszin?.leiras ||
                    "Ehhez a helyszínhez nem tartozik leírás."}
                </p>
              </div>

              <div className="col-md-5 p-4 bg-light border-start">
                <h6 className="fw-bold mb-4 small">Szemantikus ajánlatok:</h6>
                {loading ? (
                  <p className="text-center py-4">Ajánlatok keresése...</p>
                ) : okosAjanlatok.length > 0 ? (
                  <div className="d-flex flex-column gap-3">
                    {okosAjanlatok.map((a, i) => (
                      <div
                        key={i}
                        className="card border-0 shadow-sm p-3 bg-white"
                      >
                        <strong
                          className="d-block mb-1"
                          style={{ fontSize: "0.85rem" }}
                        >
                          {a.nev}
                        </strong>
                        <p
                          className="text-primary fw-bold mb-2"
                          style={{ fontSize: "0.75rem" }}
                        >
                          {a.miert}
                        </p>

                        <div className="d-flex justify-content-between align-items-center mt-auto">
                          <small
                            className="text-muted"
                            style={{ fontSize: "0.65rem" }}
                          >
                            📍 {a.varos}
                          </small>
                          <span
                            className="badge bg-light text-dark border small"
                            style={{ fontSize: "0.6rem" }}
                          >
                            {a.tipus}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted small italic">
                    Nincs elérhető ajánlat.
                  </p>
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
