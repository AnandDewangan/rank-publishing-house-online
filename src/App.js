import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"; // Bootstrap JS required for ScrollSpy 
import Header from "./Layout/Header";
import LoadingPage from "./pages/LoadingPage";
import Home from "./Home/Home";
import About from "./About/About"; 
import './App.css';
import Footer from "./Layout/Footer";
import Publish from "./Publish/Publish";
import { Helmet } from "react-helmet";
import Registration from "./Registration/Registration";
import RoyaltyCalculate from "./Calculate/RoyaltyCalculate";

<Helmet>
    {/* Primary Meta Tags */}
    <title>Rank Publishing House - India's Best Book Publishing House</title>
    <meta name="description" content="Rank Publishing House is one of the top book publishing companies in India, offering self-publishing, eBook publishing, and global distribution services." />
    <meta name="keywords" content="book publishing, self publishing, top book publishers in India, best publishing house, publish book in India, Rank Publishing House" />
    <meta name="author" content="Rank Publishing House" />

    {/* Open Graph / Facebook */}
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Rank Publishing House - Publish Your Book With India's Best Publisher" />
    <meta property="og:description" content="We provide premium book publishing services including ISBN allocation, book marketing, and global distribution." />
    <meta property="og:image" content="https://www.rankpublishinghouse.online/static/media/logo.5e350eac0a92c9b8a15f.png" />
    <meta property="og:url" content="https://www.rankpublishinghouse.online" />
    <meta property="og:site_name" content="Rank Publishing House" />

    {/* Twitter */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Rank Publishing House - Best Book Publishing Services in India" />
    <meta name="twitter:description" content="Self-publish your book with India's top-ranked book publishing house. Get global reach and maximize your book's success." />
    <meta name="twitter:image" content="https://www.rankpublishinghouse.online/static/media/logo.5e350eac0a92c9b8a15f.png" />

    {/* Canonical URL */}
    <link rel="canonical" href="https://www.rankpublishinghouse.online" />
</Helmet>

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000); 
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
              <Route path="/how-to-publish" element={<Publish />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/author-royalty" element={<RoyaltyCalculate />} />
            </Routes>
            <Footer />
          </>
        )}
    </Router>
  );
}

export default App;
