import Image from "next/image";
import { currencyImagePaths } from "../../../constants/currency";
import React from "react";

const CurrencyRow = ({ id, name, symbol }) => {

    return (
        <div className="currency-row">
            <Image src={currencyImagePaths[id]} width="32" height="32" alt={name}/>
            <div>
                <span className="currency-name">{name}</span>
                <span className="currency-symbol">{symbol}</span>
            </div>
        </div>
    )
}

export default CurrencyRow;