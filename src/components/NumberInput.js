import React from "react";

export default function NumberInput({ label, id, max, min, value, onChange }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        id={id}
        type="number"
        name={id}
        max={max}
        min={min}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
