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
        border: '3px solid #621940',
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" align="center" fontFamily={"'Cinzel', serif"} fontWeight={"bold"}>{title}</Typography>
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
                    color: '#FB773C', // Default label color
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    borderColor: '#FB773C', // Border color on hover
                    color: '#FB773C', // Label color when focused
             },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#621940', // Default border color
                    color: '#621940', // Text color
                  },
                  '&:hover fieldset': {
                    borderColor: '#FB773C', // Border color on hover
                    color: '#FB773C',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#621940', // Border color when focused
                    color: '#ffff', // Text color
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
                backgroundColor: "#56021F" ,
                color: "#ffff",
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
