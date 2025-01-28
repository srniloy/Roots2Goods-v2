'use client'
import '@styles/farmer-dashboard.css'
import React, { useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';

import { IconButton } from '@mui/material';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
// import BusinessAnalytics from '@components/BusinessAnalytics';
import FrmrProjects from '@components/FrmrProjects';
import Transactions from '@components/Transactions';
import Searching from '@components/Searching';
import LogoutIcon from '@mui/icons-material/Logout';

import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Button, FormControl, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import UserContext from '@context/userContext';
import '@styles/responsive.css'
import MenuIcon from '@mui/icons-material/Menu';




// ========================================= Notification ==============================================================
import {
  Avatar,
  Divider,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';

import { BellOutlined, CloseOutlined, GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Suspense } from 'react';
import Loading from '../loading';
import { Loader } from '@app/loading';
import { HandleLogout } from '@services/auth';
import { GetUserData, UpdateProfileInfo } from '@services/fd-service/dashboard_service';
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'


const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

const actionSX = {
  mt: '6px',
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',

  transform: 'none'
};

// =======================================================================================================================================



const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];




const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;



const DashboardLayout = ({ children }) => {

  const [isLoad, setIsLoader] = React.useState(true);
  const [profileImgInfo, setProfileImgInfo] = React.useState(undefined)


  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [user, setUser] = React.useState(undefined)

  async function GetUser() {
    const userData = await GetUserData("Trader");
    setUser(userData)
    setIsLoader(false)
  }
  React.useEffect(() => {
    GetUser()
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const urlPath = usePathname()
  const urlParts = usePathname().split("/")
  const end_pathname = urlParts[urlParts.length - 1]
  const router = useRouter()



  const frmrTabClickAction = (e) => {
    const allTabs = document.querySelectorAll('.frmr-tab-link-container .fpd-tab-link');
    const businessTab = document.querySelector('.frmr-tab-link-container .business-tab');
    const projectsTab = document.querySelector('.frmr-tab-link-container .projects-tab');
    const transactionsTab = document.querySelector('.frmr-tab-link-container .transactions-tab');
    console.log(end_pathname);
    allTabs.forEach(element => {
      if (element.classList.contains("active")) {
        element.classList.remove("active");
      }
    });
    e.target.classList.add("active");

    if (e.target.innerHTML == "Business Analytics") {
      router.push('/users/trader/dashboard')
    }
    else if (e.target.innerHTML == "Buy Products") {
      router.push('/users/trader/dashboard/products')
    }
    else if (e.target.innerHTML == "Transaction") {
      router.push('/users/trader/dashboard/transactions')
    }
    else if(e.target.innerHTML == "Stocked Products"){
      router.push('/users/trader/dashboard/stocks')
    }

  }

  const [userUpdateDialog, setUserUpdateDialog] = React.useState(false)
  if (user) {
    return (
      <ThemeProvider theme={createTheme({ palette: { mode: "dark" } })}>
        <UserContext.Provider value={{ user, setUser }}>
          <section className="farmer-dashboard">
          <input type="checkbox" id="farmerBarInput" />
            <div className="farmer-menu" id="farmerMenuBox">
              <div className="phone-frmr-profile-part">
                <div className="farmer-info-box phone-profile-info">
                <div className="frmr-profile-img-style">
                  <div className="frmr-profile-img-wrapper">
                    {
                      user?.img == '' || user?.img == undefined ? (
                        <img src={'/images/user.png'} key={'/images/user.png'} alt='' className="frmr-profile-img" />
                      ) : (
                        <img src={`${SERVER_URL}/${user?.img}`} key={`${SERVER_URL}/${user?.img}`} alt='' className="frmr-profile-img" />
                      )
                    }
                  </div>
                </div>
                  <div className="frmr-name-tag phone-frmr-name-tag">
                    <h4 className="frmr-name-h4">{user?.name}</h4>
                    <div className="frmr-title-p">{user?.type}</div>
                  </div>
                  <div className="frmr-profile-infos ">
                    <ul role="list" className="frmr-profile-info-list">
                      <li className="frmr-profile-info-list-item">
                        <div className="frmr-profile-info-item-wrapper">
                          <h5 className="frmr-profile-info-item-title-h3"><span className="text-span-2"></span>Phone</h5>
                          <div className="frmr-profile-info-item-data-p">{user?.phone}</div>
                        </div>
                      </li>
                      <li className="frmr-profile-info-list-item">
                        <div className="frmr-profile-info-item-wrapper">
                          <h5 className="frmr-profile-info-item-title-h3"><span className="text-span-2"></span>NID</h5>
                          <div className="frmr-profile-info-item-data-p">{user?.nid}</div>
                        </div>
                      </li>
                      <li className="frmr-profile-info-list-item">
                        <div className="frmr-profile-info-item-wrapper">
                          <h5 className="frmr-profile-info-item-title-h3"><span className="text-span-2"></span>Birth Date</h5>
                          <div className="frmr-profile-info-item-data-p">{user?.birth_date}</div>
                        </div>
                      </li>
                      <li className="frmr-profile-info-list-item">
                        <div className="frmr-profile-info-item-wrapper">
                          <h5 className="frmr-profile-info-item-title-h3"><span className="text-span-2"></span>Address</h5>
                          <div className="frmr-profile-info-item-data-p">{user?.address}</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div style={{ marginBottom: '20px', marginTop: '10px' }}>
                    <Button onClick={() => setUserUpdateDialog(true)} color='success' variant='outlined'>Edit Info</Button>
                  </div>
                </div>
              </div>
              <div style={{width: '100%', display:"flex", justifyContent: 'center', alignItems: 'center'}}>
                <Button
                  variant={'contained'}
                  color={'success'}
                  style={{
                    color: '#fff',
                    minWidth: '200px',
                    marginTop: '20px'
                  }}
                  onClick={
                    ()=>{
                      HandleLogout("Farmer")
                      setIsLoader(true)
                    }
                  }
                >
                  Logout
                  <LogoutIcon className='fd-nav-icon' style={{marginLeft: '10px'}} />
                </Button>

              </div>
              
            </div>
            <div className="fd-header">
              <div className="w-layout-blockcontainer fd-nav-container w-container">
                <div className="w-layout-hflex fd-nav-flex-box">
                  {/* <h1 className="fd-nav-heading-h1">Harvest Hive</h1> */}
                  <img src="/images/roots2goods.png" alt="logo"
                    style={{
                      height: '50px',
                      marginBottom: '20px',
                      marginTop: '10px'
                    }}
                  />
                  <ul role="list" className="fd-nav-icon-list">

                    {/* <Tooltip title='Messages'>
                    <Link href={'farmer-dashboard/message'}>
                    <IconButton size="large" aria-label="show 4 new mails" color="#fff">
                      <Badge badgeContent={4} color="error">
                        <MailIcon className='fd-nav-icon' />
                      </Badge>
                    </IconButton>
                    </Link>
                  </Tooltip>
                  
  
                  <Tooltip title="Notifications">
                    <IconButton
                      size="large"
                      aria-label="show 17 new notifications"
                      color="#fff"
                      onClick={handleOpenUserMenu}
                    >
                      <Badge badgeContent={17} color="error">
                        <NotificationsIcon className='fd-nav-icon'/>
                      </Badge>
                    </IconButton>
                  </Tooltip> */}

                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <div style={{ minHeight: "400px", width: '400px' }}>

                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '20px 10px 20px 30px',
                        }}>
                          <h5 style={{ margin: 0 }}>Notification</h5>
                          <IconButton onClick={handleCloseUserMenu}><CloseIcon /></IconButton>
                        </div>
                        <List
                          component="nav"
                          style={{
                            height: ''
                          }}
                          sx={{
                            p: 0,
                            '& .MuiListItemButton-root': {
                              py: 0.5,
                              '& .MuiAvatar-root': avatarSX,
                              '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                            }
                          }}
                        >
                          <ListItemButton>
                            <ListItemAvatar>
                              <Avatar
                                sx={{
                                  color: 'success.main',
                                  bgcolor: 'success.lighter'
                                }}
                              >
                                <GiftOutlined />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              style={{
                                fontSize: '16px'
                              }}
                              primary={
                                <Typography variant="text">
                                  <Typography component="span" variant="subtitle1">
                                    Sifatul Sultan
                                  </Typography>{' '}
                                  offer a new price
                                </Typography>
                              }
                              secondary="2 min ago"
                            />
                            <ListItemSecondaryAction>
                              <Typography variant="caption" noWrap>
                                3:00 AM
                              </Typography>
                            </ListItemSecondaryAction>
                          </ListItemButton>
                          <Divider />
                          <ListItemButton>
                            <ListItemAvatar>
                              <Avatar
                                sx={{
                                  color: 'primary.main',
                                  bgcolor: 'primary.lighter'
                                }}
                              >
                                <MessageOutlined />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Typography variant="text">
                                  <Typography component="span" variant="subtitle1">
                                    Sowad Feruk
                                  </Typography>{' '}
                                  are following your project 'Deshi Tometo'
                                </Typography>
                              }
                              secondary="5 August"
                            />
                            <ListItemSecondaryAction>
                              <Typography variant="caption" noWrap>
                                6:00 PM
                              </Typography>
                            </ListItemSecondaryAction>
                          </ListItemButton>
                          <Divider />
                          <ListItemButton>
                            <ListItemAvatar>
                              <Avatar
                                sx={{
                                  color: 'error.main',
                                  bgcolor: 'error.lighter'
                                }}
                              >
                                <SettingOutlined />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Typography variant="text">
                                  <Typography component="span" variant="subtitle1">
                                    Joshim Islam
                                  </Typography>{' '}
                                  are following your project 'Fresh Cabbage'
                                </Typography>
                              }
                              secondary="7 hours ago"
                            />
                            <ListItemSecondaryAction>
                              <Typography variant="caption" noWrap>
                                2:45 PM
                              </Typography>
                            </ListItemSecondaryAction>
                          </ListItemButton>
                          <Divider />
                          <ListItemButton>
                            <ListItemAvatar>
                              <Avatar
                                sx={{
                                  color: 'primary.main',
                                  bgcolor: 'primary.lighter'
                                }}
                              >
                                C
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Typography variant="text">
                                  <Typography component="span" variant="subtitle1">
                                    Wasi Haider
                                  </Typography>{' '}
                                  offer a new price
                                </Typography>
                              }
                              secondary="Daily scrum meeting time"
                            />
                            <ListItemSecondaryAction>
                              <Typography variant="caption" noWrap>
                                9:10 PM
                              </Typography>
                            </ListItemSecondaryAction>
                          </ListItemButton>
                          <Divider />

                          <ListItemButton>
                            <ListItemAvatar>
                              <Avatar
                                sx={{
                                  color: 'primary.main',
                                  bgcolor: 'primary.lighter'
                                }}
                              >
                                C
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Typography variant="text">
                                  <Typography component="span" variant="subtitle1">
                                    Bishal Das
                                  </Typography>{' '}
                                  offer a new price
                                </Typography>
                              }
                              secondary="Daily scrum meeting time"
                            />
                            <ListItemSecondaryAction>
                              <Typography variant="caption" noWrap>
                                12:15 PM
                              </Typography>
                            </ListItemSecondaryAction>
                          </ListItemButton>
                          <Divider />
                          <ListItemButton sx={{ textAlign: 'center', py: `${12}px !important` }}>
                            <ListItemText
                              primary={
                                <Typography variant="text" color="primary">
                                  View All
                                </Typography>
                              }
                            />
                          </ListItemButton>
                        </List>





















                      </div>
                    </Menu>

                    <label htmlFor="farmerBarInput" className="farmer-menu-bar-label">
                        <MenuIcon className="menu-bar"/>
                    </label>

                    <Tooltip title='Logout' className='logout-button'>
                      <IconButton
                        size="large"
                        aria-label="show 17 new notifications"
                        color="#fff"
                        onClick={() => {
                          // logoutAction(router) 
                          HandleLogout("Farmer")
                          setIsLoader(true)
                        }}
                      >
                        <LogoutIcon className='fd-nav-icon' />
                      </IconButton>
                    </Tooltip>

                  </ul>
                </div>
              </div>
            </div>
            <div className="fd-main-part" id='FarmerMainPart'>
              <div className="w-layout-blockcontainer fd-container w-container">
                <div className="w-layout-hflex farmer-dashboard-flex">
                  <div className="frmr-profile-part">
                    <div className="frmr-profile-img-style">
                      {/* <img src="/images/bangla.png" className="frmr-profile-img"/> */}
                      <div className="frmr-profile-img-wrapper">
                        {
                          user?.img == '' || user?.img == undefined ? (
                            <img src={'/images/user.png'} key={'/images/user.png'} alt='' className="frmr-profile-img" />
                          ) : (
                            <img src={`${SERVER_URL}/${user?.img}`} key={`${SERVER_URL}/${user?.img}`} alt='' className="frmr-profile-img" />
                          )
                        }
                      </div>
                    </div>
                    <div className="farmer-info-box">
                      <div className="frmr-name-tag">
                        <h4 className="frmr-name-h4">{user?.name}</h4>
                        <div className="frmr-title-p">{user?.type}</div>
                      </div>
                      <div className="frmr-profile-infos">
                        <ul role="list" className="frmr-profile-info-list">
                          <li className="frmr-profile-info-list-item">
                            <div className="frmr-profile-info-item-wrapper">
                              <h5 className="frmr-profile-info-item-title-h3"><span className="text-span-2"></span>Phone</h5>
                              <div className="frmr-profile-info-item-data-p">{user?.phone}</div>
                            </div>
                          </li>
                          <li className="frmr-profile-info-list-item">
                            <div className="frmr-profile-info-item-wrapper">
                              <h5 className="frmr-profile-info-item-title-h3"><span className="text-span-2"></span>NID</h5>
                              <div className="frmr-profile-info-item-data-p">{user?.nid}</div>
                            </div>
                          </li>
                          <li className="frmr-profile-info-list-item">
                            <div className="frmr-profile-info-item-wrapper">
                              <h5 className="frmr-profile-info-item-title-h3"><span className="text-span-2"></span>Birth Date</h5>
                              <div className="frmr-profile-info-item-data-p">{user?.birth_date}</div>
                            </div>
                          </li>
                          <li className="frmr-profile-info-list-item">
                            <div className="frmr-profile-info-item-wrapper">
                              <h5 className="frmr-profile-info-item-title-h3"><span className="text-span-2"></span>Address</h5>
                              <div className="frmr-profile-info-item-data-p">{user?.address}</div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div style={{ marginBottom: '20px', marginTop: '10px' }}>
                        <Button onClick={() => setUserUpdateDialog(true)} color='success' variant='outlined'>Edit Info</Button>
                      </div>
                    </div>
                  </div>
                  <div className="frmr-other-part">
                    <div className='tab-wrapper'>
                      <div className="w-layout-hflex frmr-tab-link-container">
                        <div className="frmr-tab-link-wrapper" >
                          <a className={end_pathname == "dashboard" ? "fpd-tab-link active" : "fpd-tab-link"} onClick={(e) => frmrTabClickAction(e)}>Business Analytics</a>
                        </div>
                        <div className="frmr-tab-link-wrapper">
                          <a className={urlPath.includes("trader/dashboard/products") ? "fpd-tab-link active" : "fpd-tab-link"} onClick={(e) => frmrTabClickAction(e)}>Buy Products</a>
                        </div>
                        <div className="frmr-tab-link-wrapper">
                          <a className={urlPath.includes("trader/dashboard/stocks") ? "fpd-tab-link active" : "fpd-tab-link"} onClick={(e) => frmrTabClickAction(e)}>Stocked Products</a>
                        </div>
                        <div className="frmr-tab-link-wrapper">
                          <a className={end_pathname == "transactions" ? "fpd-tab-link active" : "fpd-tab-link"} onClick={(e) => frmrTabClickAction(e)}>Transaction</a>
                        </div>
                        {/* <div className="frmr-tab-link-wrapper">
                      <a className="fpd-tab-link" onClick={(e) => frmrTabClickAction(e)}>Traders</a>
                    </div> */}
                      </div>

                    </div>
                    <div className="frmr-tab-container" style={{
                      maxWidth: "100%",
                    }}>
                      {children}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Suspense fallback={<Loading />}>

              <Dialog
                open={userUpdateDialog}
                onClose={() => setUserUpdateDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Update Profile Information"}
                </DialogTitle>
                <DialogContent>
                  <form style={{ width: '410px' }}>
                    <TextField
                      style={{ width: "400px", margin: "5px" }}
                      type="text"
                      label="Name"
                      name='name'
                      value={user?.name}
                      onChange={(e) => {
                        setUser(ex => ({
                          ...ex,
                          name: e.target.value
                        }))
                      }}
                      variant="outlined"
                    />
                    <br />
                    <TextField
                      style={{ width: "400px", margin: "5px" }}
                      type="text"
                      label="Phone Number"
                      value={user?.phone}
                      onChange={(e) => {
                        setUser(ex => ({
                          ...ex,
                          phone: e.target.value
                        }))
                      }}
                      name='phone'
                      variant="outlined"
                    />
                    <br />
                    <TextField
                      style={{ width: "400px", margin: "5px" }}
                      type="text"
                      label="NID"
                      name='nid'
                      onChange={(e) => {
                        setUser(ex => ({
                          ...ex,
                          nid: e.target.value
                        }))
                      }}
                      value={user?.nid}
                      variant="outlined"
                    />
                    <br />
                    <TextField
                      style={{ width: "400px", margin: "5px" }}
                      type="date"
                      focused
                      label="Birth Date"
                      value={user?.birth_date}
                      onChange={(e) => {
                        setUser(ex => ({
                          ...ex,
                          birth_date: e.target.value
                        }))
                      }}
                      name='birth_date'
                      variant="outlined"
                    />
                    <br />
                    <TextField
                      style={{ width: "400px", margin: "5px" }}
                      type="text"
                      label="Address"
                      value={user?.address}
                      onChange={(e) => {
                        setUser(ex => ({
                          ...ex,
                          address: e.target.value
                        }))
                      }}
                      name='address'
                      variant="outlined"
                    />
                    <div style={{ padding: '10px 10px 0px' }}>
                      <label htmlFor='img-upload' style={{ marginBottom: '5px' }}>Upload Profile Image</label> <br />
                      <input type='file' id='img-upload'
                        onChange={(e) => {
                          setUser(ex => ({
                            ...ex,
                            img: e.target.files[0]
                          }))
                          // setProfileImgInfo(e.target.files?.[0])
                        }}
                      />
                    </div>

                  </form>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setUserUpdateDialog(false)}>Cancel</Button>
                  <Button onClick={() => {
                    UpdateProfileInfo(user)
                    GetUser()
                    setUserUpdateDialog(false)
                  }}
                    autoFocus>
                    Update
                  </Button>
                </DialogActions>
              </Dialog>
            </Suspense>


          </section>
        </UserContext.Provider>

      </ThemeProvider>
    )
  }
  return (
    <>
      <Loader open={isLoad} />
    </>
  )
}

export default DashboardLayout