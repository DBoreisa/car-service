import { useState, useEffect, useCallback } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Box, TextField } from "@mui/material";
import api from "../../api/api";

const VehiclesTable = ({ 
    onEdit, 
    onDelete, 
    refreshTrigger,
    pageSize = 15,
}) => {

    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(false);

    const [filters, setFilters] = useState({
        search: "",
        year: ""
    });

    const fetchVehicles = useCallback (async () => {
        const params = {limit: pageSize};

        setLoading(true);

        if (filters.search) params.search = filters.search;
        if (filters.year) params.year = filters.year;
        
        const res = await api.get("vehicles/", { params });
        setVehicles(res.data);
        setLoading(false);
    }, [filters, pageSize]);

    useEffect(() => { 
        fetchVehicles(); 
    }, [fetchVehicles, refreshTrigger]); // also refetch when trigger changes

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
        <>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                    label="Search"
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />

                <TextField
                    label="Year"
                    type="number"
                    value={filters.year}
                    onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                />

            </Box>
            <DataGrid
                rows={vehicles}
                columns={columns}
                pageSize={pageSize}
                autoHeight
                loading={loading}
            />
        </>
    );
};

export default VehiclesTable;