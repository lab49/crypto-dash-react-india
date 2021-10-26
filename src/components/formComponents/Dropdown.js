import React from 'react'

const Dropdown = ({value, onChangeHandler, optionList, className}) => {

    return (
        <select
            className={`form-select ${className}`}
            onChange={(event) => onChangeHandler(event.target.value)}
            value={value}
        >
            {
                optionList.map(({ label, value }) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))
            }
        </select>
    )
}

export default Dropdown;