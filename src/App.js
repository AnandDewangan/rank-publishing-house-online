import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";

import SessionManager from "./components/SessionManager";

// Common Layout
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";

// Public Pages
import LoadingPage from "./pages/LoadingPage";
import Home from "./Home/Home";
import About from "./About/About";
import Publish from "./Publish/Publish";
import Registration from "./Registration/Registration";
import RoyaltyCalculate from "./Calculate/RoyaltyCalculate";

// Admin/Author Dashboard
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import AuthorDashboard from "./components/Dashboard/Home";
import AuthorList from "./components/AuthorList/AuthorList";
import AddAuthor from "./components/AuthorList/AddAuthor";
import AuthorProfile from "./components/AuthorList/AuthorProfile";
import AuthorBooks from "./components/AuthorBooks";
import Transactions from "./components/Transactions";
import AdminLogin from "./components/AdminLogin";
import AuthorLogin from "./components/AuthorLogin";
import HeroImage from "./components/ImageUploader";
import FeedbackPage from "./components/FeedbackPage";
import ArticleManager from "./components/ArticleManager";
import InitialForm from "./components/PIF/InitialForm";
import StepOneForm from "./components/PIF/StepOneForm";
import StepTwoForm from "./components/PIF/StepTwoForm";
import StepThreeForm from "./components/PIF/StepThreeForm";
import StepFourForm from "./components/PIF/StepFourForm";
import ThankYou from "./components/PIF/ThankYouPage";

// Finance Tools (new)
import Dashboard from "./pages/Dashboard";
import SalarySlipGenerator from "./pages/SalarySlipGenerator";

// Dashboard Layouts and Route Guards
import AuthorLayout from "./components/Layout/AuthorLayout";
import AdminLayout from "./components/Layout/AdminLayout";
import PrivateRoute from "./utils/PrivateRoute";
import EntryDetailsPage from "./components/PIF/EntryDetailsPage";
import AllEntriesPage from "./components/PIF/AllEntriesPage";
import OrdersPage from "./components/OrdersPage";
import InvoiceForm from "./components/InvoiceForm";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (window.location.hostname.endsWith("vercel.app")) {
      window.location.href = "https://www.rankpublishinghouse.online";
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <LoadingPage />;

  return (
    <Router>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>
          Rank Publishing House - India's Best Book Publishing House
        </title>
        <meta
          name="description"
          content="Rank Publishing House is one of the top book publishing companies in India, offering self-publishing, eBook publishing, and global distribution services."
        />
        <meta
          name="keywords"
          content="book publishing, self publishing, top book publishers in India, best publishing house, publish book in India, Rank Publishing House"
        />
        <meta name="author" content="Rank Publishing House" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Rank Publishing House - Publish Your Book With India's Best Publisher"
        />
        <meta
          property="og:description"
          content="We provide premium book publishing services including ISBN allocation, book marketing, and global distribution."
        />
        <meta
          property="og:image"
          content="https://www.rankpublishinghouse.online/static/media/logo.5e350eac0a92c9b8a15f.png"
        />
        <meta
          property="og:url"
          content="https://www.rankpublishinghouse.online"
        />
        <meta property="og:site_name" content="Rank Publishing House" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Rank Publishing House - Best Book Publishing Services in India"
        />
        <meta
          name="twitter:description"
          content="Self-publish your book with India's top-ranked book publishing house. Get global reach and maximize your book's success."
        />
        <meta
          name="twitter:image"
          content="https://www.rankpublishinghouse.online/static/media/logo.5e350eac0a92c9b8a15f.png"
        />

        <link rel="canonical" href="https://www.rankpublishinghouse.online" />
      </Helmet>
      <SessionManager />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/thank-you"
          element={
            <>
              <Header />
              <ThankYou />
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Header />
              <About />
              <Footer />
            </>
          }
        />
        <Route
          path="/how-to-publish"
          element={
            <>
              <Header />
              <Publish />
              <Footer />
            </>
          }
        />
        <Route
          path="/registration"
          element={
            <>
              <Header />
              <Registration />
              <Footer />
            </>
          }
        />
        <Route
          path="/author-royalty"
          element={
            <>
              <Header />
              <RoyaltyCalculate />
              <Footer />
            </>
          }
        />
        <Route path="/step-one/:rphCode" element={<StepOneForm />} />
        <Route path="/step-two/:rphCode" element={<StepTwoForm />} />
        <Route path="/step-three/:rphCode" element={<StepThreeForm />} />
        <Route path="/step-four/:rphCode" element={<StepFourForm />} />

        {/* Auth Pages (No header/footer) */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/author-login" element={<AuthorLogin />} />

        {/* Admin Routes (with layout + protected) */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute adminOnly={true}>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/author-list"
          element={
            <PrivateRoute adminOnly={true}>
              <AdminLayout>
                <AuthorList />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/add-author"
          element={
            <PrivateRoute adminOnly={true}>
              <AdminLayout>
                <AddAuthor />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/hero-image"
          element={
            <PrivateRoute adminOnly={true}>
              <AdminLayout>
                <HeroImage />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/author-feedback"
          element={
            <PrivateRoute adminOnly={true}>
              <AdminLayout>
                <FeedbackPage />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/pif-form"
          element={
            <PrivateRoute adminOnly={true}>
              <AdminLayout>
                <InitialForm />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/invoice"
          element={
            <PrivateRoute adminOnly={true}>
              <AdminLayout>
                <InvoiceForm />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/entries"
          element={
            <PrivateRoute adminOnly={true}>
              <AdminLayout>
                <AllEntriesPage />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/entry-details/:rphCode"
          element={
            <PrivateRoute adminOnly={true}>
              <AdminLayout>
                <EntryDetailsPage />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/article-manage"
          element={
            <PrivateRoute adminOnly={true}>
              <AdminLayout>
                <ArticleManager />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/store-order"
          element={
            <PrivateRoute adminOnly={true}>
              <AdminLayout>
                <OrdersPage />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-finance"
          element={
            <PrivateRoute adminOnly={true}>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/salary-slip-generator"
          element={
            <PrivateRoute adminOnly={true}>
              <AdminLayout>
                <SalarySlipGenerator />
              </AdminLayout>
            </PrivateRoute>
          }
        />

        {/* Author Routes (with layout + protected) */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute authorOnly={true}>
              <AuthorLayout>
                <AuthorDashboard />
              </AuthorLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/authors/:id"
          element={
            <PrivateRoute authorOnly={false}>
              <AuthorLayout>
                <AuthorProfile />
              </AuthorLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/books/:authorId"
          element={
            <PrivateRoute authorOnly={false}>
              <AuthorLayout>
                <AuthorBooks />
              </AuthorLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/transactions/:authorId"
          element={
            <PrivateRoute authorOnly={false}>
              <AuthorLayout>
                <Transactions />
              </AuthorLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
