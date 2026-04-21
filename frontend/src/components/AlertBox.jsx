import React from "react";

function AlertBox({ type = "success", message }) {
  return (
    <div
      className={`alert ${
        type === "success" ? "alert-success" : "alert-danger"
      } mb-4`}
      style={{
        borderRadius: "14px",
        fontWeight: "600",
        background:
          type === "success"
            ? "rgba(25, 135, 84, 0.18)"
            : "rgba(220, 53, 69, 0.18)",
        color: type === "success" ? "#75ffb5" : "#ff8fa3",
        border:
          type === "success"
            ? "1px solid rgba(25, 135, 84, 0.35)"
            : "1px solid rgba(220, 53, 69, 0.35)",
      }}
    >
      {message}
    </div>
  );
}

export default AlertBox;