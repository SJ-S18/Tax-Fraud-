import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TaxForm from "./pages/TaxForm";
import InvoiceForm from "./pages/InvoiceForm";
import TaxHistory from "./pages/TaxHistory";
import InvoiceHistory from "./pages/InvoiceHistory";
import RiskScore from "./pages/RiskScore";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

// NEW ADMIN PAGES
import AdminUsers from "./pages/AdminUsers";
import AdminTaxRecords from "./pages/AdminTaxRecords";
import AdminInvoices from "./pages/AdminInvoices";
import AdminSuspicious from "./pages/AdminSuspicious";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.35 }}
      >
        <Routes location={location}>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Taxpayer Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tax"
            element={
              <ProtectedRoute>
                <TaxForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/invoice"
            element={
              <ProtectedRoute>
                <InvoiceForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tax-history"
            element={
              <ProtectedRoute>
                <TaxHistory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/invoice-history"
            element={
              <ProtectedRoute>
                <InvoiceHistory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/risk-score"
            element={
              <ProtectedRoute>
                <RiskScore />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <AdminUsers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/tax-records"
            element={
              <ProtectedRoute>
                <AdminTaxRecords />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/invoices"
            element={
              <ProtectedRoute>
                <AdminInvoices />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/suspicious"
            element={
              <ProtectedRoute>
                <AdminSuspicious />
              </ProtectedRoute>
            }
          />

          {/* Common */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;