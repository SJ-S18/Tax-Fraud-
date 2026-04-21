from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def calculate_expected_tax(income, deductions):
    taxable_income = max(income - deductions, 0)
    tax = 0

    if taxable_income <= 250000:
        tax = 0
    elif taxable_income <= 500000:
        tax = (taxable_income - 250000) * 0.05
    elif taxable_income <= 1000000:
        tax = (250000 * 0.05) + (taxable_income - 500000) * 0.20
    else:
        tax = (250000 * 0.05) + (500000 * 0.20) + (taxable_income - 1000000) * 0.30

    return round(tax, 2), taxable_income

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    income = float(data.get("income", 0))
    deductions = float(data.get("deductions", 0))
    tax_paid = float(data.get("tax_paid", 0))
    filing_history = int(data.get("filing_history", 1))
    previous_audit = int(data.get("previous_audit", 0))

    expected_tax, taxable_income = calculate_expected_tax(income, deductions)

    risk_score = 0
    reasons = []

    # Rule 1: Very high deductions
    if income > 0 and deductions / income > 0.4:
        risk_score += 35
        reasons.append("Deductions are unusually high compared to income.")

    # Rule 2: Declared tax is too low compared to expected tax
    if expected_tax > 0 and tax_paid < expected_tax * 0.5:
        risk_score += 40
        reasons.append("Declared tax paid is much lower than expected tax.")

    # Rule 3: No/poor filing history
    if filing_history == 0:
        risk_score += 10
        reasons.append("No proper filing history found.")

    # Rule 4: Previous audit exists
    if previous_audit == 1:
        risk_score += 15
        reasons.append("Previous audit history increases suspicion.")

    # Final limits
    risk_score = min(risk_score, 100)
    confidence = min(risk_score + 10, 100)

    if risk_score >= 70:
        risk_level = "HIGH RISK"
        fraud_result = "FRAUD"
    elif risk_score >= 40:
        risk_level = "MEDIUM RISK"
        fraud_result = "SUSPICIOUS"
    else:
        risk_level = "LOW RISK"
        fraud_result = "SAFE"

    if not reasons:
        reasons.append("No suspicious behavior detected.")

    return jsonify({
        "fraudResult": fraud_result,
        "riskScore": risk_score,
        "confidence": confidence,
        "riskLevel": risk_level,
        "expectedTax": expected_tax,
        "taxableIncome": taxable_income,
        "reasons": reasons
    })

if __name__ == "__main__":
    app.run(port=5001, debug=True)