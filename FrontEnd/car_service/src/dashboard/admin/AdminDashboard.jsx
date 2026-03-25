import { Typography } from "@mui/material";
import VehiclesTable from "../../components/VehiclesTable";

const AdminDashboard = () => {
  return (
    <>
      <Typography variant="h4">Admin Dashboard</Typography>
      <Typography>
        Manage vehicles, jobs, and users.
      </Typography>
      <VehiclesTable
        initialPageSize={3}
      />
    </>
  );
};


export default AdminDashboard;

