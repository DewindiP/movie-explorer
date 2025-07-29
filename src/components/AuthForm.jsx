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
    justifyContent: 'flex-end',
    mx: 'auto',
    mt: 8,
    p: 3,
    border: '3px solid #621940',
    borderRadius: 2,
    background: 'rgba(255, 255, 255, 0.1)', // translucent white
    backdropFilter: 'blur(10px)',           // blur effect
    WebkitBackdropFilter: 'blur(10px)',     // Safari support
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', // optional shadow
  }}
>

      <Typography
        variant="h5"
        align="center"
        fontFamily={"'Cinzel', serif"}
        fontWeight={"bold"}
        color='white'
      >
        {title}
      </Typography>
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
                color: '#FB773C',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#FB773C',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#621940',
                },
                '&:hover fieldset': {
                  borderColor: '#FB773C',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#621940',
                },
              },
              '& input': {
                color: '#fff',
              },
              '& input:-webkit-autofill': {
                WebkitBoxShadow: '0 0 0 1000px #000 inset', // dark background
                WebkitTextFillColor: '#fff',
                transition: 'background-color 5000s ease-in-out 0s',
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
              backgroundColor: "#56021F",
              color: "#ffff",
              fontWeight: "bold",
            },
          }}
        >
          {buttonText}
        </Button>
      </form>
    </Box>
  );
};

export default AuthForm;
