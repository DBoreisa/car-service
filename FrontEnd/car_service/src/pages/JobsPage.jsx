import { useState } from "react";
import { Box, Typography } from "@mui/material";
import api from "../api/api";
import FormDialog from "../components/FormDialog";

const JobsPage = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0); // to trigger table refresh
    const [selectedJob, setSelectedJob] = useState(null);

    const [formData, setFormData] = useState({
        vehicle: "",
        customer: "",
        description: "",
        status: ""
    });

};

export default JobsPage;