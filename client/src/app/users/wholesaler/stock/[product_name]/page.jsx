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
import { AddNewProductSale, GetProductSales, GetStockedSlots } from '@services/td-service/product_service';
import SlotTable from '../_components/stock_slots_table';
import SalesTable from '../_components/sales_table';



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
  const [total, setTotal] = React.useState({ total_costs: 0, total_sales: 0, total_stocked: 0, total_profit: 0 })
  const [stockSlotsInfo, setStockSlotsInfo] = React.useState([])
  const [slots, setSlots] = React.useState('')
  const [salesData, setSalesData] = React.useState({
    quantity: '',
    price: '',
  })
  const [productSales, setProductSales] = React.useState(undefined)
  const [tabContainer, setTabContainer] = React.useState();
  const [tabState, setTabState] = React.useState('Slots')
  const [rerenderSales, setRerenderSales] = React.useState(false)
  

  const fpdTabClickAction = (e) => {
    e.preventDefault()
    const allTabs = document.querySelectorAll('.fpd-tab-link-container a');

    allTabs.forEach(element => {
      if (element.classList.contains("active")) {
        element.classList.remove("active");
      }
    });
    e.target.classList.add("active");

    if (e.target.innerHTML == "Slots") {
      setTabContainer(<SlotTable stockSlots={stockSlotsInfo} setStockSlots={setStockSlotsInfo} total={total}/>)
      setTabState("Slots");
    }
    else if (e.target.innerHTML == "Selling") {
      setTabContainer(<SalesTable productSales={productSales} setProductSales={setProductSales} rerender={rerenderSales} setRerender={setRerenderSales}/>);
      setTabState("Selling");
    }

  }



  const [openAddSalesRow, setOpenAddSalesRow] = React.useState(false);

  const handleClickOpenAddSalesRow = () => {
    setOpenAddSalesRow(true);
  };

  const handleCloseAddSalesRow = () => {
    setOpenAddSalesRow(false);
    setSalesData({
      quantity: '',
      price: '',
    })
    setSlots('')
  };






  const calculateTotal = (stockList)=>{
    let totalCost = 0
    let totalStocked = 0
    stockList.map(stock=>{
      totalCost = totalCost+stock?.amount + stock?.transport_cost
      totalStocked = totalStocked+stock?.quantity
    })
    setTotal(ex=>({
      ...ex,
      total_costs:totalCost,
      total_stocked: totalStocked
    }))
  }


  const fetchStocks = async (userData)=>{
    const res = await GetStockedSlots({product_name, user_id: userData?._id})
    if(res.status == 200){
      setStockSlotsInfo(res.data)
      calculateTotal(res.data)
    }else{
      alert(res.message)
    }
  }

  const getAllSales = async ()=>{
    const res = await GetProductSales(product_name)
    console.log(res.data);
    if(res.status == 200){
      const allSales = res.data
      let totalSales = 0
      // allSales.map(exp => { exp.status == 'Sold Out'? totalSales += (exp.price * exp.quantity): totalSales += 0})
      // setTotal(ex=>({
      //   ...ex,
      //   total_sales: totalSales
      // }))
      setProductSales(allSales)
      console.log(allSales);
    }
    else{
      alert(res.message)
    }

  }


  async function GetUser() {
    const userData = await GetUserData("Trader");
    setUser(userData)
    fetchStocks(userData)
  }

  useEffect(() => {
    if(stockSlotsInfo.length > 0){
      setTabContainer(<SlotTable stockSlots={stockSlotsInfo} setStockSlots={setStockSlotsInfo} total={total}/>)

    }
  }, [stockSlotsInfo]);

  useEffect(() => {
    GetUser()
    // fetchStocks() On the GetUser
    getAllSales()

  }, []);



  const addSales = async ()=>{
    console.log(salesData);
    console.log(slots);
    const res = await AddNewProductSale({sales_info: salesData, stock_id: slots})
    if(res.status == 200){
      console.log(res.data);
    }else{
      alert(res.message)
    }
  }











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
          
          <div className="w-layout-hflex fpd-total-calculations">
            <div className="fpd-calc-item">
              <div className="w-layout-hflex fpd-total-calc-flex"><img src="/images/investing.png" loading="lazy" alt="" className="fpd-total-calc-icons" />
                <div className="fpd-total-calc-text">
                  <h5 className="fpd-total-calc-h4">Total Costs</h5>
                  <h4 className="fpd-total-calc-h5">{(total.total_costs).toLocaleString('en-us')} <span className="fpd-total-calc-h5-span"></span></h4>
                </div>
              </div>
            </div>
            <div className="fpd-calc-item">
              <div className="w-layout-hflex fpd-total-calc-flex"><img src="/images/acquisition.png" loading="lazy" alt="" className="fpd-total-calc-icons" />
                <div className="fpd-total-calc-text">
                  <h5 className="fpd-total-calc-h4">Total Sales</h5>
                  <h4 className="fpd-total-calc-h5">{parseInt(total.total_sales).toLocaleString('en-us')} <span className="fpd-total-calc-h5-span"></span></h4>
                </div>
              </div>
            </div>
            <div className="fpd-calc-item">
              <div className="w-layout-hflex fpd-total-calc-flex"><img src="/images/revenue.png" loading="lazy" alt="" className="fpd-total-calc-icons" />
                <div className="fpd-total-calc-text">
                  <h5 className="fpd-total-calc-h4">Total Profit</h5>
                  <h4 className="fpd-total-calc-h5">{(total.total_sales - total.total_costs).toLocaleString('en-US')}<span className="fpd-total-calc-h5-span">  </span></h4>
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
                    stockSlotsInfo?.map(stock => {
                      if (stock.status == 'Processing')
                        return (<MenuItem key={stock.slot} value={stock._id}>{stock.slot}</MenuItem>)
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
                value={salesData.quantity}
                onChange={(e) => {
                  setSalesData(ex => ({
                    ...ex,
                    quantity: e.target.value
                  }))
                }}
              />
              <TextField
                style={{ width: "400px", margin: "5px" }}
                type="number"
                label="Price"
                variant="outlined"
                value={salesData.price}
                onChange={(e) => {
                  setSalesData(ex => ({
                    ...ex,
                    price: e.target.value
                  }))
                }}
              />
              {/* <FormControl style={{ width: "400px", margin: "10px 5px" }}>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={salesData.status}
                  label="Status"
                  onChange={(e) => {
                    setSalesData(ex => ({
                      ...ex,
                      status: e.target.value
                    }))
                  }}
                >
                  <MenuItem value={'Ready To Sell'}>Ready To Sell</MenuItem>
                  <MenuItem value={'Sold Out'}>Sold Out</MenuItem>
                </Select>
              </FormControl> */}

            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddSalesRow}>Cancel</Button>
            <Button onClick={() => {
              handleCloseAddSalesRow()
              addSales()
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





