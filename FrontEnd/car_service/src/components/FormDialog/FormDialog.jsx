import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button
} from "@mui/material";

const FormDialog = ({
    open,
    onClose,
    formData,
    setFormData,
    onSave,
    isEdit, 
    title,
    fields = []
}) => {
    const handleChange = (e) => {
        setFormData({
            ...formData, // keep existing fields
            [e.target.name]: e.target.value
        });
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{isEdit ? `Edit ${title}` : `Add ${title}`}</DialogTitle>

            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                {fields.map((field) => (
                    <TextField
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        type={field.type || "text"}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        sx={field.sx}
                    />
                ))}
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

export default FormDialog;