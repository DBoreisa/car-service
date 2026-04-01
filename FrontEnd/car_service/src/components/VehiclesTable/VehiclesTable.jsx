import { useState, useEffect, useCallback } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Box, TextField } from "@mui/material";
import api from "../../api/api";

const VehiclesTable = ({ 
    onEdit, 
    onDelete, 
    refreshTrigger,
    initialPageSize = 10
}) => {

    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0); // DataGrid is 0-based
    const [pageSize, setPageSize] = useState(initialPageSize); 
    const [rowCount, setRowCount] = useState(0); 
    const [sortModel, setSortModel] = useState([]);

    const [filters, setFilters] = useState({
        search: "",
        year: ""
    });

    const fetchVehicles = useCallback (async () => {
        setLoading(true);
        try {
            const params = {
                page: page + 1, // backend is 1-based
                page_size: pageSize
            };

            if (filters.search) params.search = filters.search;
            if (filters.year) params.year = filters.year;
            
            if (sortModel.length > 0) {
                const sort = sortModel[0];
                params.ordering = 
                    sort.sort === "asc"
                        ? sort.field
                        : `-${sort.field}`;
            }

            const res = await api.get("vehicles/", { params });

            setVehicles(res.data.results);
            setRowCount(res.data.count);
        } catch (error) {
            console.error("Failed to fetch vehicles:", error);
        } finally {
            setLoading(false);
        }
    }, [page, pageSize, filters, sortModel]);

    // Reset page when filters change
    useEffect(() => {
        setPage(0);
    }, [filters, pageSize, sortModel]);

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "vin", headerName: "VIN", width: 200 },
        { field: "plate_number", headerName: "Plate", width: 120 },
        { field: "brand", headerName: "Brand", width: 150 },
        { field: "model", headerName: "Model", width: 150 },
        { field: "year", headerName: "Year", width: 120 },
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

    useEffect(() => {
        fetchVehicles();
    }, [fetchVehicles, refreshTrigger]);
    
    return (
        <>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                    label="Search"
                    value={filters.search}
                    onChange={(e) =>
                        setFilters(prev => ({
                            ...prev,
                            search: e.target.value
                        }))
                    }
                />

                <TextField
                    label="Year"
                    type="number"
                    value={filters.year}
                    onChange={(e) =>
                        setFilters(prev => ({
                            ...prev,
                            year: e.target.value
                        }))
                    }
                />

            </Box>
            <DataGrid
                rows={vehicles}
                columns={columns}
                autoHeight
                loading={loading}
                pagination
                paginationMode="server"
                sortingMode="server"
                rowCount={rowCount}
                page={page}
                pageSize={pageSize}
                onPageChange={(newPage) => setPage(newPage)}
                onPageSizeChange={(newSize) => setPageSize(newSize)}
                sortModel={sortModel}
                onSortModelChange={(model) => setSortModel(model)}
            />
        </>
    );
};

export default VehiclesTable;