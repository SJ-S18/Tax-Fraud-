import React, { useEffect, useState } from "react";
import api from "../api/api";
import AppLayout from "../components/AppLayout";
import PageActions from "../components/PageActions";

function AdminInvoices() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/admin/invoices", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInvoices(res.data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <AppLayout>
      <div className="page-shell">
        <div className="glass-card content-card animate__animated animate__fadeIn">
          <PageActions />
          <h1 className="gradient-heading">All Invoices</h1>
          <p className="page-subtitle">
            Review invoice submissions and GST validation results.
          </p>

          <div className="stats-grid">
            <div className="glass-card stat-card">
              <div className="stat-label">Total Invoices</div>
              <div className="stat-value">{invoices.length}</div>
            </div>
          </div>

          <div className="table-shell">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Invoice No.</th>
                  <th>Amount</th>
                  <th>Duplicate</th>
                  <th>GST Status</th>
                </tr>
              </thead>
              <tbody>
                {invoices.length > 0 ? (
                  invoices.map((invoice, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{invoice.userId?.name}</td>
                      <td>{invoice.userId?.email}</td>
                      <td>{invoice.invoiceNumber}</td>
                      <td>₹ {invoice.amount}</td>
                      <td>
                        <span
                          className={`status-badge ${
                            invoice.isDuplicate ? "status-danger" : "status-good"
                          }`}
                        >
                          {invoice.isDuplicate ? "Duplicate" : "Unique"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`status-badge ${
                            invoice.isValidGST ? "status-good" : "status-danger"
                          }`}
                        >
                          {invoice.isValidGST ? "Valid" : "Invalid"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">
                      <div className="empty-state">
                        <h4>🧾 No invoices found</h4>
                        <p>No invoice records are available yet.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default AdminInvoices;