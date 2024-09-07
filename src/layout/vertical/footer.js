import React from 'react';
import { Box, Typography, Link, Container } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import LineIcon from '@mui/icons-material/Chat'; 

function Footer() {
  return (
    <Box
      sx={{
        py: 3,
        px: 2,
        pl: "70px",

        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center" >
          <Box display="flex" alignItems="left" mb={2}>
            <HomeIcon sx={{ mr: 1 }} />
            <Typography variant="body1">300/69 the leaf condo Phatthanakan Rd, Suan Luang, Bangkok 10250</Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={2}>
            <PhoneIcon sx={{ mr: 1 }} />
            <Link href="tel:+66123456789" underline="none">
              <Typography variant="body1">+66 8251 61424</Typography>
            </Link>
          </Box>
          <Box display="flex" alignItems="center" mb={2}>
            <MailIcon sx={{ mr: 1 }} />
            <Link href="mailto:Smee.fod@gmail.com" underline="none">
              <Typography variant="body1">Smee.fod@gamil.com</Typography>
            </Link>
          </Box>
          <Box display="flex" alignItems="center">
            <LineIcon sx={{ mr: 1 }} />
            <Link href="https://line.me/ti/p/4W1um9wvkm" target="_blank" underline="none">
              <Typography variant="body1">Line: mhee_parada</Typography>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
