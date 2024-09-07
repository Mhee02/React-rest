import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CollectionTable from '../../components/users/CollectionTable';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import i18n from 'i18next';


export default function UsersContact() {
  const { lang } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang); 
    }
  }, [lang]);

return (
    <React.Fragment>
      <CssBaseline />
      <Container 
       maxWidth="lg" 
       sx={{ 
         paddingLeft: { xs: '88px', sm: '88px' }, 
         paddingRight: '24px'
       }}
      >
      <Paper sx={{ p: 2 }}>
          <Box display="flex">
              <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                  {t('user')}
              </Typography>
              </Box>
              <Box>
              </Box>
          </Box>
            <CollectionTable />
        </Paper>
      </Container>
    </React.Fragment>
  );
}
