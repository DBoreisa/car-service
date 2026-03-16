import { Navigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useAuth();

    // user not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // user logged in but role not allowed
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    // user allowed
    return children;
};

export default ProtectedRoute;