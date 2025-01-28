'use client';
import React from 'react'
import '@styles/billing.css'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { createTheme, Stack, ThemeProvider, Tooltip } from '@mui/material';
import TransportSelect from '../transport-select/page';
import AppMap from '../_components/AppMap';
import { ChakraProvider, theme, useStatStyles } from '@chakra-ui/react'
import PaymentsIcon from '@mui/icons-material/Payments';
import PaidIcon from '@mui/icons-material/Paid';
import { ConfirmOrder, ConfirmWholesalerOrder, GetOrderInfo, GetPercentage, GetWholeSalerOrderInfo, OrderCancellation } from '@services/td-service/product_service';
import { red } from '@mui/material/colors';
import '@styles/globals.css'

// { transportInfo, setTransportInfo }


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const Billing = ({params}) => {
    const router = useRouter()
    const {order_id} = React.use(params)
  const [addTransport, setAddTransport] = React.useState(false)


  React.useEffect(() => {
    if(addTransport){
        const checkout = document.querySelector('#transport')
        checkout?.classList.add('transportation-select')
    }
    else{
        const checkout = document.querySelector('#transport')
        checkout?.classList.remove('transportation-select')
    }
  }, [addTransport]);

/* 


*/

  const [transportInfo, setTransportInfo] = React.useState(
    {
        type: '',
        from: '',
        to: '',
        distance: 0,
        cost: 0,
    }
  )

  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };






//   ===================================              API CALLS            =======================================================================================

const [orderDetails, setOrderDetails] = React.useState()

const [overPriced, setOverPriced] = React.useState(false)

const checkPriceBound = async (order_info)=>{
    const cost = (order_info.stock_id.amount + order_info.stock_id.transport_cost)/order_info.stock_id.quantity;
    const sale_price = order_info.offer_id.price
    const res = await GetPercentage(order_info.stock_id.product_name)
    
    const percent = cost + (cost*res.data.percentage)
    console.log(sale_price);
    console.log(percent);
    console.log(sale_price > percent);
    if(sale_price > percent){
        setOverPriced(true)
    }
}   


const fetchData = async ()=>{
    const res = await GetWholeSalerOrderInfo(order_id)
    if(res.status == 200){
        setOrderDetails(res.data)
        checkPriceBound(res.data)
    }else{
        alert(res.message)
    }
    // setIsLoad(false)
}

React.useEffect(() => {
    fetchData()
}, []);






const confirmOrder = async ()=>{
    const data = {
        order_id: order_id,
        transportInfo: transportInfo,
        orderDetails: orderDetails
    }
    console.log(data);
    const res = await ConfirmWholesalerOrder(data)
    if(res.status == 200)
        console.log(res.data);
        router.push('/users/trader/dashboard')
}


