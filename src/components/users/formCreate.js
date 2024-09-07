import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';


export default function FormCreate() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAgeName] = useState('');
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams(); 

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    age: false,
  });

  const handleSubmit = event => {
    event.preventDefault();
    const validationErrors = {
      firstName: firstName.trim() === '',
      lastName: lastName.trim() === '',
      age: age.trim() === '' || isNaN(age),
    };

    setErrors(validationErrors);
    const hasErrors = Object.values(validationErrors).some(error => error);

    if (!hasErrors) {  
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "firstName": firstName,
        "lastName": lastName,
        "age": age
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch("http://localhost:4000/users/create", requestOptions)
        .then(response => response.json())
        .then(result => {
            alert(result['message']);
            if (result['status'] === 'ok') {
              navigate(`/${lang || 'en'}/contact`);
            }
        })
        .catch((error) => console.error(error));
    } else {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container 
      maxWidth="sm" 
      sx={{ 
        // paddingLeft: { xs: '88px', sm: '88px' }, 
        paddingRight: '24px'
      }}>
        <Typography>
          {t('createuser')}
          <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  id="firstName"
                  label={t('firstname')}
                  variant="outlined"
                  fullWidth
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  error={errors.firstName}
                  helperText={errors.firstName ? 'Please enter your first name.' : ''}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  id="lastName"
                  label={t('lastname')}
                  variant="outlined"
                  fullWidth
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  error={errors.lastName}
                  helperText={errors.lastName ? 'Please enter your last name.' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="age"
                  label={t('age')}
                  variant="outlined"
                  fullWidth
                  value={age}
                  onChange={(e) => setAgeName(e.target.value)}
                  error={errors.age}
                  helperText={errors.age ? 'Please enter a valid age.' : ''}
                />
              </Grid>
              <Grid item xs={12} >
                <Button type="submit" variant="contained" fullWidth>
                  Create
                </Button>
              </Grid>
            </Grid>
          </form>
        </Typography>
      </Container>
    </React.Fragment>
  );
}
