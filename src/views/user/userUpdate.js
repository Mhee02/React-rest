import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Button, Grid, TextField, Typography } from '@mui/material';

export default function UserUpdate() {
  const {id} = useParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAgeName] = useState('');

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    age: false,
  });

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("X-API-Key", "{{token}}");
    
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    
    fetch(`http://localhost:4000/users/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result['status'] === 'ok') {
          setFirstName(result['user']['firstName'])
          setLastName(result['user']['lastName'])
          setAgeName(result['user']['age'])
        }  
      })
      .catch((error) => console.error(error));  
    },[id])

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
        "id": id,
        "firstName": firstName,
        "lastName": lastName,
        "age": age
      });

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch(`http://localhost:4000/users/update/${id}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            alert(result['message']);
            if (result['status'] === 'ok') {
              window.location.href = '/';
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
      <Container maxWidth="sm" sx={{ p:2 }}>
        <Typography>
          User Update
          <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  id="firstName"
                  label="First Name"
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
                  label="Last Name"
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
                  label="Age"
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
                  Update
                </Button>
              </Grid>
            </Grid>
          </form>
        </Typography>
      </Container>
    </React.Fragment>
  );
}
