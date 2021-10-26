import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

const Orders = ({ tradeHistory }) => {
    const [gridApi, setGridApi] = useState(null),
        [gridColumnApi, setGridColumnApi] = useState(null),
        columnDefs = [
            { headerName: 'Date', field: 'date', sortable: true },
            { headerName: 'Currency', field: 'currency', sortable: true },
            { headerName: 'Quantity', field: 'volume', sortable: true },
            { headerName: 'Price', field: 'price', sortable: true },
            { headerName: 'Status', field: 'status', sortable: true }
        ]

    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    };

    useEffect(() => {
        if (gridColumnApi) {
            let allColumnIds = [];
            gridColumnApi.getAllColumns().forEach(function (column) {
                allColumnIds.push(column.colId);
            });
            gridColumnApi.autoSizeColumns(allColumnIds);
        }

        if (gridApi) {
            gridApi.setDomLayout('autoHeight');
        }
    }, [gridApi, gridColumnApi])


    return (
        <div id="myGrid" className="ag-theme-alpine-dark">
            <h3>Your Orders</h3>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={Array.isArray(tradeHistory) ? tradeHistory : []}
                onGridReady={onGridReady}
            />
        </div>
    )
}

export default Orders;