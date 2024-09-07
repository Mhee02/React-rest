import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CollectionTable from '../../components/users/CollectionTable';
// import  Link  from '@mui/material/Link';
import { Link } from 'react-router-dom'; // ใช้ Link จาก react-router-dom
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import i18n from 'i18next';


export default function Users() {
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
      <Container maxWidth="lg" sx={{ p: 20 }}>
        <Paper sx={{ p: 10 }}>
        <Box display="flex">
            <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" gutterBottom component="div">
                {t('user')}
            </Typography>
            </Box>
            <Box>
            <Link to={`/${lang || 'en'}/create`}>
              <Button variant="contained"> {t('create')} </Button>
            </Link>
            </Box>
        </Box>
            <CollectionTable />
        </Paper>
      </Container>
    </React.Fragment>
  );
}
