import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

const VehiclesTable = ({ vehicles, loading, onEdit, onDelete }) => {
    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "vin", headerName: "VIN", width: 200 },
        { field: "plate_number", headerName: "Plate", width: 120 },
        { field: "brand", headerName: "Brand", width: 150 },
        { field: "model", headerName: "Model", width: 150 },
        { field: "year", headerName: "Year", width: 120 },
        {
            field: "actions",
            headerName: "Actions",
            width: 200,
            renderCell: (params) => (
                <>
                    <Button
                        size="small"
                        onClick={() => onEdit(params.row)}
                    >
                        Edit
                    </Button>
                    <Button
                        size="small"
                        color="error"
                        onClick={() => onDelete(params.row.id)}
                    >
                        Delete
                    </Button>
                </>
            )
        },
    ];

    return (
        <DataGrid
            rows={vehicles}
            columns={columns}
            pageSize={10}
            autoHeight
            loading={loading}
        />
    );
};

export default VehiclesTable;