'use client'
import React, { useEffect, useState } from "react";
import "@styles/signup.css";
import {
  Box,
  Grid,
  Link,
  Typography,
  Select,
  MenuItem,
  Checkbox,
  CircularProgress,
  Alert,
} from "@mui/material";

import {
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";



import Snackbar from '@mui/material/Snackbar';
import { useRouter } from "next/navigation";


import { HandleSignup } from "@services/auth";






const SignUp = () => {

  const router = useRouter()

  const [openTerms, setOpenTerms] = React.useState(false);
  const [termsCheckButton, setTermsCheckButton] = React.useState(false);
  const [submitLoading, setSubmitLoading] = React.useState(false);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false)
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



  const [userData, setUserData] = React.useState({
    name: '',
    user_type: '',
    phone: '',
    address: '',
    nid: '',
    birth_date: '',
    password: '',
    confirm_password: '',
    user_id: '',
  });


  const formSubmitHandle = async (e) => {
    e.preventDefault()
    console.log(userData)
    const response = await HandleSignup(userData)
    console.log(response)
    setIsSnackBarOpen(true)
    setResponseData({
      message: response.message,
      alertType: alertType[response.status] || "info"
    });
    if (response.status === 200) {
      router.push('/auth/signin')
    }
  }



  return (
    <>
      <section className="signup-container">
        <Stack direction="row" className="login-wrapper" height="100vh" width="100vw">
          <div className="login-bg-img"></div>
          <div className="login-form-r2">
            <h3 className="sign-in-heading">
              Sign Up
            </h3>
            <div className="login-form-container">
              <Stack alignItems="center">
                <span className="bar"></span>
                <div className="login-form-wrapper">
                  <form className="login-form signup-form" autoComplete="off" noValidate>
                    <Grid container spacing={2}>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          className="phone-number"
                          variant="outlined"
                          label="Name"
                          name="name"
                          style={{ width: "100%" }}
                          placeholder="Enter your name..."
                          value={userData.name}
                          onChange={(e) => {
                            setUserData(ex => ({
                              ...ex,
                              name: e.target.value
                            }))
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth className="user-type-input">
                          <InputLabel id="demo-simple-select-label">
                            Sign up as
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Sign up as"
                            name="user_type"
                            value={userData.user_type}
                            onChange={(e) => {
                              setUserData(ex => ({
                                ...ex,
                                user_type: e.target.value
                              }))
                            }}
                          >
                            <MenuItem value={'Farmer'}>Farmer</MenuItem>
                            <MenuItem value={'Trader'}>Trader</MenuItem>
                            <MenuItem value={'Wholesaler'}>Wholesaler</MenuItem>
                            <MenuItem value={'Retailer'}>Retailer</MenuItem>
                            <MenuItem value={'Admin'}>Admin</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth className="user-type-input">
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
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth className="user-type-input">
                          <TextField
                            variant="outlined"
                            type="text"
                            label="Address"
                            name="address"
                            placeholder="Enter your address"
                            value={userData.address}
                            onChange={(e) => {
                              setUserData(ex => ({
                                ...ex,
                                address: e.target.value
                              }))
                            }}
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth className="user-type-input">
                          <TextField
                            variant="outlined"
                            type="phone"
                            label="NID"
                            name="nid"
                            placeholder="7854 3424 242"
                            value={userData.nid}
                            onChange={(e) => {
                              setUserData(ex => ({
                                ...ex,
                                nid: e.target.value
                              }))
                            }}
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        {/* <ThemeProvider theme={theme}> */}
                        <FormControl fullWidth className="user-type-input">
                          <TextField
                            variant="outlined"
                            type="date"
                            label="Birth Date"
                            name="birth_date"
                            focused
                            value={userData.birth_date}
                            onChange={(e) => {
                              setUserData(ex => ({
                                ...ex,
                                birth_date: e.target.value
                              }))
                            }}
                          />
                        </FormControl>
                        {/* </ThemeProvider> */}
                      </Grid>

                      <Grid item xs={12} sm={6}>
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
                      </Grid>


                      <Grid item xs={12} sm={6}>
                        <TextField
                          className="password-box"
                          variant="outlined"
                          label="Confirm Password"
                          name="confirm_password"
                          type="password"
                          value={userData.confirm_password}
                          onChange={(e) => {
                            setUserData(ex => ({
                              ...ex,
                              confirm_password: e.target.value
                            }))
                          }}
                          style={{ width: "100%" }}
                          placeholder="Enter the same password again..."
                        />
                      </Grid>



                    </Grid>






                    <Typography className="terms-text" variant="body1" mt={1} display={"flex"} alignItems={'center'} color="#fff">
                      <Checkbox
                        className="terms-checkbox"
                        style={{ color: '#F7C35F' }}
                        inputProps={{ 'aria-label': 'controlled' }}
                        name="signup_term_check"
                        value={termsCheckButton}
                        onChange={(e) => setTermsCheckButton(e.target.checked)}
                      />
                      I AGREE WITH ALL
                      <Link
                        variant="body1"
                        target="_blank"
                        marginLeft={1}
                        className="underline-on-hover"
                        style={{ cursor: 'pointer' }}
                      >
                        TERMS & CONDITION
                      </Link>
                    </Typography>
                    <Box textAlign="center" className="login-btn-box">
                      <Button
                        variant="contained"
                        type="submit"
                        disabled={!termsCheckButton}
                        onClick={formSubmitHandle}
                        className="sign-in-submit-btn signup-submit-btn"
                        startIcon={submitLoading ? <CircularProgress style={{ height: '30px', width: '30px', color: '#000' }} /> : ''}
                      >
                        {
                          submitLoading ? 'Creating...' : 'Sign up'
                        }
                      </Button>

                    </Box>
                  </form>
                  <Typography variant="body1" mt={5} color="#fff">
                    Already Have Account?
                    <Link
                      variant="body1"
                      marginLeft={1}
                      className="underline-on-hover"
                      style={{ cursor: 'pointer' }}
                      onClick={() => router.push('/auth/signin')}
                    >

                      SignIn
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


    </>
  );
};


export default SignUp;