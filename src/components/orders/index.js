import React, { useEffect, useState } from 'react';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import { dateFormatter, dateComparator, dateComparatorFilter } from "../../utilities/dateTimeUtil";
import { getCurrencyCell, getQuantityCell, getPriceCell, getStatusCell } from './orderCellFormatter';

const Index = ({ tradeHistory }) => {
    const [gridColumnApi, setGridColumnApi] = useState(null),
        defaultColDef = {
            flex: 1,
            minWidth: 75,
            sortable: true,
            resizable: true,
        }

    const onGridReady = (params) => {
        setGridColumnApi(params.columnApi);
    };

    useEffect(() => {
        if (gridColumnApi) {
            gridColumnApi.autoSizeAllColumns();
        }
    }, [gridColumnApi])


    return (
        <div id="order-grid" className="ag-theme-alpine-dark">
            <div className="order-title">Your Orders</div>
            <AgGridReact
                defaultColDef={defaultColDef}
                rowData={Array.isArray(tradeHistory) ? tradeHistory : []}
                onGridReady={onGridReady}
            >
                <AgGridColumn
                    headerName="Date"
                    field="timestamp"
                    valueFormatter={dateFormatter}
                    sort="desc"
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
                    cellRendererFramework={getQuantityCell}
                />
                <AgGridColumn
                    headerName="Price"
                    field="price"
                    valueFormatter={getPriceCell}
                    filter="agNumberColumnFilter"
                />
                <AgGridColumn
                    headerName="Status"
                    field="status"
                    cellRendererFramework={getStatusCell}
                    cellClass="status"
                />
            </AgGridReact>
        </div>
    )
}

export default Index;