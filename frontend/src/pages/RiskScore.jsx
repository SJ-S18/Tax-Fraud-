import React, { useEffect, useState } from "react";
import api from "../api/api";
import AppLayout from "../components/AppLayout";
import PageActions from "../components/PageActions";

const RiskScore = () => {
  const [riskData, setRiskData] = useState(null);

  useEffect(() => {
    const fetchRisk = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/risk/my", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setRiskData(res.data);
      } catch (error) {
        console.error("Error fetching risk score", error);
      }
    };

    fetchRisk();
  }, []);

  return (
    <AppLayout>
      <div className="page-shell">
        <div className="glass-card content-card animate__animated animate__fadeIn">
          <PageActions />

          <h1 className="gradient-heading">AI Fraud Risk Analysis</h1>
          <p className="page-subtitle">
            AI-based fraud prediction for your latest tax filing.
          </p>

          {!riskData ? (
            <div className="empty-state">
              <h4>Loading AI Risk Analysis...</h4>
              <p>Please wait while your fraud risk is being analyzed.</p>
            </div>
          ) : (
            <>
              {/* Top Stats */}
              <div className="row g-4 mb-4">
                <div className="col-md-4">
                  <div className="glass-card p-4 h-100">
                    <h5>Risk Score</h5>
                    <span
                      className={`status-badge ${
                        riskData.riskScore >= 70
                          ? "status-danger"
                          : riskData.riskScore >= 40
                          ? "status-warn"
                          : "status-good"
                      }`}
                      style={{ fontSize: "1.2rem", marginTop: "12px", display: "inline-block" }}
                    >
                      {riskData.riskScore}%
                    </span>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="glass-card p-4 h-100">
                    <h5>Confidence</h5>
                    <h2>{riskData.confidence}%</h2>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="glass-card p-4 h-100">
                    <h5>Risk Level</h5>
                    <h2>{riskData.riskLevel}</h2>
                  </div>
                </div>
              </div>

              {/* Fraud Detection Result */}
              <div className="glass-card p-4 mb-4">
                <h4 className="mb-3">Fraud Detection Result</h4>
                <span
                  className={`status-badge ${
                    riskData.fraudResult === "FRAUD"
                      ? "status-danger"
                      : riskData.fraudResult === "SUSPICIOUS"
                      ? "status-warn"
                      : "status-good"
                  }`}
                  style={{ fontSize: "1rem" }}
                >
                  {riskData.fraudResult}
                </span>
              </div>

              {/* Reasons */}
              <div className="glass-card p-4 mb-4">
                <h4 className="mb-3">Why flagged?</h4>
                <ul>
                  {riskData.reasons?.length > 0 ? (
                    riskData.reasons.map((reason, index) => (
                      <li key={index}>{reason}</li>
                    ))
                  ) : (
                    <li>No suspicious behavior detected.</li>
                  )}
                </ul>
              </div>

              {/* Taxable + Expected */}
              <div className="row g-4 mb-4">
                <div className="col-md-6">
                  <div className="glass-card p-4 h-100">
                    <h5>Taxable Income</h5>
                    <h2>₹ {riskData.taxableIncome}</h2>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="glass-card p-4 h-100">
                    <h5>Expected Tax</h5>
                    <h2>₹ {riskData.expectedTax}</h2>
                  </div>
                </div>
              </div>

              {/* Latest Tax Details */}
              <div className="glass-card p-4">
                <h4 className="mb-3">Latest Tax Details</h4>
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="glass-card p-3 h-100">
                      <span>Income</span>
                      <h5>₹ {riskData.latestTax?.income}</h5>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="glass-card p-3 h-100">
                      <span>Deductions</span>
                      <h5>₹ {riskData.latestTax?.deductions}</h5>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="glass-card p-3 h-100">
                      <span>Tax Paid</span>
                      <h5>₹ {riskData.latestTax?.taxPaid}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default RiskScore;