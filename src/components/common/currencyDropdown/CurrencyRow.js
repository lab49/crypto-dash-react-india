import Image from "next/image";
import { currencyImagePaths } from "../../../constants/currency";
import React from "react";

const CurrencyRow = ({id, name, symbol}) => {

    return (
        <div className="d-inline-flex align-items-center currency-row">
            <span className="currency-image">
                <Image src={currencyImagePaths[id]} width="32" height="32" alt={name}/>
            </span>
            <span className="h3 pl-2 currency-name">{name}</span>
            <span className={"pl-2 small currency-symbol"}>{symbol}</span>
        </div>
    )
}

export default CurrencyRow;