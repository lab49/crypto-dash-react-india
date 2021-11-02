import React from 'react'

const Input = ({ type, className, value, onChangeHandler, ...inputAttr }) => {
    return (
        <input
            type={type}
            className={`form-control ${className}`}
            value={value}
            onChange={onChangeHandler}
            {...inputAttr}
        />
    )
}

export default Input