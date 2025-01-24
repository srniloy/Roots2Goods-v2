'use client'
import React from 'react';
import { Button, createTheme, Stack, ThemeProvider, Typography } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import '@styles/farmer-dashboard.css'
import { Suspense } from 'react';
import Loading from '@app/loading';
// import BuyingTable from '@components/trader/BuyingTable';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import InventoryIcon from '@mui/icons-material/Inventory';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import moment from 'moment';
import ProductSalesTable from '../_components/product_sales_table';
import UserContext from '@context/userContext';
import { GetUserData } from '@services/fd-service/dashboard_service';
import { GetProductDetails } from '@services/wd-service/dashboard_service';


const productsImg = [
  {label: 'Tometo', img: 'tometo.jpg', coverImg: 'tometo_cover.jpg'},
  {label: 'Onion', img: 'onion.jpg', coverImg: 'onion-cover.jpg'},
  {label: 'Eggplant'},
  {label: 'Carrots'},
  {label: 'Cabbage', img: 'image-asset.jpeg', coverImg: 'cabbage.jpg'},
  {label: 'Chilli'},
  {label: 'Watermelon'},
  {label: 'Potato', img: 'poteto.webp', coverImg: 'poteto-cover.jpg'},
]

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;


const ProjectDetails = ({params}) => {
  const {sales_id} = React.use(params)
  const [productDetails, setProductDetails] = React.useState(undefined)
  const [user, setUser] = React.useState(undefined)



  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#1d3133',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));




  const setTheDetailsOfProduct = async ()=>{
    const res = await GetProductDetails(sales_id)
    if(res.status == 200){
      setProductDetails(res.data)
      console.log(res.data);
    }else{
      alert(res.message)
    }
  }

    async function GetUser() {
      const userData = await GetUserData("Wholesaler");
      setUser(userData)
    }

    React.useEffect(() => {
    GetUser()
    setTheDetailsOfProduct()
  }, []);




  return (
    <ThemeProvider theme={createTheme({ palette: { mode: "dark" } })}>
        <UserContext.Provider value={{ user, setUser }}>
    <section className="frmr-project-detail-main">
      <Suspense fallback={<Loading open={true}/>}> 


      <div className="fpd-cover-img-box">
      <div style={{backgroundColor: '#00000050', height: '300px', width: '100%', position: 'absolute'}}></div>
      <img src={`/images/${(productDetails?.stock_id?.product_name || '').toLowerCase()}-cover.jpg`}
      
      style={{height: '100%', width: '100%', objectFit: 'cover'}} alt="" srcSet="" />
      </div>
      <div className="w-layout-blockcontainer fpd-other-part-container w-container">
        <h1 className="fpd-project-detail-heading" style={{marginTop: '10px'}}>{productDetails?.stock_id?.product_name} </h1>
        <div className="fpd-basic-info" style={{marginTop: '50px', marginBottom: '50px'}}>
          <Stack direction={'row'} gap={'20px'}>




                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <div style={{backgroundColor: '#244441' ,
                  display: 'flex',
                  gap: '10px', 
                  padding: '20px 30px',
                  borderRadius: '10px'
                  }}>
                    <AccountBoxIcon fontSize='large' style={{color: '#f7c35f'}}/>
                    <div>
                      <h6 style={{color: "#f7c35a", fontWeight: 'bold'}}>Trader Name</h6>
                      <p style={{margin: '0', color: '#eee'}}>{productDetails?.stock_id?.owner?.name}</p>
                    </div>
                  </div>
                </div>

                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <div style={{backgroundColor: '#244441' ,
                  display: 'flex',
                  gap: '10px', 
                  padding: '20px 30px',
                  borderRadius: '10px'
                  }}>
                    <LocationOnIcon fontSize='large' style={{color: '#f7c35f'}}/>
                    <div>
                      <h6 style={{color: "#f7c35a", fontWeight: 'bold'}}>Location</h6>
                      <p style={{margin: '0', color: '#eee'}}>{productDetails?.stock_id?.owner?.address}</p>
                    </div>
                  </div>
                </div>

                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <div style={{backgroundColor: '#244441' ,
                  display: 'flex',
                  gap: '10px', 
                  padding: '20px 30px',
                  borderRadius: '10px'
                  }}>
                    <CalendarMonthIcon fontSize='large' style={{color: '#f7c35f'}}/>
                    <div>
                      <h6 style={{color: "#f7c35a", fontWeight: 'bold'}}>Experience</h6>
                      <p style={{margin: '0', color: '#eee'}}>{
                        moment.utc(productDetails?.stock_id?.owner?.createdAt).fromNow(true)
                    }</p>
                    </div>
                  </div>
                </div>


                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <div style={{backgroundColor: '#244441' ,
                  display: 'flex',
                  gap: '10px', 
                  padding: '20px 30px',
                  borderRadius: '10px'
                  }}>
                    <ContactPhoneIcon fontSize='large' style={{color: '#f7c35f'}}/>
                    <div>
                      <h6 style={{color: "#f7c35a", fontWeight: 'bold'}}>Phone Number</h6>
                      <p style={{margin: '0', color: '#eee'}}>{productDetails?.stock_id?.owner?.phone}</p>
                    </div>
                  </div>
                </div>
          </Stack>
          {/* <Grid container spacing={2}>

              


            <Grid xs={3}>
                
            </Grid>

            <Grid xs={3}>
                
            </Grid>

            <Grid xs={3}>
                
            </Grid>

            <Grid xs={3}>
                
            </Grid>
          </Grid> */}
        </div>
        <div className="w-layout-hflex fpd-tab-link-container">
          <div className="fpd-tab-links" style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
            
          <Typography variant='h5' style={{padding: '10px 20px', color: 'var(--yellow)', fontFamily: 'Roboto-bold'}}>Sales</Typography>
          </div>
        </div>
        <div className="fpd-project-details-tab-container">

        {/* <BuyingTable product_id={product_id}/> */}
        <ProductSalesTable productDetails={productDetails}/>
        
        </div>
      </div>
      </Suspense>



  </section>
  </UserContext.Provider>
  </ThemeProvider>
  )
}



export default ProjectDetails