const cancelOrder = async ()=>{
    const res = await OrderCancellation(orderDetails._id)
    if(res.status){
        router.push('/users/trader/dashboard')
    }else{
        alert(res.message)
    }
}






  const [mapDialog, setMapDialog] = React.useState(true)

  if (mapDialog) {

  return (
    <section>
        <div className="container billing-page" style={{marginTop: '30px'}}>
            <h2 style={{color: '#f7c35f', marginLeft: '10px', marginBottom: '20px'}}>Order Procedure</h2>
        <div className="row">
            <div className="col-xl-8">

                <div className="card">
                    <div className="card-body">
                        <ol className="activity-checkout mb-0 px-4 mt-3">
                            
                            <li className="checkout-item" id='transport'>
                                <div className="avatar checkout-icon p-1">
                                    <div className="avatar-title rounded-circle bg-primary">
                                        <LocalShippingIcon/>
                                    </div>
                                </div>
                                <div className="feed-item-list">
                                    <div>
                                        <h5 className="font-size-18 mb-1">Transportation</h5>
                                        <p className="text-muted text-truncate mb-4">Select transport vehicle</p>
                                        <div className="mb-3 transprot-add-button" style={{display: 'flex', gap: '20px'}}>
                                            <Button variant='outlined' onClick={()=> setMapDialog(false)} color='primary' startIcon={<LocalShippingIcon color='primary'/>}>Add Transport</Button>
                                            <Button variant='outlined' color='primary' startIcon={<RemoveCircleIcon color='primary'/>}
                                                onClick={()=>{
                                                    setAddTransport(false)
                                                    setTransportInfo(
                                                        {
                                                            type: '',
                                                            from: '',
                                                            to: '',
                                                            distance: 0,
                                                            cost: '0',
                                                        }
                                                    )
                                                }}
                                            >Remove Transport</Button>

                                        </div>


                                            {
                                                addTransport ? 
                                            
                                            <div className="col-lg-7 col-sm-6">
                                                <div data-bs-toggle="collapse">
                                                    <label className="card-radio-label">
                                                        <input type="radio" name="pay-method" id="pay-methodoption1" className="card-radio-input"/>
                                                        <span className="card-radio py-3 text-truncate">
                                                            <Stack>
                                                            
                                                                <Typography><b>Vehicle: </b><span>{transportInfo.type}</span></Typography>
                                                                <Typography><b>From: </b><span>{transportInfo.from}</span></Typography>
                                                                <Typography><b>To: </b><span>{transportInfo.to}</span></Typography>
                                                                <Typography><b>Distance: </b><span>{transportInfo.distance} km</span></Typography>
                                                                <Typography><b>Cost: </b><span>{transportInfo.cost} Taka</span></Typography>
                                                            </Stack>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                            : ''
                                            }

                                            





                                    </div>
                                </div>
                            </li>
                            <li className="checkout-item">
                                <div className="avatar checkout-icon p-1">
                                    <div className="avatar-title rounded-circle bg-primary">
                                        <PaymentsIcon/>
                                    </div>
                                </div>
                                <div className="feed-item-list">
                                    <div>
                                        <h5 className="font-size-18 mb-1">Payment Info</h5>
                                        <p className="text-muted text-truncate mb-4">Select your preferable payment option</p>
                                    </div>
                                    <div>
                                        <h5 className="font-size-14 mb-3">Payment method :</h5>
                                        <div className="row">
                                            <div className="col-lg-3 col-sm-6">
                                                <div data-bs-toggle="collapse">
                                                    <label className="card-radio-label">
                                                        <input type="radio" name="pay-method" id="pay-methodoption1" className="card-radio-input"/>
                                                        <span className="card-radio cash py-3 text-center text-truncate">
                                                            <i className="d-block h7 mb-3"><PaidIcon fontSize='large'/></i>
                                                            Cash
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                            
                                            <div className="col-lg-3 col-sm-6">
                                                <div>
                                                {/* <Tooltip title={'Not available yet'}>

                                                    <label className="card-radio-label">
                                                        <input type="radio" name="pay-method" id="pay-methodoption2" className="card-radio-input"/>
                                                        <span className="card-radio py-3 text-center text-truncate" style={{color: '#aaa !important', borderColor: '#aaa !important'}}>
                                                            Bkash
                                                        </span>
                                                    </label>
                                                    </Tooltip> */}

                                                </div>
                                            </div>

                                            <div className="col-lg-3 col-sm-6">
                                                <div>
                                                        {/* <Tooltip title={'Not available yet'}>
                                                    <label className="card-radio-label">
                                                        <input type="radio" name="pay-method" id="pay-methodoption3" className="card-radio-input"/>

                                                        <span className="card-radio py-3 text-center text-truncate" style={{color: '#aaa !important', borderColor: '#aaa !important'}}>
                                                            Nogod
                                                        </span>
                                                    </label>
                                                        </Tooltip> */}
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ol>
                    </div>
                </div>

                
            </div>
            <div className="col-xl-4">
                <div className="card checkout-order-summary">
                    <div className="card-body">
                        <div className="p-3 mb-3" style={{backgroundColor: '#344c31', borderRadius: '10px'}}>
                        <h5 className="font-size-16 mb-0">Order Summary <span className="float-end ms-2 billing-order-id">#{order_id}</span></h5>
                        <p className='phone-billing-order-id' style={{display: 'none', marginTop: '10px'}}>#{order_id}</p>
                        </div>
                        <div className="table-responsive order-table-wrapper">
                            <table className="table table-centered mb-0 table-nowrap order-table">
                                <thead>
                                    <tr>
                                        <th className="border-top-0" style={{width: '110px'}} scope="col">Product</th>
                                        <th className="border-top-0" scope="col">Quantity</th>
                                        <th className="border-top-0" scope="col">Per Kg</th>
                                        <th className="border-top-0" scope="col">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">{orderDetails?.stock_id.product_name}</th>
                                        <td>
                                            {orderDetails?.offer_id.quantity} kg
                                        </td>
                                        <td>{orderDetails?.offer_id.price}</td>
                                        <td>{(orderDetails?.offer_id.amount)?.toLocaleString('en-US')}</td>
                                    </tr>
                                    
                                    <tr>
                                        <td></td>
                                        <td colSpan="2">
                                            Sub Total :
                                        </td>
                                        <td>
                                            {(orderDetails?.offer_id.amount)?.toLocaleString('en-US')}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td colSpan="2">
                                            Transportation:
                                        </td>
                                        <td>
                                            {transportInfo.cost.toLocaleString('en-US')}
                                        </td>
                                    </tr>
                                                                
                                        
                                    <tr className="">
                                        <td></td>
                                        <td colSpan="2">
                                            Total:
                                        </td>
                                        <td>
                                            {(orderDetails?.offer_id.amount+transportInfo.cost).toLocaleString('en-US')}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            
                        </div>
                    </div>
                </div>
                <div>
                    {
                        overPriced? (
                            <div>
                                <p className='color-red' style={{fontSize: '16px', fontWeight: 'bold'}}>Profit Limit Exceed By 15%</p> 
                                <p style={{fontSize: '16px'}}>Wait for the admin approval.</p> 
                            </div>
                        ) : ''
                    }
                    
                </div>
                <div style={{width: '100%', display:'flex',gap: "20px", flexDirection:'row-reverse'}}>
                    <Button variant='contained' style={{color: '#ececec'}} disabled={overPriced} color='success'
                        onClick={()=>{
                            confirmOrder()
                            
                        }}
                    >Confirm</Button>
                    <Button variant='outlined' color='error'
                            onClick={()=>{
                                cancelOrder()
                            }}
                        >Cancel</Button>
                </div>
            </div>

        </div>


        
        
    </div>
    
    </section>
  )
            }
        else{
            return(
                <ThemeProvider theme={createTheme({ palette: { mode: "dark" } })}>
                <div style={{height: 'calc(100vh - 64px)', width: '100%'}}>
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="close"
                            onClick={() => setMapDialog(true)}
                            >
                            <CloseIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Select Transportation
                            </Typography>
                            <Button autoFocus variant={'contained'} color={'primary'} onClick={() => {
                                setAddTransport(true)
                                setMapDialog(true)
                            }}>
                            Add
                            </Button>
                        </Toolbar>
                        </AppBar>
                        <div style={{height: '100%', width: '100%', overflow:'hidden'}}>

                        <ChakraProvider theme={theme}>
                            <AppMap transportInfo={transportInfo} setTransportInfo={setTransportInfo} />
                        </ChakraProvider>
                        </div>
                </div>
                </ThemeProvider>
            )
        }
}

export default Billing