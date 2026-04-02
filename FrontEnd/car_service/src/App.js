import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { HomePage, LoginPage, DashboardPage, VehiclesPage, UsersPage } from "./pages";

function App() {
  //const { user, logout } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vehicles"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "CUSTOMER"]}>
              <VehiclesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <UsersPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;