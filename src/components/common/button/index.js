import React from 'react'

const Button = (props) => {
    const { className, onClickHandler, children, disabled} = props
    return (
        <button
            className={`btn ${className}`}
            onClick={onClickHandler}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button