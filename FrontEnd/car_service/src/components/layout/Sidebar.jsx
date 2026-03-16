import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { useAuth } from "../../auth/AuthContext";
import { Link } from "react-router-dom";

const Sidebar = ({ open, toggleSidebar, isMobile }) => {
    const { user } = useAuth();
    
    return (
        <Drawer 
            variant={isMobile ? "temporary" : "permanent"}
            anchor="left" 
            open={isMobile ? open : true} 
            onClose={toggleSidebar}
            sx={{
                "& .MuiDrawer-paper": { 
                    width: 250,
                    boxSizing: "border-box"
                }
            }}
        >
            <List>
                <ListItemButton component={Link} to="/dashboard" onClick={toggleSidebar}>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>

                {user && user.role === "ADMIN" && (
                    <>
                        <ListItemButton component={Link} to="/vehicles" onClick={toggleSidebar}>
                            <ListItemText primary="Vehicles" />
                        </ListItemButton>

                        <ListItemButton component={Link} to="/jobs" onClick={toggleSidebar}>
                            <ListItemText primary="Jobs" />
                        </ListItemButton>

                        <ListItemButton component={Link} to="/users" onClick={toggleSidebar}>
                            <ListItemText primary="Users" />
                        </ListItemButton>
                    </>
                )}

                {user && user.role === "MECHANIC" && (
                    <ListItemButton component={Link} to="/jobs" onClick={toggleSidebar}>
                        <ListItemText primary="Assigned Jobs" />
                    </ListItemButton>
                )}

                {user && user.role === "CUSTOMER" && (
                    <>
                        <ListItemButton component={Link} to="/vehicles" onClick={toggleSidebar}>
                            <ListItemText primary="Vehicles" />
                        </ListItemButton>

                        <ListItemButton component={Link} to="/jobs" onClick={toggleSidebar}>
                            <ListItemText primary="Jobs" />
                        </ListItemButton>
                    </>
                )}
            </List>
        </Drawer>
    );
};

export default Sidebar;