import Navigation from "./layout/vertical/Navigation";
import { Routes, Route } from "react-router-dom";
import UsersContact from "./views/user/userContact";
import UsersCreate from "./views/user/userCreate";
import CurrentLocation from "./views/location/currentlocation";
import Box from "@mui/material/Box";
import Footer from "./layout/vertical/footer";
import Home from "./views/dashboard/home";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",  
      }}
    >
      <Navigation />
      <Box sx={{ flexGrow: 1 }}>  
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/:lang/home/:id" element={<Home />} />
          <Route path="/:lang/contact" element={<UsersContact />} />
          <Route path="/:lang/create" element={<UsersCreate />} />
          <Route path="/:lang/location" element={<CurrentLocation />} />
        </Routes>
      </Box>
      <Footer /> 
    </Box>
  );
}

export default App;

