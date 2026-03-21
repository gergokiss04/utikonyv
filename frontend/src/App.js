import Header from "./components/Header";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="d-flex flex-column vh-100">
      <Header />
      <main className="flex-grow-1">
        <div className="container mt-5">
          <h2 className="text-center text-muted">
            A tartalom betöltése folyamatban...
          </h2>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
