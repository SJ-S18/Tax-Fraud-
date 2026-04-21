import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const res = await api.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ HARD ROLE-BASED REDIRECT (prevents old dashboard flicker)
      if (res.data.user.role === "admin") {
        window.location.replace("/admin");
      } else {
        window.location.replace("/dashboard");
      }
    } catch (err) {
      setLoading(false);
      setMessage("Invalid credentials");
      setMessageType("error");
      console.error("Login error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="center-wrap">
      <div className="glass-card auth-card animate__animated animate__fadeInUp">
        <h1 className="gradient-heading mb-3">Welcome Back</h1>
        <p className="page-subtitle mb-4">
          Login to access your TaxFraudX dashboard.
        </p>

        {message && (
          <div
            className={`toast-box ${
              messageType === "success" ? "toast-success" : "toast-error"
            }`}
            style={{ position: "static", marginBottom: "16px" }}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-glow" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center muted">
          Don’t have an account?{" "}
          <Link to="/register" style={{ fontWeight: "600" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;