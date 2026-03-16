import { Box, useMediaQuery } from "@mui/material";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const sidebarWidth = 250;

const DashboardLayout = ({ children }) => {
  const isMobile = useMediaQuery("(max-width:900px)");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar 
        open={sidebarOpen} 
        toggleSidebar={toggleSidebar} 
        isMobile={isMobile}
      />
      <Box sx={{ 
          flexGrow: 1, 
          ml: isMobile ? 0 : `${sidebarWidth}px`
        }}
      >
        <Topbar toggleSidebar={toggleSidebar} isMobile={isMobile} />
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;