import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Modal = () => {
  const [ajanlatok, setAjanlatok] = useState([]);
  const [loading, setLoading] = useState(false);

  const getGlobalAjanlo = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/ajanlo")
      .then((res) => res.json())
      .then((data) => {
        setAjanlatok(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-warning shadow-lg rounded-pill px-4 py-2 position-fixed"
        style={{ bottom: "100px", right: "20px", zIndex: "1050" }}
        data-bs-toggle="modal"
        data-bs-target="#Modal"
        onClick={getGlobalAjanlo}
      >
        <i className="bi bi-patch-question-fill me-2 fs-5"></i>
        Segíthetek?
      </button>

      <div
        className="modal fade animate-fade-in"
        id="Modal"
        tabIndex="-1"
        aria-labelledby="ModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content border-0 shadow-lg rounded-4">
            <div
              className="modal-header border-bottom-0 text-white rounded-top-4"
              style={{ backgroundColor: "#98863d" }}
            >
              <h5 className="modal-title fw-bold" id="ModalLabel">
                <i className="bi bi-lightbulb me-2"></i> Ezek érdekesek lehetnek
                az ön számára:
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body bg-light">
              {loading ? (
                <div className="text-center py-5">
                  <div
                    className="spinner-border text-warning"
                    role="status"
                  ></div>
                  <p className="mt-2 text-muted small">
                    Kincsek keresése az országban...
                  </p>
                </div>
              ) : (
                <div className="row g-3">
                  {ajanlatok.map((hely, index) => (
                    <div key={index} className="col-md-4">
                      <div className="card h-100 border-0 shadow-sm rounded-3 hover-shadow transition">
                        <div className="card-body">
                          <span className="badge bg-warning text-dark mb-2">
                            {hely.tipus}
                          </span>
                          <h6 className="card-title fw-bold mb-1">
                            {hely.nev}
                          </h6>
                          <small className="text-muted d-block mb-2">
                            📍 {hely.varos}
                          </small>
                          <p className="card-text small text-muted">
                            {hely.leiras ||
                              "Fedezd fel ezt a csodálatos helyszínt!"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="modal-footer border-top-0 bg-light rounded-bottom-4">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Bezárás
              </button>
              <button
                type="button"
                className="btn btn-warning"
                onClick={getGlobalAjanlo}
              >
                <i className="bi bi-arrow-clockwise me-1"></i>Új ajánlatok
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
