import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useTranslation } from 'react-i18next'; 
import { useNavigate, useParams, useLocation } from 'react-router-dom';



export default function Navbar() {
    const { i18n } = useTranslation();  
    const navigate = useNavigate(); 
    
    const location = useLocation(); 
    const { pathname } = location;

    const changeLanguage = (selectedLang) => {
        i18n.changeLanguage(selectedLang);
        const pathParts = pathname.split('/');
        if (pathParts[1]) {
          pathParts[1] = selectedLang;
        } else {
          pathParts.splice(1, 0, selectedLang);
        }
        const newPath = pathParts.join('/');
        navigate(newPath);
      };
    
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CRUD
          </Typography>
          <Button color="inherit" onClick={() => changeLanguage('en')}>EN</Button>
          <Button color="inherit" onClick={() => changeLanguage('th')}>TH</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
