import React, { useEffect, useState } from "react";
import api from "../api/api";
import AppLayout from "../components/AppLayout";
import PageActions from "../components/PageActions";

function AdminTaxRecords() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchTaxRecords = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/admin/tax", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecords(res.data);
      } catch (error) {
        console.error("Error fetching tax records:", error);
      }
    };

    fetchTaxRecords();
  }, []);

  return (
    <AppLayout>
      <div className="page-shell">
        <div className="glass-card content-card animate__animated animate__fadeIn">
          <PageActions />
          <h1 className="gradient-heading">All Tax Records</h1>
          <p className="page-subtitle">
            Monitor all tax filings submitted by users.
          </p>

          <div className="stats-grid">
            <div className="glass-card stat-card">
              <div className="stat-label">Total Tax Filings</div>
              <div className="stat-value">{records.length}</div>
            </div>
          </div>

          <div className="table-shell">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Income</th>
                  <th>Deductions</th>
                  <th>Tax Paid</th>
                </tr>
              </thead>
              <tbody>
                {records.length > 0 ? (
                  records.map((tax, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{tax.userId?.name}</td>
                      <td>{tax.userId?.email}</td>
                      <td>₹ {tax.income}</td>
                      <td>₹ {tax.deductions}</td>
                      <td>₹ {tax.taxPaid}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">
                      <div className="empty-state">
                        <h4>📄 No tax records found</h4>
                        <p>No tax filings are available yet.</p>
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

export default AdminTaxRecords;