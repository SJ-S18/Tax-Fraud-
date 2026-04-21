import React, { useEffect, useState } from "react";
import api from "../api/api";
import AppLayout from "../components/AppLayout";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    taxes: 0,
    invoices: 0,
    suspicious: "Open Page",
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        // ✅ FAST FIX: Removed /admin/suspicious from dashboard load
        const [users, taxes, invoices] = await Promise.all([
          api.get("/admin/users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get("/admin/tax", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get("/admin/invoices", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setStats({
          users: users.data.length,
          taxes: taxes.data.length,
          invoices: invoices.data.length,
          suspicious: "Open Page",
        });
      } catch (error) {
        console.error("Admin stats error:", error);
      }
    };

    fetchStats();
  }, []);

  // Pie chart data
  const pieData = [
    { name: "Users", value: stats.users },
    { name: "Tax Records", value: stats.taxes },
    { name: "Invoices", value: stats.invoices },
  ];

  // Bar chart data
  const barData = [
    {
      name: "System Data",
      Users: stats.users,
      Taxes: stats.taxes,
      Invoices: stats.invoices,
    },
  ];

  const COLORS = ["#7b4dff", "#1ec8ff", "#22c55e"];

  return (
    <AppLayout>
      <div className="page-shell">
        <div className="dashboard-wrap animate__animated animate__fadeIn">

          {/* HEADER */}
          <div className="glass-card hero-card">
            <h1 className="gradient-heading">Admin Control Center</h1>
            <p>
              Monitor users, tax records, invoices, and suspicious activity
              across the system.
            </p>
          </div>

          {/* STATS */}
          <div className="stats-grid">
            <div className="glass-card stat-card">
              <div className="stat-label">Total Users</div>
              <div className="stat-value">{stats.users}</div>
            </div>

            <div className="glass-card stat-card">
              <div className="stat-label">Tax Records</div>
              <div className="stat-value">{stats.taxes}</div>
            </div>

            <div className="glass-card stat-card">
              <div className="stat-label">Invoices</div>
              <div className="stat-value">{stats.invoices}</div>
            </div>

            <div className="glass-card stat-card">
              <div className="stat-label">Suspicious Cases</div>
              <div
                className="stat-value"
                style={{ color: "#ff8ea0", fontSize: "1.2rem" }}
              >
                {stats.suspicious}
              </div>
            </div>
          </div>

          {/* CHART SECTION */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
              marginTop: "28px",
              marginBottom: "28px",
            }}
          >
            {/* Pie Chart */}
            <div className="glass-card" style={{ padding: "24px", minHeight: "380px" }}>
              <h4 style={{ marginBottom: "20px" }}>System Distribution</h4>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    dataKey="value"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className="glass-card" style={{ padding: "24px", minHeight: "380px" }}>
              <h4 style={{ marginBottom: "20px" }}>System Overview</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="name" stroke="#cbd5e1" />
                  <YAxis stroke="#cbd5e1" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Users" fill="#7b4dff" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="Taxes" fill="#1ec8ff" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="Invoices" fill="#22c55e" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="dashboard-grid">
            <div className="glass-card feature-card">
              <h5>👥 Manage Users</h5>
              <p>View all registered users in the system.</p>
              <a href="/admin/users" className="btn-glow mt-3">Open</a>
            </div>

            <div className="glass-card feature-card">
              <h5>📊 Tax Records</h5>
              <p>Monitor all tax filings submitted by users.</p>
              <a href="/admin/tax-records" className="btn-glow mt-3">Open</a>
            </div>

            <div className="glass-card feature-card">
              <h5>🧾 Invoices</h5>
              <p>Track all invoice submissions and validations.</p>
              <a href="/admin/invoices" className="btn-glow mt-3">Open</a>
            </div>

            <div className="glass-card feature-card">
              <h5>🚨 Suspicious Users</h5>
              <p>AI-detected suspicious or high-risk taxpayers.</p>
              <a href="/admin/suspicious" className="btn-glow mt-3">Open</a>
            </div>
          </div>

        </div>
      </div>
    </AppLayout>
  );
}

export default AdminDashboard;