import React, { useState, useEffect } from 'react';
import { Card, CardContent, Avatar, Typography, TextField, Button, IconButton, CardActions } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';


export default function CardHome() { 
  const [profileImage, setProfileImage] = useState('/static/images/avatar/1.jpg');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAgeName] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation(); 
  const { id,lang } = useParams(); 
  
  console.log("id",id)

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    age: false,
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file)); 
    }
  };

  useEffect(() => {
    if (id) {  
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
            setFirstName(result['user']['firstName']);
            setLastName(result['user']['lastName']);
            setAgeName(result['user']['age']);
            setProfileImage(result['user']['profileImage']);
          }  
        })
        .catch((error) => console.error(error));  
    }
  }, [id]); 

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const validationErrors = {
      firstName: firstName.trim() === '',
      lastName: lastName.trim() === '',
      age: typeof age === 'string' ? age.trim() === '' || isNaN(age) : isNaN(age), 
    };
  
    setErrors(validationErrors);
    const hasErrors = Object.values(validationErrors).some(error => error);
  
    if (!hasErrors) {  
      const myHeaders = new Headers();
      myHeaders.append("X-API-Key", "{{token}}");
  
      const formData = new FormData();
      formData.append('id', id);
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('age', age); 

      
      const file = document.getElementById('upload-image').files[0];
      if (file) {
        formData.append('profileImage', file);
      }
      if (!file) {
        
        formData.delete('profileImage');
      }
  
      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: formData, 
        redirect: "follow"
      };
  
      fetch(`http://localhost:4000/users/update/${id}`, requestOptions)
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
    <Card sx={{ maxWidth: 345, margin: 'auto', mt: 5 }}>
      <CardContent>
        <Avatar
          alt="Profile Image"
          src={profileImage}
          sx={{ width: 120, height: 120, margin: 'auto', mb: 2 }}
        />
        <Typography variant="h5" component="div" textAlign="center">
          {firstName} {lastName}
        </Typography>
        <TextField
          fullWidth
          label={t("firstname")}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label={t("lastname")}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label={t("age")}
          value={age}
          onChange={(e) => setAgeName(e.target.value)}
          sx={{ mt: 2 }}
        />
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <label htmlFor="upload-image">
          <input
            accept="image/*"
            id="upload-image"
            type="file"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          <IconButton color="primary" aria-label="upload picture" component="span">
            <PhotoCamera />
          </IconButton>
        </label>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {t("Update")}
        </Button>
      </CardActions>
    </Card>
  );
}
