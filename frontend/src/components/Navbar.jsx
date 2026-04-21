import React from "react";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.replace("/");
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "250px",
        right: 0,
        height: "70px",
        background: "rgba(15, 23, 42, 0.92)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 30px",
        zIndex: 1999,
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
      }}
    >
      {/* Left side */}
      <div>
        <h4
          style={{
            color: "#fff",
            fontWeight: "700",
            margin: 0,
            fontSize: "1.3rem",
          }}
        >
          TaxFraudX AI
        </h4>
        <div style={{ color: "#cbd5e1", fontSize: "0.9rem" }}>
          Intelligent Tax Fraud Detection System
        </div>
      </div>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        {/* Avatar */}
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #7b4dff, #1ec8ff)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "700",
            color: "#fff",
            fontSize: "1rem",
            boxShadow: "0 8px 20px rgba(30, 200, 255, 0.25)",
          }}
        >
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>

        {/* User name + role */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#fff",
            lineHeight: "1.2",
          }}
        >
          <span style={{ fontWeight: "600", fontSize: "0.95rem" }}>
            {user?.name || "User"}
          </span>
          <span
            style={{
              color: user?.role === "admin" ? "#ff8ea0" : "#94a3b8",
              fontSize: "0.8rem",
              fontWeight: "600",
            }}
          >
            {user?.role
              ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
              : "User"}
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          style={{
            background: "linear-gradient(90deg, #ef4444, #dc2626)",
            border: "none",
            color: "white",
            padding: "10px 18px",
            borderRadius: "12px",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 8px 20px rgba(239,68,68,0.25)",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;