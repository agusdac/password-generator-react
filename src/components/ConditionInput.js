import React from "react";

export default function ConditionInput({ label, id, value, onChange }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        id={id}
        type="checkbox"
        name={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
