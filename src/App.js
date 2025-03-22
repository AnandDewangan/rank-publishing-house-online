import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"; // Bootstrap JS required for ScrollSpy 
import Header from "./Layout/Header";
import LoadingPage from "./pages/LoadingPage";
import Home from "./Home/Home";
import About from "./Home/About";
import Contact from "./pages/Contact";
import './App.css';
import Footer from "./Layout/Footer";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000); // 3 sec loading time
  }, []);

  return (
    <Router>
        {isLoading ? (
          <LoadingPage />
        ) : (
          <>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
            <Footer />
          </>
        )}
    </Router>
  );
}

export default App;
