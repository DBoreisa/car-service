import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../../auth/AuthContext";

const Topbar = ({ toggleSidebar, isMobile }) => {
    const { user, logout } = useAuth();

    return (
        <AppBar position="static">
            <Toolbar>
                {isMobile && (
                    <IconButton 
                        color="inherit" onClick={toggleSidebar}>
                        <MenuIcon />
                    </IconButton>
                )}

                <Typography sx={{ flexGrow: 1 }}>
                    Car Service System
                </Typography>

                <Typography sx={{ mr: 2 }}>
                    {user.email}
                </Typography>

                <Button color="inherit" onClick={logout}>
                    Logout
                </Button>
            </Toolbar>
        </AppBar>    
    );
};

export default Topbar;