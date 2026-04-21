import React, { useEffect, useState } from "react";
import api from "../api/api";
import AppLayout from "../components/AppLayout";
import PageActions from "../components/PageActions";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <AppLayout>
      <div className="page-shell">
        <div className="glass-card content-card animate__animated animate__fadeIn">
          <PageActions />
          <h1 className="gradient-heading">Total Users</h1>
          <p className="page-subtitle">
            All registered users in the TaxFraudX system.
          </p>

          <div className="stats-grid">
            <div className="glass-card stat-card">
              <div className="stat-label">Registered Users</div>
              <div className="stat-value">{users.length}</div>
            </div>
          </div>

          <div className="table-shell">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span
                          className={`status-badge ${
                            user.role === "admin" ? "status-danger" : "status-good"
                          }`}
                        >
                          {user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">
                      <div className="empty-state">
                        <h4>👥 No users found</h4>
                        <p>No registered users available yet.</p>
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

export default AdminUsers;