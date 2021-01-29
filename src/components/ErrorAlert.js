import React from "react";

export default function ErrorAlert({ error }) {
  return (
    <div className="error-container">
      <p className="error">{error}</p>
    </div>
  );
}
