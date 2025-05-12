import React from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const AuthForm = ({ title, fields, onSubmit, buttonText }) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        mx: 'auto',
        mt: 8,
        p: 3,
        border: '1px solid #ccc',
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" align="center">{title}</Typography>
      <form onSubmit={onSubmit}>
        {fields.map(({ label, type, value, onChange, name }) => (
          <TextField
            key={name}
            fullWidth
            label={label}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            sx={{ 
                mb: 2,
                borderRadius: 2,
                '& .MuiInputLabel-root': {
                    borderColor: '#0F1A17', // Border color on hover
                    color: '#BFD8B3', // Default label color
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    borderColor: '#BFD8B3', // Border color on hover
                    color: '#0F1A17', // Label color when focused
             },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#621940', // Default border color
                    color: '#0F1A17', // Text color
                  },
                  '&:hover fieldset': {
                    borderColor: '#BFD8B3', // Border color on hover
                    color: '#0F1A17',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#0F1A17', // Border color when focused
                    color: '#fff',
                  },
                },
                }}
          />
        ))}
        <Button 
          fullWidth 
          type="submit" 
          variant="contained" 
          sx={{ 
            color: "#fff",
            fontWeight: "bold",
            backgroundColor: "#621940", 
            borderRadius: 2,
            border: "1px solid #fff",
            padding: "10px",
            '&:hover': {
                backgroundColor: "#BFD8B3" ,
                color: "#0F1A17",
                fontWeight: "bold",
            },
          }}>
          {buttonText}
        </Button>
      </form>
    </Box>
  );
};

export default AuthForm;
