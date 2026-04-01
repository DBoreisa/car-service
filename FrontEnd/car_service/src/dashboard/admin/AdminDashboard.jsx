import { Typography } from "@mui/material";
import VehiclesTable from "../../components/VehiclesTable";
import UsersTable from "../../components/UsersTable";

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
      <UsersTable
        initialPageSize={3}
      />
    </>
  );
};


export default AdminDashboard;

