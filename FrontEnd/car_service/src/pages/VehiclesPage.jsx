import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@mui/material";
import api from "../api/api";

const VehiclesPage = () => {
    const [vehicles, setVehicles] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    const [formData, setFormData] = useState({
        vin: "",
        plate_number: "",
        brand: "",
        model: "",
        year: ""
    });

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        const res = await api.get("vehicles/");
        setVehicles(res.data);
    };

    const handleAddVehicle = () => {
        setSelectedVehicle(null);
        setFormData({
            vin: "",
            plate_number: "",
            brand: "",
            model: "",
            year: ""
        });
        setOpenDialog(true);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = async () => {
        try{
            if (selectedVehicle) {
            // Update existing vehicle
                await api.put(`vehicles/${selectedVehicle.id}/`, formData);
            } else {
                // Create new vehicle
                await api.post("vehicles/", formData);
            }
            setOpenDialog(false);
            fetchVehicles(); // reload table
        }
        catch(error) {
            console.error("Error saving vehicle:", error);
            alert("Failed to save vehicle");
        }
    };

    const editVehicle = (vehicle) => {
        setSelectedVehicle(vehicle);
        setFormData(vehicle);
        setOpenDialog(true);
    };

    const deleteVehicle = async (id) => {
        if (!window.confirm("Delete this vehicle?")) return;

        await api.delete(`vehicles/${id}/`);
        fetchVehicles(); // reload table
    };

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
                        onClick={() => editVehicle(params.row)}
                    >
                        Edit
                    </Button>
                    <Button
                        size="small"
                        color="error"
                        onClick={() => deleteVehicle(params.row.id)}
                    >
                        Delete
                    </Button>
                </>
            )
        },
    ];

    return (
        <>
            <Box>
                <Typography variant="h4" sx={{ mb: 2 }}>
                    Vehicles
                </Typography>
                <Button variant="contained" sx={{ mb: 2 }} onClick={handleAddVehicle}>
                    Add Vehicle
                </Button>
                <DataGrid
                    rows={vehicles}
                    columns={columns}
                    pageSize={10}
                    autoHeight
                />
            </Box>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>{selectedVehicle ? "Edit Vehicle" : "Add Vehicle"}</DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>

                    <TextField
                        label="VIN"
                        name="vin"
                        value={formData.vin}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Plate Number"
                        name="plate_number"
                        value={formData.plate_number}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Brand"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Model"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Year"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                    />

                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSave}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default VehiclesPage;