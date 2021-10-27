import { useEffect, useState } from 'react';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import { dateFormatter, dateComparator, dateComparatorFilter } from "../utilities/dateTimeUtil";
import { ORDER_STATUS_MAPPING } from '../constants/appConstants';

const Orders = ({ tradeHistory }) => {
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

    const statusStyleClass = (params) => {
        switch (params.data.status) {
            case ORDER_STATUS_MAPPING.IN_PROGRESS:
                return "bg-warning text-dark";
            case ORDER_STATUS_MAPPING.COMPLETED:
                return "bg-success";
            case ORDER_STATUS_MAPPING.EXPIRED:
                return "bg-danger";
            default:
                return "bg-transparent";
        }
    }

    return (
        <div id="myGrid" className="ag-theme-alpine-dark">
            <h3>Your Orders</h3>
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
                />
                <AgGridColumn
                    headerName="Buy/Sell"
                    field="orderType"
                    filter="agTextColumnFilter"
                />
                <AgGridColumn
                    headerName="Quantity"
                    field="volume"
                    filter="agNumberColumnFilter"
                />
                <AgGridColumn
                    headerName="Price"
                    field="price"
                    filter="agNumberColumnFilter"
                />
                <AgGridColumn
                    headerName="Status"
                    field="status"
                    filter="agTextColumnFilter"
                    cellClass={statusStyleClass}
                />
            </AgGridReact>
        </div>
    )
}

export default Orders;