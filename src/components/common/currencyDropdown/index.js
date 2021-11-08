import React, { useEffect, useState } from 'react'
import CurrencyRow from "./CurrencyRow";

const CurrencyDropdown = ({ value: selectedValue, onChangeHandler, optionList, keyPrefix }) => {
    const [isOpen, setIsOpen] = useState(false);
    const optionsMap = new Map(optionList.map(option => [option.value, option]));

    const toggleOpen = (event) => {
        event.stopPropagation();
        setIsOpen(prevState => !prevState);
    }

    const closeDropdown = () => {
        setIsOpen(false)
        window.removeEventListener('click', closeDropdown)
    }

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('click', closeDropdown)
        }
    }, [isOpen])

    const getOption = (keyPrefix, { value, label, symbol }) => {
        return (
            <li key={keyPrefix + value}
                className={`dropdown-item ${selectedValue === value ? 'active' : ''}`}
                onClick={() => onChangeHandler(value)}>

                <CurrencyRow id={value} name={label} symbol={symbol}/>
            </li>
        );
    }

    return (
        <div className="dropdown w-100" onClick={toggleOpen}>
            <button
                className="d-flex justify-content-between align-items-center w-100 btn btn-lg dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                {
                    optionsMap ?
                        <CurrencyRow id={selectedValue} name={optionsMap.get(selectedValue).label}
                                     symbol={optionsMap.get(selectedValue).symbol}/>
                        : selectedValue
                }
            </button>
            <ul className={`w-100 dropdown-menu dropdown-menu-dark ${isOpen ? " show" : ""}`}
                aria-labelledby="dropdownMenuButton1"
            >
                {
                    optionList.map(option => getOption(keyPrefix, option))
                }
            </ul>
        </div>
    )
}

export default CurrencyDropdown;