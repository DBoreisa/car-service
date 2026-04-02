import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import api from "../api/api";
import UsersTable from "../components/UsersTable";

const UsersPage = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0); // to trigger table refresh
    const [selectedUser, setSelectedUser] = useState(null);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone_number: "",
        role: ""
    });

    const handleEdit = (user) => {
        setSelectedUser(user);
        setFormData({
            username: user.username,
            email: user.email,
            phone_number: user.phone_number,
            role: user.role
        });
        setOpenDialog(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this user?")) return;
        await api.delete(`users/${id}/`);
        setRefreshTrigger(prev => prev + 1); // refresh
    };

    const handleSave = async () => {
        try {
            if (selectedUser) {
            // Update existing user
                await api.put(`users/${selectedUser.id}/`, formData);
            }
            setOpenDialog(false);
            setRefreshTrigger(prev => prev + 1); // refresh
        } catch (error) {
            console.log("BACKEND ERROR:", error.response?.data);
            console.error("Error saving user:", error);
            alert("Failed to save user");
        }
    };

    return (
        <>
            <Box>
                <Typography variant="h4" sx={{ mb: 2 }}>
                    Users
                </Typography>
                <UsersTable
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    refreshTrigger={refreshTrigger} // pass trigger to table
                />

                <UserDialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    formData={formData}
                    setFormData={setFormData}
                    onSave={handleSave}
                    isEdit={!!selectedUser}
                />
            </Box>
        </>
    );
};

export default UsersPage;