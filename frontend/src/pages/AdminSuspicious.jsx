import React, { useEffect, useState } from "react";
import api from "../api/api";
import AppLayout from "../components/AppLayout";
import PageActions from "../components/PageActions";

function AdminSuspicious() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchSuspicious = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/admin/suspicious", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching suspicious users:", error);
      }
    };

    fetchSuspicious();
  }, []);

  return (
    <AppLayout>
      <div className="page-shell">
        <div className="glass-card content-card animate__animated animate__fadeIn">
          <PageActions />
          <h1 className="gradient-heading">Suspicious Users</h1>
          <p className="page-subtitle">
            AI-flagged suspicious and high-risk taxpayers.
          </p>

          <div className="stats-grid">
            <div className="glass-card stat-card">
              <div className="stat-label">Flagged Users</div>
              <div className="stat-value" style={{ color: "#ff8ea0" }}>
                {users.length}
              </div>
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
                  <th>Tax Paid</th>
                  <th>Risk Score</th>
                  <th>Risk Level</th>
                  <th>Fraud Result</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>₹ {user.income}</td>
                      <td>₹ {user.taxPaid}</td>
                      <td>{user.score}%</td>
                      <td>
                        <span
                          className={`status-badge ${
                            user.riskLevel === "HIGH RISK"
                              ? "status-danger"
                              : user.riskLevel === "MEDIUM RISK"
                              ? "status-warn"
                              : "status-good"
                          }`}
                        >
                          {user.riskLevel}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`status-badge ${
                            user.fraudResult === "FRAUD"
                              ? "status-danger"
                              : user.fraudResult === "SUSPICIOUS"
                              ? "status-warn"
                              : "status-good"
                          }`}
                        >
                          {user.fraudResult}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">
                      <div className="empty-state">
                        <h4>🚨 No suspicious users found</h4>
                        <p>No users are currently flagged by the AI system.</p>
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

export default AdminSuspicious;