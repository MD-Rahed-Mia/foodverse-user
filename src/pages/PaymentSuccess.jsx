import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function PaymentStatus() {
  const location = useLocation();
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const paymentStatus = queryParams.get("payment");
    setStatus(paymentStatus);
  }, [location]);

  const isSuccess = status === "success";

  if (status === null) {
    return (
      <div style={styles.container}>
        <p style={styles.message}>Checking payment status...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        ...styles.container,
        backgroundColor: isSuccess ? "#d1fae5" : "#fee2e2",
        borderColor: isSuccess ? "#10b981" : "#ef4444",
      }}
    >
      <div style={styles.icon}>{isSuccess ? "✅" : "❌"}</div>
      <h2 style={{ ...styles.title, color: isSuccess ? "#065f46" : "#991b1b" }}>
        {isSuccess ? "Payment Successful!" : "Payment Failed"}
      </h2>
      <p style={styles.message}>
        {isSuccess
          ? "Your payment was completed successfully."
          : "There was an issue with your payment. Please try again."}
      </p>
    </div>
  );
}

const styles = {
  container: {
    margin: "100px auto",
    maxWidth: "80%",
    padding: "30px",
    borderRadius: "12px",
    border: "2px solid",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  icon: {
    fontSize: "50px",
    marginBottom: "20px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  message: {
    marginTop: "10px",
    color: "#4b5563",
  },
};

export default PaymentStatus;
