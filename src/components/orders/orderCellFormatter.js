import React from 'react';
import Image from 'next/image';
import { CheckCircleFill, ExclamationCircleFill, StopwatchFill } from 'react-bootstrap-icons';
import { ORDER_STATUS_MAPPING, ORDER_TYPE } from '../../constants/appConstants';
import { currencyImagePaths } from '../../constants/currency';


export const getCurrencyCell = (params) => {
    const { currency } = params.data;
    return <div className="d-flex align-items-center">
        <Image src={currencyImagePaths[currency]} width="18" height="18" alt={currency}/>
        <div className="ms-1 text-white">{currency}</div>
    </div>
}

export const getQuantityCell = (params) => {
    const { orderType, volume } = params.data;

    if (orderType === ORDER_TYPE.BUY) {
        return <span className="positive-value">+{volume}</span>
    } else {
        return <span className="negative-value">-{volume}</span>
    }
}

export const getPriceCell = (params) => {
    return `$ ${params.data.price}`;
}

export const getStatusCell = (params) => {
    const { status } = params.data;

    switch (status) {
        case ORDER_STATUS_MAPPING.IN_PROGRESS:
            return <StopwatchFill className="warning-value" size={16}/>;
        case ORDER_STATUS_MAPPING.COMPLETED:
            return <CheckCircleFill className="positive-value" size={16}/>;
        case ORDER_STATUS_MAPPING.EXPIRED:
            return <ExclamationCircleFill className="negative-value" size={16}/>;
        default:
            return null;
    }
}