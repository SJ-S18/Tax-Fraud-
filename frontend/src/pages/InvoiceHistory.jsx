import { useEffect, useState } from "react";
import api from "../api/api";
import AppLayout from "../components/AppLayout";
import PageActions from "../components/PageActions";

function InvoiceHistory() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await api.get("/invoice/my", {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        });
        setInvoices(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <AppLayout>
      <div className="page-shell">
        <div className="glass-card content-card animate__animated animate__fadeIn">
          <PageActions />

          <h1 className="page-title">Invoice History</h1>
          <p className="page-subtitle">
            Track invoice submissions and validation outcomes.
          </p>

          {invoices.length === 0 ? (
           <div className="empty-state">
  <h4>No records found</h4>
  <p>Your data will appear here after submission.</p>
</div>
          ) : (
            <div className="table-shell">
              <table>
                <thead>
                  <tr>
                    <th>Invoice No</th>
                    <th>Seller GST</th>
                    <th>Buyer GST</th>
                    <th>Amount</th>
                    <th>Duplicate</th>
                    <th>Valid GST</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => (
                    <tr key={inv._id}>
                      <td>{inv.invoiceNumber}</td>
                      <td>{inv.sellerGST}</td>
                      <td>{inv.buyerGST}</td>
                      <td>₹ {inv.amount}</td>
                      <td>
                        <span className={`status-badge ${inv.isDuplicate ? "status-danger" : "status-good"}`}>
                          {inv.isDuplicate ? "Yes" : "No"}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${inv.isValidGST ? "status-good" : "status-warn"}`}>
                          {inv.isValidGST ? "Valid" : "Invalid"}
                        </span>
                      </td>
                      <td>{new Date(inv.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

export default InvoiceHistory;