import { useState } from "react";
import api from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import AlertBox from "../components/AlertBox";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", form);

      setMessage("Registration successful! Redirecting to login...");
      setMessageType("success");

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (error) {
      setMessage("Registration failed. Please try again.");
      setMessageType("error");
      console.log(error);
    }
  };

  return (
    <div className="center-wrap">
      <div className="glass-card auth-card animate__animated animate__fadeInUp">
        <h1 className="page-title">Create Account</h1>
        <p className="page-subtitle">
          Register to file tax returns, upload invoices, and monitor fraud risk.
        </p>

        <AlertBox message={message} type={messageType} />

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              className="form-control"
              placeholder="Create a password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button type="submit" className="btn-glow">
            Register
          </button>
        </form>

        <p className="text-center mt-4 muted">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;