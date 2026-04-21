import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AlertBox from "../components/AlertBox";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";

function InvoiceForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    invoiceNumber: "",
    sellerGST: "",
    buyerGST: "",
    amount: ""
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/invoice/create",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Invoice uploaded successfully!");
      setMessageType("success");

      setForm({
        invoiceNumber: "",
        sellerGST: "",
        buyerGST: "",
        amount: ""
      });
    } catch (error) {
      console.error("Invoice upload error:", error.response?.data || error.message);
      setMessage("Failed to upload invoice.");
      setMessageType("error");
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
          {/* Main Invoice Card */}
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
              Upload Invoice
            </h1>

            <p
              style={{
                fontSize: "1.1rem",
                color: "#b8c0e0",
                marginBottom: "2rem",
              }}
            >
              Submit invoice data for GST validation and fraud checks.
            </p>

            {/* Alert Box */}
            {message && (
              <div style={{ marginBottom: "20px" }}>
                <AlertBox
                  message={message}
                  type={messageType}
                  onClose={() => setMessage("")}
                />
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Invoice Number */}
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
                  Invoice Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter invoice number"
                  value={form.invoiceNumber}
                  onChange={(e) =>
                    setForm({ ...form, invoiceNumber: e.target.value })
                  }
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

              {/* Seller GST */}
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
                  Seller GST
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter seller GST"
                  value={form.sellerGST}
                  onChange={(e) =>
                    setForm({ ...form, sellerGST: e.target.value })
                  }
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

              {/* Buyer GST */}
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
                  Buyer GST
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter buyer GST"
                  value={form.buyerGST}
                  onChange={(e) =>
                    setForm({ ...form, buyerGST: e.target.value })
                  }
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

              {/* Amount */}
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
                  Amount
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter invoice amount"
                  value={form.amount}
                  onChange={(e) =>
                    setForm({ ...form, amount: e.target.value })
                  }
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
                Submit Invoice
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceForm;