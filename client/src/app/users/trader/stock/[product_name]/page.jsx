'use client'
import React from 'react';
import { Button, createTheme, Stack, ThemeProvider } from '@mui/material';
// import ExpenseTable from '@components/ExpenseTable';
// import SellingTable from '@components/trader/SellingTable';
import AddIcon from '@mui/icons-material/Add';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import '@styles/farmer-dashboard.css'
import { Suspense } from 'react';
import Loading from '@app/loading';
// import SlotTable from '@components/trader/SlotTable';


import Slide from '@mui/material/Slide';
import UserContext from '@context/userContext';
import { useEffect } from 'react';
import { GetUserData } from '@services/fd-service/dashboard_service';
import { GetStockedSlots } from '@services/td-service/product_service';



const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    editable: false,
    renderCell: (params) => {
      return (<Button onClick={() => alert("congratulation!")}>Done</Button>)
    }
  },
];



const ProjectDetails = ({ params }) => {
  const {product_name} = React.use(params)
  const [ user, setUser ] = React.useState({})
  const [total, setTotal] = React.useState({ total_costs: 0, total_revenue: 0, total_stocked: 0, total_profit: 0 })
  const [stockSlotsInfo, setStockSlotsInfo] = React.useState([])
  const [slotSalesInfo, setSlotSalesInfo] = React.useState([])
  const [stockSales, setStockSales] = React.useState({
    quantity: '',
    price: '',
    collection_date: '',
    status: 'Pending',
    stock_id: '',
  })




  













  const [tabContainer, setTabContainer] = React.useState([
    // <Suspense fallback={<Loading />}>
    //   <SlotTable product={params.product} total={{ total, setTotal }} slotInfo={{ setStockSlotsInfo }} />
    // </Suspense>
  ]);
  const [tabState, setTabState] = React.useState('Slots')

  const fpdTabClickAction = (e) => {
    e.preventDefault()
    const allTabs = document.querySelectorAll('.fpd-tab-link-container a');

    allTabs.forEach(element => {
      if (element.classList.contains("active")) {
        element.classList.remove("active");
      }
    });
    e.target.classList.add("active");

    // if (e.target.innerHTML == "Slots") {
    //   setTabContainer([
    //     <Suspense fallback={<Loading />}>
    //       <SlotTable product={params.product} total={{ total, setTotal }} slotInfo={{ setStockSlotsInfo }} />
    //     </Suspense>
    //   ]);
    //   setTabState("Slots");
    // }
    // else if (e.target.innerHTML == "Selling") {
    //   setTabContainer([
    //     <Suspense fallback={<Loading />}>
    //       <SellingTable product={params.product} total={{ total, setTotal }} slotInfo={{ stockSlotsInfo }} salesInfo={{ setSlotSalesInfo }} />
    //     </Suspense>
    //   ]);
    //   setTabState("Selling");
    // }

  }


  const [openAddExpenseRow, setOpenAddExpenseRow] = React.useState(false);

  const handleClickOpenAddExpenseRow = () => {
    setOpenAddExpenseRow(true);
  };

  const handleCloseAddExpenseRow = () => {
    setOpenAddExpenseRow(false);
  };

  const [openAddSalesRow, setOpenAddSalesRow] = React.useState(false);

  const handleClickOpenAddSalesRow = () => {
    setOpenAddSalesRow(true);
  };

  const handleCloseAddSalesRow = () => {
    setOpenAddSalesRow(false);
  };


  const [addSalesData, setAddSalesData] = React.useState({
    quantity: '',
    price: '',
    status: 'Ready To Sell',
    slot_id: '',

  })

  const [slots, setSlots] = React.useState(undefined)

  React.useEffect(() => {
    const avgPrice = parseInt((stockSlotsInfo[slots - 1]?.amount + parseInt(stockSlotsInfo[slots - 1]?.transport_cost?.split(' ')[0])) / stockSlotsInfo[slots - 1]?.quantity)
    setAddSalesData(ex => ({
      ...ex,
      slot_id: stockSlotsInfo[slots - 1]?.slot_id,
      quantity: stockSlotsInfo[slots - 1]?.quantity,
      price: avgPrice,
    }))
  }, [slots])


  const addSales = async () => {
    console.log(addSalesData)
    const postData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addSalesData),
    };

    const res = await fetch(
      '/api/users/trader/add/add_trader_sales',
      postData
    )
    const response = await res.json()
  }

  const calculateTotal = ()=>{
    stockSlotsInfo.map(stock=>{
      setTotal(ex=>({
        ...ex,
        total_costs: total.total_costs+stock?.amount + stock?.transport_cost,
        total_stocked: total.total_stocked+stock?.quantity,
        total_costs: total.total_costs+stock?.amount + stock?.transport_cost,
      }))
    })
  }


  const fetchStocks = async (userData)=>{
    const res = await GetStockedSlots({product_name, user_id: userData?._id})
    if(res.status == 200){
      setStockSlotsInfo(res.data)
      console.log(res.data)
    }else{
      alert(res.message)
    }
  }

  async function GetUser() {
    const userData = await GetUserData("Trader");
    setUser(userData)
    fetchStocks(userData)
  }


  useEffect(() => {
    GetUser()
    // fetchStocks() On the GetUser
  }, []);

  return (
  <ThemeProvider theme={createTheme({ palette: { mode: "dark" } })}>
    <UserContext.Provider value={{ user, setUser }}>
    <section className="frmr-project-detail-main">
      <div className="fpd-cover-img-box"
      >
        <div style={{ backgroundColor: '#00000050', height: '300px', width: '100%', position: 'absolute' }}></div>
        <img src={`/images/${product_name.toLowerCase()}-cover.jpg`}

          style={{ height: '100%', width: '100%', objectFit: 'cover' }} alt="" srcSet="" />
      </div>
      <div className="w-layout-blockcontainer fpd-other-part-container w-container">
        <h1 className="fpd-project-detail-heading">{product_name} </h1>
        <div className="fpd-basic-info">
          {/* <div className="w-layout-hflex fpd-bi-flex fpd-project-info-top-bar">
            <div className="fpd-bi-info-item">
              <img src="/images/investing.png" loading="lazy" alt="" className="image-2" />
              <div className="fpd-bi-divider"></div>
              <div className="fpd-bi-item-value-wrapper">
                <h4 className="fpd-bi-item-h4">Product</h4>
                <div className="fpd-bi-item-value">Cabbage</div>
              </div>
            </div>
            <div className="fpd-bi-info-item"><img src="/images/investing.png" loading="lazy" alt="" className="image-2" />
              <div className="fpd-bi-divider"></div>
              <div className="fpd-bi-item-value-wrapper">
                <h4 className="fpd-bi-item-h4">Seedling</h4>
                <div className="fpd-bi-item-value">10000</div>
              </div>
            </div>
            <div className="fpd-bi-info-item"><img src="/images/investing.png" loading="lazy" alt="" className="image-2" />
              <div className="fpd-bi-divider"></div>
              <div className="fpd-bi-item-value-wrapper">
                <h4 className="fpd-bi-item-h4">Land</h4>
                <div className="fpd-bi-item-value">5 Acr</div>
              </div>
            </div>
            <div className="fpd-bi-info-item"><img src="/images/investing.png" loading="lazy" alt="" className="image-2" />
              <div className="fpd-bi-divider"></div>
              <div className="fpd-bi-item-value-wrapper">
                <h4 className="fpd-bi-item-h4">Starting Time</h4>
                <div className="fpd-bi-item-value">20 July, 2023</div>
              </div>
            </div>
          </div> */}
          <div className="w-layout-hflex fpd-total-calculations">
            <div className="fpd-calc-item">
              <div className="w-layout-hflex fpd-total-calc-flex"><img src="/images/investing.png" loading="lazy" alt="" className="fpd-total-calc-icons" />
                <div className="fpd-total-calc-text">
                  <h5 className="fpd-total-calc-h4">Total Costs</h5>
                  <h4 className="fpd-total-calc-h5">{parseInt(total.total_costs).toLocaleString('en-us')} <span className="fpd-total-calc-h5-span"></span></h4>
                </div>
              </div>
            </div>
            <div className="fpd-calc-item">
              <div className="w-layout-hflex fpd-total-calc-flex"><img src="/images/acquisition.png" loading="lazy" alt="" className="fpd-total-calc-icons" />
                <div className="fpd-total-calc-text">
                  <h5 className="fpd-total-calc-h4">Total Revenue</h5>
                  <h4 className="fpd-total-calc-h5">{parseInt(total.total_revenue).toLocaleString('en-us')} <span className="fpd-total-calc-h5-span"></span></h4>
                </div>
              </div>
            </div>
            <div className="fpd-calc-item">
              <div className="w-layout-hflex fpd-total-calc-flex"><img src="/images/revenue.png" loading="lazy" alt="" className="fpd-total-calc-icons" />
                <div className="fpd-total-calc-text">
                  <h5 className="fpd-total-calc-h4">Total Profit</h5>
                  <h4 className="fpd-total-calc-h5">{parseInt(total.total_revenue) - parseInt(total.total_costs)}<span className="fpd-total-calc-h5-span"></span></h4>
                </div>
              </div>
            </div>
            <div className="fpd-calc-item">
              <div className="w-layout-hflex fpd-total-calc-flex"><img src="/images/stock.png" loading="lazy" alt="" className="fpd-total-calc-icons" />
                <div className="fpd-total-calc-text">
                  <h5 className="fpd-total-calc-h4">Total Stocked</h5>
                  <h4 className="fpd-total-calc-h5">{parseInt(total.total_stocked).toLocaleString('en-us')} Kg</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-layout-hflex fpd-tab-link-container">
          <div className="fpd-tab-links" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="fpd-tab-link-wrapper">
              <a className="fpd-tab-link active" onClick={(e) => fpdTabClickAction(e)}>Slots</a>
            </div>
            <div className="fpd-tab-link-wrapper">
              <a className="fpd-tab-link" onClick={(e) => fpdTabClickAction(e)}>Selling</a>
            </div>
          </div>
          <div className="fpd-table-action-buttons" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '30px', marginRight: '10px' }}>
            {
              tabState == 'Selling' ?
                (<Button variant='outline' onClick={() => { handleClickOpenAddSalesRow() }} style={{ color: '#fff', backgroundColor: '#ffffff22' }} startIcon={<AddIcon />}>Add Sales</Button>)
                : ('')
            }
          </div>
        </div>
        <div className="fpd-project-details-tab-container">

          {tabContainer}

        </div>
      </div>


      <Suspense fallback={<Loading />}>



        <Dialog
          open={openAddSalesRow}
          onClose={handleCloseAddSalesRow}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Add Sales"}
          </DialogTitle>
          <DialogContent>
            <form style={{ width: '410px' }}>
              <FormControl style={{ width: "400px", margin: "10px 5px" }}>
                <InputLabel id="demo-simple-select-label">Slot</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Slot"
                  value={slots}
                  onChange={(e) => {
                    setSlots(e.target.value)
                  }}
                >
                  {
                    stockSlotsInfo?.map((e, i) => {
                      if (e.status == 'Not Ready')
                        return (<MenuItem value={i + 1}>{i + 1}</MenuItem>)
                    })
                  }
                  {/* <MenuItem value={'Pending'}>1</MenuItem>
                  <MenuItem value={'Sold Out'}>2</MenuItem> */}
                </Select>
              </FormControl>

              <TextField
                style={{ width: "400px", margin: "5px" }}
                type="number"
                label="Quantity (kg)"
                variant="outlined"
                value={parseInt(addSalesData.quantity)}
                onChange={(e) => {
                  setAddSalesData(ex => ({
                    ...ex,
                    quantity: e.target.value
                  }))
                }}
              />
              <TextField
                style={{ width: "400px", margin: "5px" }}
                type="number"
                label="Price (per kg with transportation cost)"
                variant="outlined"
                value={parseInt(addSalesData.price)}
                onChange={(e) => {
                  setAddSalesData(ex => ({
                    ...ex,
                    price: e.target.value
                  }))
                }}
              />
              <FormControl style={{ width: "400px", margin: "10px 5px" }}>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={addSalesData.status}
                  label="Status"
                  onChange={(e) => {
                    setAddSalesData(ex => ({
                      ...ex,
                      status: e.target.value
                    }))
                  }}
                >
                  <MenuItem value={'Ready To Sell'}>Ready To Sell</MenuItem>
                  <MenuItem value={'Sold Out'}>Sold Out</MenuItem>
                </Select>
              </FormControl>

            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddSalesRow}>Cancel</Button>
            <Button onClick={() => {
              handleCloseAddSalesRow()
              addSales()
              console.log(stockSlotsInfo)
            }} autoFocus>
              Add
            </Button>
          </DialogActions>
        </Dialog>






















        <Dialog
          open={false}
          onClose={handleCloseAddSalesRow}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Add Sales"}
          </DialogTitle>
          <DialogContent>
            <form>
              <TextField
                style={{ width: "400px", margin: "5px" }}
                type="text"
                label="setgoal"
                variant="outlined"
              />
              <br />
              <TextField
                style={{ width: "400px", margin: "5px" }}
                type="text"
                label="goal description"
                variant="outlined"
              />
              <br />
              <TextField
                style={{ width: "400px", margin: "5px" }}
                type="text"
                label="Diversity catagory"
                variant="outlined"
              />
              <br />
              <TextField
                style={{ width: "400px", margin: "5px" }}
                type="text"
                label="Attribute"
                variant="outlined"
              />
              <br />
              <TextField
                style={{ width: "400px", margin: "5px" }}
                type="text"
                label="goal stage"
                variant="outlined"
              />
              <br />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddSalesRow}>Cancel</Button>
            <Button onClick={handleCloseAddSalesRow} autoFocus>
              Add
            </Button>
          </DialogActions>
        </Dialog>

      </Suspense>

    </section >
    </UserContext.Provider>
  </ThemeProvider>
  )
}



export default ProjectDetails





