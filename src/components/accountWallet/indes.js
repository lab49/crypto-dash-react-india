import React, { useEffect, useState } from 'react';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import { getWalletCurrencyList } from '../../services/currencyService';
import { getCurrencyCell, getAmountCell } from './helper';

const AccountWallet = () => {
    const [currencyList, setCurrencyList] = useState([]);
    const defaultColDef = {
        flex: 1,
        minWidth: 150,
        sortable: true,
        resizable: true,
    }

    useEffect(() => {
        getWalletCurrencyList()
            .then((info) => setCurrencyList(info));
    }, [])

    return (
        <div className="wallet-list">
            <div className="grid-title">Wallet</div>
            <div className="my-grid ag-theme-alpine-dark">
                <AgGridReact
                    defaultColDef={defaultColDef}
                    rowData={currencyList}
                >
                    <AgGridColumn
                        headerName="Currency"
                        field="name"
                        cellRendererFramework={getCurrencyCell}
                    />
                    <AgGridColumn
                        headerName="Total Quantity"
                        field="quantity"
                    />
                    <AgGridColumn
                        headerName="Amount"
                        field="amount"
                        sort={"desc"}
                        valueFormatter={getAmountCell}
                    />
                </AgGridReact>
            </div>
        </div>
    )
}

export default AccountWallet;