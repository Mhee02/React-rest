import Sidebar from "./Sidebar";

import Box from "@mui/material/Box";
function Navigation () {
    return (
    <Box
        sx={{
            display: "flex",
            flexDirection: "column",
        }}
        >
        <Box sx={{ flexGrow: 1 }}>
            <Sidebar />
            
        </Box>
    </Box>
    )
}

export default Navigation;