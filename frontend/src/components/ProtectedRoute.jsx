import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  // Admin should never access taxpayer pages
  if (
    user.role === "admin" &&
    ["/dashboard", "/tax", "/invoice", "/tax-history", "/invoice-history", "/risk-score"].includes(location.pathname)
  ) {
    return <Navigate to="/admin" replace />;
  }

  // Taxpayer should never access admin pages
  if (user.role !== "admin" && location.pathname.startsWith("/admin")) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;