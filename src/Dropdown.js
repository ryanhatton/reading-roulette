import React, { useState } from "react";

const Dropdown = ({ options, value, onChange, dropdownId }) => {
  const [isActive, setIsActive] = useState(false);

  const handleDropdownItemClick = (optionValue) => {
    onChange(optionValue);
    setIsActive(false);
  };

  // Find the label for the currently selected value
  const selectedLabel = options.find((option) => option.value === value)?.label;

  return (
    <div className={`field dropdown ${isActive ? "is-active" : ""}`}>
      <div className="control">
        <div className="dropdown-trigger">
          <button
            className="button is-medium"
            aria-haspopup="true"
            aria-controls={dropdownId}
            onClick={() => setIsActive(!isActive)}
          >
            <span>{selectedLabel}</span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id={dropdownId} role="menu">
          <div className="dropdown-content">
            {options.map((option) => (
              <button
                key={option.value}
                className="dropdown-item"
                onClick={() => handleDropdownItemClick(option.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleDropdownItemClick(option.value);
                }}
                type="button" 
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
