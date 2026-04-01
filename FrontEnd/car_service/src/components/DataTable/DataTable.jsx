import { DataGrid } from "@mui/x-data-grid";

const DataTable = ({
    rows,
    columns,
    loading,
    page,
    pageSize,
    rowCount,
    onPageChange,
    onPageSizeChange,
    sortModel,
    onSortModelChange,
}) => {
    return (
        <DataGrid
            rows={rows}
            columns={columns}
            autoHeight
            loading={loading}

            pagination
            paginationMode="server"

            sortingMode="server"

            rowCount={rowCount}

            page={page}
            pageSize={pageSize}

            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}

            sortModel={sortModel}
            onSortModelChange={onSortModelChange}
        />
    );
};

export default DataTable;