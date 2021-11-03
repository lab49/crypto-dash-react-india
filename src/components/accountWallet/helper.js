import React from 'react';
import Image from 'next/image';
import { currencyImagePaths } from '../../constants/currency';

export const getCurrencyCell = (params) => {
    const { id, name, symbol } = params.data;
    return <div className="d-flex align-items-center">
        <Image src={currencyImagePaths[id]} width="24" height="24" alt={name}/>
        <div className="ms-1 text-white">{name}</div>
        <div className="ms-1">{symbol}</div>
    </div>
}

export const getAmountCell = (params) => `$ ${params.data.amount}`