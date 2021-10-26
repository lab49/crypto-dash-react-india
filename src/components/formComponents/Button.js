import React from 'react'

const Button = ({ className, onClickHandler, children }) => {
    return (
        <button
            className={`btn ${className}`}
            onClick={onClickHandler}
        >
            {children}
        </button>
    )
}

export default Button