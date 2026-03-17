import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button
} from "@mui/material";

const VehicleDialog = ({
    open,
    onClose,
    formData,
    setFormData,
    onSave,
    isEdit
}) => {
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{isEdit ? "Edit Vehicle" : "Add Vehicle"}</DialogTitle>

            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                <TextField
                    label="VIN"
                    name="vin"
                    value={formData.vin}
                    onChange={handleChange}
                    sx={{mt: 2}}
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
                    type="number"
                    value={formData.year}
                    onChange={handleChange}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={onSave}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default VehicleDialog;