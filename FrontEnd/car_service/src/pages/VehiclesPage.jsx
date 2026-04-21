import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import api from "../api/api";
import FormDialog from "../components/FormDialog";
import VehiclesTable from "../components/VehiclesTable";

const VehiclesPage = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0); // to trigger table refresh
    const initialVehicleData = {
        vin: "",
        plate_number: "",
        brand: "",
        model: "",
        year: ""
    };

    const [formData, setFormData] = useState(initialVehicleData);

    const vehicleFields = [
        { name: "vin", label: "VIN", sx: { mt: 2 } },
        { name: "plate_number", label: "Plate Number" },
        { name: "brand", label: "Brand" },
        { name: "model", label: "Model" },
        { name: "year", label: "Year", type: "number" },
    ];

    const handleAddVehicle = () => {
        setSelectedVehicle(null);
        setFormData(initialVehicleData); // reset form for new entry
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
            handleClose();
            setRefreshTrigger(prev => prev + 1); // refresh
        }
        catch(error) {
            console.log("BACKEND ERROR:", error.response?.data);
            console.error("Error saving vehicle:", error);
            alert("Failed to save vehicle");
        }
    };

    const handleClose = () => {
        setOpenDialog(false);
        setSelectedVehicle(null);
        setFormData(initialVehicleData); // reset form on close
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

                <FormDialog
                    open={openDialog}
                    onClose={handleClose}
                    formData={formData}
                    setFormData={setFormData}
                    onSave={handleSave}
                    isEdit={!!selectedVehicle}
                    title="Vehicle"
                    fields={vehicleFields}
                />
            </Box>
        </>
    );
};

export default VehiclesPage;