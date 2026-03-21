  import Header from './components/Header';
  import Footer from './components/Footer';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import './App.css';
 
  function App() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fcfcfc', }}>
        <Header />        
        <Footer />
      </div>
    );
  }

  export default App;