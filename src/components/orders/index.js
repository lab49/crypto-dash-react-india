import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Stopwatch, CheckLg, XLg } from 'react-bootstrap-icons';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import { dateFormatter, dateComparator, dateComparatorFilter } from "../../utilities/dateTimeUtil";
import { ORDER_STATUS_MAPPING, ORDER_TYPE } from '../../constants/appConstants';
import { currencyImagePaths } from '../../constants/currency';

const Index = ({ tradeHistory }) => {
    const [gridApi, setGridApi] = useState(null),
        [gridColumnApi, setGridColumnApi] = useState(null),
        defaultColDef = {
            flex: 1,
            minWidth: 100,
            sortable: true,
            resizable: true,
        }

    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    };

    useEffect(() => {
        if (gridColumnApi) {
            gridColumnApi.autoSizeAllColumns();
        }

        if (gridApi) {
            gridApi.setDomLayout('autoHeight');
        }
    }, [gridApi, gridColumnApi])

    const getPriceCell = (params) => {
        const { orderType, price } = params.data;

        if (orderType === ORDER_TYPE.BUY) {
            return <span className="positive-value">+${price}</span>
        } else {
            return <span className="negative-value">-${price}</span>
        }
    }

    const getStyleCell = (params) => {
        const { status } = params.data;

        switch (status) {
            case ORDER_STATUS_MAPPING.IN_PROGRESS:
                return <Stopwatch className="warning-value" />;
            case ORDER_STATUS_MAPPING.COMPLETED:
                return <CheckLg className="positive-value" />;
            case ORDER_STATUS_MAPPING.EXPIRED:
                return <XLg className="negative-value" />;
            default:
                return null;
        }
    }

    const getCurrencyCell = (params) => {
        const { currency } = params.data;
        return <div className="d-flex align-items-center">
            <Image src={currencyImagePaths[currency]} width="24" height="24" alt={currency}/>
            <div className="ms-1 text-white">{currency}</div>
        </div>
    }


    return (
        <div>
            <div className="p-2">Your Orders</div>
            <div id="myGrid" className="ag-theme-alpine-dark text-secondary">
                <AgGridReact
                    defaultColDef={defaultColDef}
                    rowData={Array.isArray(tradeHistory) ? tradeHistory : []}
                    onGridReady={onGridReady}
                    enableCellChangeFlash={true}
                >
                    <AgGridColumn
                        headerName="Date"
                        field="timestamp"
                        valueFormatter={dateFormatter}
                        comparator={dateComparator}
                        filter="agDateColumnFilter"
                        filterParams={{
                            debounceMs: 500,
                            suppressAndOrCondition: true,
                            comparator: dateComparatorFilter,
                        }}
                    />
                    <AgGridColumn
                        headerName="Currency"
                        field="currency"
                        filter="agTextColumnFilter"
                        cellRendererFramework={getCurrencyCell}
                    />
                    <AgGridColumn
                        headerName="Qty"
                        field="volume"
                        filter="agNumberColumnFilter"
                        // maxWidth={50}
                    />
                    <AgGridColumn
                        headerName="Price"
                        field="price"
                        filter="agNumberColumnFilter"
                        cellRendererFramework={getPriceCell}
                    />
                    <AgGridColumn
                        headerName="Status"
                        field="status"
                        filter="agTextColumnFilter"
                        cellRendererFramework={getStyleCell}
                        cellClass="justify-content-center"
                        // maxWidth={50}
                    />
                </AgGridReact>
            </div>
        </div>
    )
}

export default Index;