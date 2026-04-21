import { useEffect, useState } from "react";
import api from "../api/api";
import AppLayout from "../components/AppLayout";
import PageActions from "../components/PageActions";

function TaxHistory() {
  const [taxRecords, setTaxRecords] = useState([]);

  useEffect(() => {
    const fetchTaxRecords = async () => {
      try {
        const res = await api.get("/tax/my", {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        });
        setTaxRecords(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTaxRecords();
  }, []);

  return (
    <AppLayout>
      <div className="page-shell">
        <div className="glass-card content-card animate__animated animate__fadeIn">
          <PageActions />

          <h1 className="page-title">Tax Filing History</h1>
          <p className="page-subtitle">
            Review all your submitted tax records in one place.
          </p>

          {taxRecords.length === 0 ? (
            <div className="empty-state">
  <h4>No records found</h4>
  <p>Your data will appear here after submission.</p>
</div>
          ) : (
            <div className="table-shell">
              <table>
                <thead>
                  <tr>
                    <th>Income</th>
                    <th>Tax Paid</th>
                    <th>Deductions</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {taxRecords.map((tax) => (
                    <tr key={tax._id}>
                      <td>₹ {tax.income}</td>
                      <td>₹ {tax.taxPaid}</td>
                      <td>₹ {tax.deductions}</td>
                      <td>{new Date(tax.createdAt).toLocaleDateString()}</td>
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

export default TaxHistory;