import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import useDataTable from "../../hooks/useDataTable";

const UsersTable = ({ onEdit, onDelete, initialPageSize = 10 }) => {

    const {
        rows,
        loading,
        page,
        setPage,
        pageSize,
        setPageSize,
        rowCount,
        sortModel,
        setSortModel,
    } = useDataTable({
        endpoint: "users/",
        initialPageSize
    });

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "username", headerName: "Username", width: 150 },
        { field: "email", headerName: "Email", width: 200 },
        { field: "phone_number", headerName: "Phone", width: 150 },
        { field: "role", headerName: "Role", width: 120 },
    ];

    if (onEdit || onDelete) {
        columns.push({
            field: "actions",
            headerName: "Actions",
            width: 200,
            renderCell: (params) => (
                <>
                    {onEdit && (
                        <Button size="small" onClick={() => onEdit(params.row)}>
                            Edit
                        </Button>
                    )}
                    {onDelete && (
                        <Button
                            size="small"
                            color="error"
                            onClick={() => onDelete(params.row.id)}
                        >
                            Delete
                        </Button>
                    )}
                </>
            )
        });
    }

    return (
        <>
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
                onPageChange={setPage}
                onPageSizeChange={setPageSize}
                sortModel={sortModel}
                onSortModelChange={setSortModel}
            />
        </>
    );
};

export default UsersTable;