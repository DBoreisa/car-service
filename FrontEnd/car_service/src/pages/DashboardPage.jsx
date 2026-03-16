import { useAuth } from "../auth/AuthContext";
import DashboardLayout from "../components/layout/DashboardLayout";

import AdminDashboard from "../dashboard/admin/AdminDashboard";
import MechanicDashboard from "../dashboard/mechanic/MechanicDashboard";
import CustomerDashboard from "../dashboard/customer/CustomerDashboard";

const DashboardPage = () => {
    const { user } = useAuth();

    let content = null;

    if (user.role === "ADMIN") {
        content = <AdminDashboard />;
    } else if (user.role === "MECHANIC") {
        content = <MechanicDashboard />;
    } else if (user.role === "CUSTOMER") {
        content = <CustomerDashboard />;
    }

    return (
        <DashboardLayout>
            {content}
        </DashboardLayout>
    );
};

export default DashboardPage;