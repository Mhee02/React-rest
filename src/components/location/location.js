import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';

function Location() {
  
  const [showMap, setShowMap] = useState(false); 
  const { t } = useTranslation(); 


  const toggleMap = () => {
    setShowMap(!showMap);
  };

  const openExternalMap = () => {
    const url = `https://www.google.com/maps?q=13.739042686651421,100.60118417508998&z=15&output=embed`;
    window.open(url, '_blank'); 
  };

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" onClick={toggleMap}>
          {showMap ? t('hidemap') : t('showmap')}
        </Button>
        <Button variant="contained" color="primary" onClick={openExternalMap} sx={{ ml: 2 }}>
          {t('openexternalmap')}
        </Button>
      </Box>
      {showMap && (
        <Box
          sx={{
            width: '100%',
            maxWidth: '600px',
            height: 'auto',
            overflow: 'hidden',
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3875.6596731153486!2d100.60118417508998!3d13.739042686651421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTPCsDQ0JzIwLjYiTiAxMDDCsDM2JzEzLjUiRQ!5e0!3m2!1sen!2sth!4v1725704787917!5m2!1sen!2sth"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Box>
      )}
    </Box>
  );
}

export default Location;
