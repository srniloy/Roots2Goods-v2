'use client'


import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  ThemeProvider,
  Typography,
  createTheme,
  Stack,
  TextField,
  FormControl,
  IconButton,
  Link,
  CircularProgress,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  Button,
  Alert,
  AlertColor,
} from "@mui/material";
import "@styles/Signin.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';



import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Loader } from "@app/loading";
import { HandleSignin } from "@services/auth";





const Signin = () => {
  const router = useRouter()
  const [isLoad, setIsLoad] = React.useState(false);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false)

  const [submitLoading, setSubmitLoading] = React.useState(false);
  const [openForgetPassword, setOpenForgetPassword] = React.useState(false);
  const [userData, setUserData] = React.useState({
    phone: '',
    password: ''
  });
  const [responseData, setResponseData] = useState({ message: '', alertType: '' })

  const alertType = {
    200: "success",
    201: "success",
    400: "warning",
    401: "warning",
    403: "warning",
    404: "warning",
    500: "error",
    503: "error"
  };
  const userUrl = {
    'Farmer': 'farmer-dashboard',
    'Trader': 'trader-dashboard',
    'Wholesaler': 'wholesaler-dashboard',
    'Retailer': 'retailer-dashboard',
    'Admin': 'admin-dashboard'
  }

  const formSubmitHandle = async (e) => {
    e.preventDefault()
    console.log(userData)
    const response = await HandleSignin(userData)
    setIsSnackBarOpen(true)
    const {token, user_type} = response.data.resData;
    setResponseData({
      message: response.message,
      alertType: alertType[response.status] || "info"
    });
    if (response.status === 200) {
      router.push(`/users/${user_type.toLowerCase()}-dashboard`)
    }
  }


  return (
    <>
      <Loader open={isLoad} />
      <section className="login-container">
        <Stack direction="row" height="100vh" width="100vw">
          <div className="login-bg-img"></div>
          <div className="login-form-r2">
            <h3 className="sign-in-heading">
              Sign In
            </h3>
            <div className="login-form-container">
              <Stack alignItems="center">
                <span className="bar"></span>
                <div className="login-form-wrapper">
                  <form className="login-form" autoComplete="off" noValidate>
                    <TextField
                      className="phone-number"
                      variant="outlined"
                      label="Phone"
                      name="phone"
                      placeholder="01880 200109"
                      value={userData.phone}
                      onChange={(e) => {
                        setUserData(ex => ({
                          ...ex,
                          phone: e.target.value
                        }))
                      }}
                    />

                    <TextField
                      className="password-box"
                      variant="outlined"
                      label="Password"
                      name="password"
                      type="password"
                      value={userData.password}
                      onChange={(e) => {
                        setUserData(ex => ({
                          ...ex,
                          password: e.target.value
                        }))
                      }}
                      style={{ width: "100%" }}
                      placeholder="Enter password..."
                    />

                    <Link
                      target="_blank"
                      color="inherit"
                      onClick={() => setOpenForgetPassword(!openForgetPassword)}
                      className="underline-on-hover"
                      style={{ cursor: 'pointer' }}
                    >
                      {" "}
                      Forget Password?
                    </Link>
                    <Box textAlign="center" className="login-btn-box">
                      <Button
                        variant="contained"
                        type="submit"
                        onClick={formSubmitHandle}
                        className="sign-in-submit-btn"
                        startIcon={submitLoading ? <CircularProgress style={{ height: '30px', width: '30px', color: '#000' }} /> : ''}

                      >
                        {
                          submitLoading ? 'Creating...' : 'Sign in'
                        }
                      </Button>

                    </Box>
                  </form>
                  <Typography variant="body1" mt={5} color="#fff">
                    Not registered?{" "}
                    <Link
                      variant="body1"
                      className="underline-on-hover"
                      style={{ cursor: 'pointer' }}
                      onClick={() => { router.push('/auth/signup'); setIsLoad(true) }}
                    >
                      <span style={{ color: '#F7C35F', textDecoration: 'none' }}>
                        Create an account
                      </span>
                    </Link>
                  </Typography>
                </div>
              </Stack>
            </div>
          </div>
        </Stack>
      </section>

      <Snackbar open={isSnackBarOpen} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} autoHideDuration={4000} onClose={() => setIsSnackBarOpen(!isSnackBarOpen)}>
        <Alert onClose={() => setIsSnackBarOpen(!isSnackBarOpen)} severity={(responseData.alertType) || 'info'} sx={{ width: '100%' }}>
          {responseData.message}
        </Alert>
      </Snackbar>


      <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>

        <Dialog open={openForgetPassword} onClose={() => setOpenForgetPassword(!openForgetPassword)}>
          <DialogTitle>Password Reset</DialogTitle>
          <DialogContent>
            <DialogContentText>
              4 digit OTP will send to your phone number, Please fill it here and continue
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="OTP"
              type="text"
              fullWidth
              variant="outlined"
              style={{ marginTop: '30px' }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenForgetPassword(!openForgetPassword)}>Cancel</Button>
            <Button onClick={() => setOpenForgetPassword(!openForgetPassword)}>Continue</Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>










    </>
  );
};


export default Signin;