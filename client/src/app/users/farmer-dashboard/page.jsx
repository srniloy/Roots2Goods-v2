'use client'
import '@styles/farmer-dashboard.css'
import React, { useContext } from 'react';

import {IconButton} from '@mui/material';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BusinessAnalytics from '@components/BusinessAnalytics';
// import FrmrProjects from '@components/farmer/FrmrProjects';
// import Transactions from '@components/farmer/Transactions';
// import Searching from '@components/farmer/Searching';
import LogoutIcon from '@mui/icons-material/Logout';

import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Button, FormControl, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getUserInfo, logoutAction, uploadImg } from './request-manager';
import { useRouter } from 'next/navigation';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import { ProfileInfoUpdate } from './request-manager';


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
import UserContext from '@context/userContext';
import { Suspense } from 'react';
import Loading from './loading';
import { Loader } from '@app/loading';
import { HandleLogout } from '@services/auth';


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








const FarmerDashboard = () => {
  
  const {user, setUser} = useContext(UserContext)
  let router = useRouter()
  const [isLoad, setIsLoader] = React.useState(true); 
  const [profileImgInfo, setProfileImgInfo] = React.useState(undefined)


  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  React.useEffect(() => {
    if(user){
      setIsLoader(false)
      setTabContainer([
        <Suspense fallback={<Loading/>}>
          <BusinessAnalytics info={{user_id: user.id}}/>
        </Suspense>
        ])
    }
  }, [user]);

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

  const [tabContainer, setTabContainer] = React.useState();

  const frmrTabClickAction = (e)=>{
    const allTabs = document.querySelectorAll('.frmr-tab-link-container .fpd-tab-link');

    allTabs.forEach(element => {
      if(element.classList.contains("active")){
        element.classList.remove("active");
      }
    });
    e.target.classList.add("active");

    // if(e.target.innerHTML == "Business Analytics"){
    //   setTabContainer(
    //     <Suspense fallback={<Loading/>}>
    //       <BusinessAnalytics info={{user_id: user.id}}/>
    //     </Suspense>
    //   );
    // }
    // else if(e.target.innerHTML == "Projects"){
    //   setTabContainer(
    //     <Suspense fallback={<Loading/>}>
    //       <FrmrProjects user_id={user.id}/>
    //     </Suspense>
    //   );
    // }
    // else if(e.target.innerHTML == "Transaction"){
    //   setTabContainer(
    //     <Suspense fallback={<Loading/>}>
    //       <Transactions info={{user_id: user?.id}}/>
    //     </Suspense>
    //   );
    // }
    // else if(e.target.innerHTML == "Traders"){
    //   setTabContainer(
    //     <Suspense fallback={<Loading/>}>
    //       <Searching/>
    //     </Suspense>
    //   );
    // }

  }

  const [userUpdateDialog, setUserUpdateDialog] = React.useState(false)

  return (
    <section className="farmer-dashboard">
      <Loader open={isLoad}/>
    <div className="fd-header">
      <div className="w-layout-blockcontainer fd-nav-container w-container">
        <div className="w-layout-hflex fd-nav-flex-box">
          {/* <h1 className="fd-nav-heading-h1">Harvest Hive</h1> */}
          <img src="/images/logo.png" alt="logo" 
          style={{
            height: '70px'
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
              <div style={{minHeight: "400px", width: '400px'}}>

                <div style={{
                  display:'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '20px 10px 20px 30px',
                }}>
                  <h5 style={{margin: 0}}>Notification</h5>
                  <IconButton onClick={handleCloseUserMenu}><CloseIcon/></IconButton>
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

              <Tooltip title='Logout'>
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
                  <LogoutIcon className='fd-nav-icon'/>
                </IconButton>
              </Tooltip>
            
          </ul>
        </div>
      </div>
    </div>
    <div className="fd-main-part">
      <div className="w-layout-blockcontainer fd-container w-container">
        <div className="w-layout-hflex farmer-dashboard-flex">
          <div className="frmr-profile-part">
            <div className="frmr-profile-img-style">
              {/* <img src="/images/bangla.png" className="frmr-profile-img"/> */}
              <div className="frmr-profile-img-wrapper">

                <img src={`/images/${user?.img}`} key={`/images/${user?.img}`} alt='' className="frmr-profile-img"/>
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
              <div style={{marginBottom: '20px', marginTop: '10px'}}>
                <Button onClick={()=> setUserUpdateDialog(true)} color='success' variant='outlined'>Edit Info</Button>
              </div>
            </div>
          </div>
          <div className="frmr-other-part">
            <div className="w-layout-hflex frmr-tab-link-container">
              <div className="frmr-tab-link-wrapper" >
                <a className="fpd-tab-link active" onClick={(e) => frmrTabClickAction(e)}>Business Analytics</a>
              </div>
              <div className="frmr-tab-link-wrapper">
                <a className="fpd-tab-link" onClick={(e) => frmrTabClickAction(e)}>Projects</a>
              </div>
              <div className="frmr-tab-link-wrapper">
                <a className="fpd-tab-link" onClick={(e) => frmrTabClickAction(e)}>Transaction</a>
              </div>
              {/* <div className="frmr-tab-link-wrapper">
                <a className="fpd-tab-link" onClick={(e) => frmrTabClickAction(e)}>Traders</a>
              </div> */}
            </div>
            <div className="frmr-tab-container" style={{
              maxWidth: "100%",
            }}>
              {tabContainer}
            </div>
          </div>
        </div>
      </div>
    </div>

    <Suspense fallback={<Loading/>}>

      <Dialog
          open={userUpdateDialog}
          onClose={()=> setUserUpdateDialog(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          >
              <DialogTitle id="alert-dialog-title">
              {"Update Profile Information"}
              </DialogTitle>
              <DialogContent>
                  <form style={{width: '410px'}}>
                      <TextField
                      style={{ width: "400px", margin: "5px" }}
                      type="text"
                      label="Name"
                      name='name'
                      value={user?.name}
                      onChange={(e)=> {
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
                      onChange={(e)=> {
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
                      onChange={(e)=> {
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
                      onChange={(e)=> {
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
                      onChange={(e)=> {
                        setUser(ex => ({
                          ...ex,
                          address: e.target.value
                        }))
                      }}
                      name='address'
                      variant="outlined"
                      />
                      <div style={{padding: '10px 10px 0px'}}>
                        <label for='img-upload' style={{marginBottom: '5px'}}>Upload Profile Image</label> <br/>
                        <input type='file' id='img-upload' 
                        onChange={(e)=> {
                          setUser(ex => ({
                            ...ex,
                            img: e.target.files[0].name
                          }))
                          setProfileImgInfo(e.target.files?.[0])
                        }}
                        />
                      </div>
                      
                  </form>
              </DialogContent>
              <DialogActions>
              <Button onClick={()=> setUserUpdateDialog(false)}>Cancel</Button>
              <Button onClick={()=> {
                      ProfileInfoUpdate(user)
                      uploadImg(profileImgInfo)
                      setUserUpdateDialog(false)
                  }}
                  autoFocus>
                  Update
              </Button>
              </DialogActions>
          </Dialog>
        </Suspense>


  </section>
  )
}

export default FarmerDashboard