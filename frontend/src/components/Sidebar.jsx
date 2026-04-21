import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaFileInvoice, FaHistory, FaShieldAlt, FaUser, FaUsers, FaFileAlt, FaExclamationTriangle } from "react-icons/fa";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const taxpayerLinks = [
    { label: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { label: "Tax Form", path: "/tax", icon: <FaFileAlt /> },
    { label: "Invoice Form", path: "/invoice", icon: <FaFileInvoice /> },
    { label: "Tax History", path: "/tax-history", icon: <FaHistory /> },
    { label: "Invoice History", path: "/invoice-history", icon: <FaHistory /> },
    { label: "Risk Score", path: "/risk-score", icon: <FaShieldAlt /> },
    { label: "Profile", path: "/profile", icon: <FaUser /> },
  ];

  const adminLinks = [
    { label: "Admin Dashboard", path: "/admin", icon: <FaHome /> },
    { label: "Total Users", path: "/admin/users", icon: <FaUsers /> },
    { label: "Tax Records", path: "/admin/tax-records", icon: <FaFileAlt /> },
    { label: "Invoices", path: "/admin/invoices", icon: <FaFileInvoice /> },
    { label: "Suspicious Users", path: "/admin/suspicious", icon: <FaExclamationTriangle /> },
    { label: "Profile", path: "/profile", icon: <FaUser /> },
  ];

  const links = user?.role === "admin" ? adminLinks : taxpayerLinks;

  return (
    <div
      style={{
        width: "250px",
        minHeight: "100vh",
        background: "rgba(15, 23, 42, 0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderRight: "1px solid rgba(255,255,255,0.08)",
        padding: "25px 18px",
        position: "sticky",
        top: 0,
      }}
    >
      <h3
        style={{
          color: "#fff",
          fontWeight: "800",
          marginBottom: "30px",
          textAlign: "center",
          letterSpacing: "0.5px",
        }}
      >
        {user?.role === "admin" ? "⚡ Admin Control" : "TaxFraudX AI"}
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {links.map((link, index) => {
          const isActive = location.pathname === link.path;

          return (
            <button
              key={index}
              onClick={() => navigate(link.path)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                width: "100%",
                padding: "13px 16px",
                borderRadius: "14px",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "0.95rem",
                color: "#fff",
                background: isActive
                  ? "linear-gradient(135deg, #7b4dff, #1ec8ff)"
                  : "rgba(255,255,255,0.05)",
                boxShadow: isActive
                  ? "0 8px 24px rgba(30,200,255,0.25)"
                  : "none",
                transition: "all 0.3s ease",
              }}
            >
              <span style={{ fontSize: "1rem" }}>{link.icon}</span>
              {link.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;