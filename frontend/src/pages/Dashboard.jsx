import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <AppLayout>
      <div className="page-shell">
        <div className="dashboard-wrap animate__animated animate__fadeIn">
          <div className="glass-card hero-card">
            <h1 className="gradient-heading">TaxFraudX Control Center</h1>
            <p>
              Welcome back, <strong>{user?.name}</strong>. Monitor your filings,
              invoices, fraud risk, and system records from one place.
            </p>
          </div>

          {/* New Premium Stats Row */}
          <div className="stats-grid">
            <div className="glass-card stat-card">
              <div className="stat-label">Tax Filing</div>
              <div className="stat-value">Active</div>
            </div>

            <div className="glass-card stat-card">
              <div className="stat-label">Invoice Tracking</div>
              <div className="stat-value">Ready</div>
            </div>

            <div className="glass-card stat-card">
              <div className="stat-label">Fraud Analysis</div>
              <div className="stat-value">AI Enabled</div>
            </div>

            <div className="glass-card stat-card">
              <div className="stat-label">User Access</div>
             <div className="stat-value">
  {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "Taxpayer"}
</div>
            </div>
          </div>

          <div className="dashboard-grid">
            <div className="glass-card feature-card">
              <h5>Tax Filing</h5>
              <p>Submit annual income, deductions, and paid tax details.</p>
              <button className="btn-glow mt-3" onClick={() => navigate("/tax")}>
                File Tax
              </button>
            </div>

            <div className="glass-card feature-card">
              <h5>Invoice Upload</h5>
              <p>Upload invoice data for validation and fraud checks.</p>
              <button className="btn-glow mt-3" onClick={() => navigate("/invoice")}>
                Upload Invoice
              </button>
            </div>

            <div className="glass-card feature-card">
              <h5>Tax History</h5>
              <p>Review your previously filed tax return records.</p>
              <button className="btn-glow mt-3" onClick={() => navigate("/tax-history")}>
                View Tax History
              </button>
            </div>

            <div className="glass-card feature-card">
              <h5>Invoice History</h5>
              <p>Track all submitted invoices and validation results.</p>
              <button className="btn-glow mt-3" onClick={() => navigate("/invoice-history")}>
                View Invoice History
              </button>
            </div>

            <div className="glass-card feature-card">
              <h5>Risk Score</h5>
              <p>Check your current fraud risk score and system alerts.</p>
              <button className="btn-glow mt-3" onClick={() => navigate("/risk-score")}>
                Check Risk Score
              </button>
            </div>

            {user?.role === "admin" && (
              <div className="glass-card feature-card">
                <h5>Admin Panel</h5>
                <p>Access centralized records and monitor suspicious users.</p>
                <button className="btn-glow mt-3" onClick={() => navigate("/admin")}>
                  Open Admin Panel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default Dashboard;