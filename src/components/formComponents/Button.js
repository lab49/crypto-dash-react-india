import React from 'react'

const Button = ({ className, onClickHandler, children, disabled}) => {
    return (
        <button
            className={`btn ${className}`}
            onClick={onClickHandler}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button