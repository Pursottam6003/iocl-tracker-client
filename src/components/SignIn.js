import * as React from 'react';
import { Button, TextField, FormControlLabel, Checkbox, Box, Typography, Container } from '@mui/material';
import logo from "../media/logo2.png"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../helpers/helpers'
import { useState } from 'react';

const theme = createTheme();

const textFieldProps = {
  margin: "normal",
  variant: "filled",
  required: true,
  fullWidth: true,
  autoComplete: "off",
  className: 'myfield',
}


export function SignIn({ handleUser}) {
  const history = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      email: data.get('email'),
      password: data.get('password'),
    }

    loginUser(user).then(res => {
      if (res.isAuth) {
        handleUser(res);
        history('/');
      }
      else history('/login');
    })
      .catch(err => { throw err })
  };

  return (
    <>
      <div className='mainComponent'>
        <ThemeProvider theme={theme} >
          <Container className="signinBox" maxWidth="xs">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img src={logo} style={{ width: "100px", height: "auto", padding: "20px" }} alt=""></img>
              <Typography component="h1" variant="h5" sx={{ color: "white" }}>
                Sign in
              </Typography>

              <div className='formInputElement'>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, padding: "30px", color: "black", borderColor: "white" }}>
                  <TextField
                    {...textFieldProps}
                    label="Email Address"
                    id="email"
                    name="email"
                  />
                  <TextField
                    {...textFieldProps}
                    label="Password"
                    id="password"
                    name="password"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, background: "green" }}
                  >
                    Sign In
                  </Button>
                </Box>
              </div>
            </Box>


          </Container>
        </ThemeProvider>
      </div>
    </>
  );
}

export default SignIn