import { useState, useEffect } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AlertBox from "../components/AlertBox";
import "bootstrap/dist/css/bootstrap.min.css";

const TaxForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    income: "",
    deductions: "",
    declaredTaxPaid: "",
  });

  const [expectedTax, setExpectedTax] = useState(0);
  const [alert, setAlert] = useState({ message: "", type: "" });

  // Auto tax calculator
  useEffect(() => {
    const income = Number(formData.income) || 0;
    const deductions = Number(formData.deductions) || 0;

    const taxableIncome = Math.max(income - deductions, 0);
    let tax = 0;

    if (taxableIncome <= 250000) {
      tax = 0;
    } else if (taxableIncome <= 500000) {
      tax = (taxableIncome - 250000) * 0.05;
    } else if (taxableIncome <= 1000000) {
      tax = 12500 + (taxableIncome - 500000) * 0.2;
    } else {
      tax = 112500 + (taxableIncome - 1000000) * 0.3;
    }

    setExpectedTax(Math.round(tax));
  }, [formData.income, formData.deductions]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/tax/file",
        {
          income: Number(formData.income),
          deductions: Number(formData.deductions),
          taxPaid: Number(formData.declaredTaxPaid),
          expectedTax: expectedTax,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAlert({ message: "Tax filed successfully!", type: "success" });

      // Reset form after submit
      setFormData({
        income: "",
        deductions: "",
        declaredTaxPaid: "",
      });

      setExpectedTax(0);
    } catch (error) {
      console.error("Tax filing error:", error.response?.data || error.message);
      setAlert({ message: "Failed to file tax.", type: "error" });
    }
  };

  return (
    <div
      className="app-layout"
      style={{ display: "flex", minHeight: "100vh", overflow: "hidden" }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Navbar />

        <div
          style={{
            flex: 1,
            padding: "20px 40px 30px 40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            overflowY: "auto",
          }}
        >
          {/* Main Tax Card */}
          <div
  className="glass-card animate__animated animate__fadeInUp"
            style={{
              width: "100%",
              maxWidth: "900px",
              padding: "2.5rem",
              borderRadius: "28px",
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
              overflow: "visible",
            }}
          >
            {/* Buttons INSIDE card */}
            <div
              style={{
                display: "flex",
                gap: "14px",
                marginBottom: "20px",
                flexWrap: "wrap",
              }}
            >
              <button
                className="btn btn-outline-light"
                onClick={() => navigate(-1)}
                style={{ borderRadius: "14px", padding: "10px 18px" }}
              >
                ← Back
              </button>

              <button
                className="btn btn-outline-light"
                onClick={() => navigate("/dashboard")}
                style={{ borderRadius: "14px", padding: "10px 18px" }}
              >
                🏠 Home
              </button>
            </div>

            <h1
              style={{
                fontSize: "3rem",
                fontWeight: "800",
                color: "#ffffff",
                marginBottom: "0.8rem",
              }}
            >
              File Tax Return
            </h1>

            <p
              style={{
                fontSize: "1.1rem",
                color: "#b8c0e0",
                marginBottom: "2rem",
              }}
            >
              Submit your financial details for secure tax filing.
            </p>

            {/* Alert Box */}
            {alert.message && (
              <div style={{ marginBottom: "20px" }}>
                <AlertBox
                  message={alert.message}
                  type={alert.type}
                  onClose={() => setAlert({ message: "", type: "" })}
                />
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Annual Income */}
              <div className="mb-4">
                <label
                  className="form-label"
                  style={{
                    color: "#ffffff",
                    fontWeight: "600",
                    marginBottom: "0.7rem",
                    fontSize: "1.1rem",
                  }}
                >
                  Annual Income
                </label>
                <input
                  type="number"
                  name="income"
                  className="form-control"
                  placeholder="Enter annual income"
                  value={formData.income}
                  onChange={handleChange}
                  required
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#fff",
                    padding: "16px 18px",
                    borderRadius: "18px",
                    fontSize: "1.05rem",
                  }}
                />
              </div>

              {/* Deductions */}
              <div className="mb-4">
                <label
                  className="form-label"
                  style={{
                    color: "#ffffff",
                    fontWeight: "600",
                    marginBottom: "0.7rem",
                    fontSize: "1.1rem",
                  }}
                >
                  Deductions
                </label>
                <input
                  type="number"
                  name="deductions"
                  className="form-control"
                  placeholder="Enter deductions"
                  value={formData.deductions}
                  onChange={handleChange}
                  required
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#fff",
                    padding: "16px 18px",
                    borderRadius: "18px",
                    fontSize: "1.05rem",
                  }}
                />
              </div>

              {/* Expected Tax */}
              <div className="mb-4">
                <label
                  className="form-label"
                  style={{
                    color: "#ffffff",
                    fontWeight: "600",
                    marginBottom: "0.7rem",
                    fontSize: "1.1rem",
                  }}
                >
                  Expected Tax (Auto Calculated)
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={expectedTax}
                  readOnly
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#fff",
                    padding: "16px 18px",
                    borderRadius: "18px",
                    fontSize: "1.05rem",
                  }}
                />
              </div>

              {/* Declared Tax Paid */}
              <div className="mb-4">
                <label
                  className="form-label"
                  style={{
                    color: "#ffffff",
                    fontWeight: "600",
                    marginBottom: "0.7rem",
                    fontSize: "1.1rem",
                  }}
                >
                  Declared Tax Paid
                </label>
                <input
                  type="number"
                  name="declaredTaxPaid"
                  className="form-control"
                  placeholder="Enter declared tax paid"
                  value={formData.declaredTaxPaid}
                  onChange={handleChange}
                  required
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#fff",
                    padding: "16px 18px",
                    borderRadius: "18px",
                    fontSize: "1.05rem",
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn w-100"
                style={{
                  background: "linear-gradient(90deg, #7b4dff, #1ec8ff)",
                  border: "none",
                  color: "white",
                  padding: "16px",
                  borderRadius: "18px",
                  fontSize: "1.1rem",
                  fontWeight: "700",
                  boxShadow: "0 10px 30px rgba(30, 200, 255, 0.25)",
                  marginTop: "10px",
                }}
              >
                Submit Tax Filing
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxForm;