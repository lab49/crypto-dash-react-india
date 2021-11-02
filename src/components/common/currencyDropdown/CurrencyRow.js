import Image from "next/image";
import { currencyImagePaths } from "../../../constants/currency";
import React from "react";

const CurrencyRow = ({id, name, symbol}) => {

    return (
        <div className="d-inline-flex align-items-center">
            <span className="">
                <Image src={currencyImagePaths[id]} width="32" height="32" alt={name}/>
            </span>
            <span className="h3 pl-2">{name}</span>
            <span className={"pl-2 small"}>{symbol}</span>
        </div>
    )
}

export default CurrencyRow;