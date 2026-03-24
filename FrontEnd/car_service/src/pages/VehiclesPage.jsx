import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import api from "../api/api";
import VehicleDialog from "../components/VehicleDialog";
import VehiclesTable from "../components/VehiclesTable";

const VehiclesPage = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0); // to trigger table refresh

    const [formData, setFormData] = useState({
        vin: "",
        plate_number: "",
        brand: "",
        model: "",
        year: ""
    });

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

    const handleEdit = (vehicle) => {
        setSelectedVehicle(vehicle);
        setFormData({
            vin: vehicle.vin,
            plate_number: vehicle.plate_number,
            brand: vehicle.brand,
            model: vehicle.model,
            year: vehicle.year
        }); // pre-fill form with existing data, id not included because backend may reject it
        setOpenDialog(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this vehicle?")) return;
        await api.delete(`vehicles/${id}/`);
        setRefreshTrigger(prev => prev + 1); // refresh
    };

    const handleSave = async () => {
        try {
            if (selectedVehicle) {
            // Update existing vehicle
                await api.put(`vehicles/${selectedVehicle.id}/`, formData);
            } else {
            // Create new vehicle
                await api.post("vehicles/", formData);
            }
            setOpenDialog(false);
            setRefreshTrigger(prev => prev + 1); // refresh
        }
        catch(error) {
            console.log("BACKEND ERROR:", error.response?.data);
            console.error("Error saving vehicle:", error);
            alert("Failed to save vehicle");
        }
    };

    return (
        <>
            <Box>
                <Typography variant="h4" sx={{ mb: 2 }}>
                    Vehicles
                </Typography>
                <Button variant="contained" sx={{ mb: 2 }} onClick={handleAddVehicle}>
                    Add Vehicle
                </Button>
                <VehiclesTable
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    refreshTrigger={refreshTrigger} // pass trigger to table
                />

                <VehicleDialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    formData={formData}
                    setFormData={setFormData}
                    onSave={handleSave}
                    isEdit={!!selectedVehicle}
                />
            </Box>
        </>
    );
};

export default VehiclesPage;