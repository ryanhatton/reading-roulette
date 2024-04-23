import React, { useState } from 'react';

const Dropdown = ({ label, options, value, onChange, dropdownId }) => {
    const [isActive, setIsActive] = useState(false);

    const handleDropdownItemClick = (optionValue) => {
        onChange(optionValue);
        setIsActive(false);
    };

    // Find the label for the currently selected value
    const selectedLabel = options.find(option => option.value === value)?.label;

    return (
        <div className={`field dropdown ${isActive ? 'is-active' : ''}`}>
            <label className="label" htmlFor={dropdownId}>{label}</label>
            <div className="control">
                <div className="dropdown-trigger">
                    <button
                        className="button is-large"
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
                            <a
                                key={option.value}
                                className="dropdown-item"
                                onClick={() => handleDropdownItemClick(option.value)}
                            >
                                {option.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dropdown;
