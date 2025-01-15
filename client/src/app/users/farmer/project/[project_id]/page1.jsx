'use client'
import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Stack, Tooltip } from '@mui/material';


import ExpenseTable from '@app/users/farmer/project/[project_id]/_components/expense_table';
import SellingTable from '@app/users/farmer/project/[project_id]/_components/sales_table';


import AddIcon from '@mui/icons-material/Add';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, Autocomplete } from '@mui/material';
import '@styles/farmer-dashboard.css'
import { Suspense } from 'react';
import Loading from '@app/loading';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import InventoryIcon from '@mui/icons-material/Inventory';
import ForestIcon from '@mui/icons-material/Forest';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LandscapeIcon from '@mui/icons-material/Landscape';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { Loader } from '@app/loading';
import AcceptedOffersTable from '@components/AcceptedOffersTable';
import UserContext from '@context/userContext';

const ProjectDetails = ({params}) => {
  // const {user, setUser} = useContext(UserContext)
  const router = useRouter()
  const [total, setTotal] = React.useState({total_expense: '0', total_sales: '0', total_revenue: '0', reload: false, render: false})
  const [project, setProject] = React.useState({})
  const [isLoad, setIsLoad] = React.useState(true)
  
  const [projectCoverImg, setProjectCoverImg] = React.useState(undefined)


  const [addSalesData, setAddSalesData] = React.useState({
    quantity: '',
    price: '',
    collection_date: '',
    status: 'Pending',
    project_id: params.project_id,
  })

  const [addExpenseData, setAddExpenseData] = React.useState({
    sector: '',
    unit: '',
    cost: '',
    date: '',
    project_id: '',
  })


  const [tabContainer, setTabContainer] = React.useState([
    <Suspense fallback={<Loading/>}>
      <ExpenseTable project_id={project_id} total = {{total, setTotal}}/>
    </Suspense>
    ]);
  const [tabState, setTabState] = React.useState('Expenses')

  const fpdTabClickAction = (e)=>{
    e.preventDefault()
    const allTabs = document.querySelectorAll('.fpd-tab-link-container a');

    allTabs.forEach(element => {
      if(element.classList.contains("active")){
        element.classList.remove("active");
      }
    });
    e.target.classList.add("active");

    if(e.target.innerHTML == "Expenses"){
      setTabContainer([
        <Suspense fallback={<Loading/>}>
          <ExpenseTable project_id={project_id} total = {{total, setTotal}}/>
        </Suspense>
      ]);
      setTabState("Expenses");
    }
    else if(e.target.innerHTML == "Selling"){
      setTabContainer([
        <Suspense fallback={<Loading/>}>
          <SellingTable project_id={project_id} total = {{total, setTotal}}/>
        </Suspense>
      ]);
      setTabState("Selling");
    }
    else if(e.target.innerHTML == "Accepted Offers"){
      setTabContainer([
        <Suspense fallback={<Loading/>}>
          <AcceptedOffersTable info= {{project_id: project_id}}/>
        </Suspense>
      ]);
      setTabState("Selling");
    }

  }








  // =================================================     Api Calls      ===================================================================================================





  const shiftProjectImgToLocal = async (img)=>{
    const data = new FormData()
    data.set('img', img)
    const httpData = {
        method: 'POST',
        body: data,
    }
    const res = await fetch(
        `/api/add/img`,
        httpData,
    )
    console.log(res)
  }




  const [openAddExpenseRow, setOpenAddExpenseRow] = React.useState(false);

  const handleClickOpenAddExpenseRow = () => {
    setOpenAddExpenseRow(true);
    setAddExpenseData({
      sector: '',
      unit: '',
      cost: '',
      date: '',
      project_id: params.project_id,
    })
  };

  const handleCloseAddExpenseRow = () => {
    setOpenAddExpenseRow(false);
  };

  const [openAddSalesRow, setOpenAddSalesRow] = React.useState(false);
  const [openProjectUpdateDialog, setOpenProjectUpdateDialog] = React.useState(false);

  const handleClickOpenAddSalesRow = () => {
    setOpenAddSalesRow(true);
    setAddSalesData({
      quantity: '',
      price: '',
      collection_date: '',
      status: 'Pending',
      project_id: params.project_id,
    })
  };

  const handleCloseAddSalesRow = () => {
    setOpenAddSalesRow(false);
  };



  const fetchProjects = async ()=>{
    const postData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({project_id: params.project_id}),
    };

    const res = await fetch(
      '/api/get/project_details',
      postData
    )
    const response = await res.json()
    // setProjects(response.data)
    setProject(response.data)
    setAddExpenseData({
      sector: '',
      unit: '',
      cost: '',
      date: '',
      project_id: response.data.id,
    })
    setTotal(ex=>({
      ...ex,
      total_expense: response.data.total_expense, 
      total_sales: response.data.total_sales, 
      total_revenue: response.data.total_revenue
    }))

    setIsLoad(false)
  }
  
  React.useEffect(() => {
    fetchProjects()
    
  }, []);

  React.useEffect(() => {

    if(total.reload){

      
      setProject({})
      console.log(project)
      setTotal(ex=>({
        ...ex,
        reload: false
      }))
    }
    // fetchProjects()
    console.log("total changes")
    // updateTotalExpense(project.id, total.total_expense)
  }, [total]);

  const products = [
    {label: 'Tometo'},
    {label: 'Onion'},
    {label: 'Eggplant'},
    {label: 'Carrots'},
    {label: 'Cabbage'},
    {label: 'Chilli'},
    {label: 'Watermelon'},
    {label: 'Potato'},
  ]





  const AddExpense = async ()=>{
    if(
      addExpenseData.sector != '' &&
      addExpenseData.unit != '' &&
      addExpenseData.cost != '' &&
      addExpenseData.date != ''
    ){
      
      const postData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addExpenseData),
      };
  
      const res = await fetch(
        '/api/add/frmr_add_expense',
        postData
      )
      const response = await res.json()
      console.log(response)
      fetchProjects()
      
      setTabContainer([
        <Suspense fallback={<Loading/>}>
          <ExpenseTable project_id={params.project_id} total = {{total, setTotal}}/>
        </Suspense>
      ]);

    }
  }


  const addProjectSales = async ()=>{
        
    
    const postData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addSalesData),
    };

    const res = await fetch(
      '/api/add/add_sales_data',
      postData
    )
    const response = await res.json()
    console.log(response)
    setTabContainer([
      <Suspense fallback={<Loading/>}>
        <SellingTable project_id={params.project_id} total = {{total, setTotal}}/>
      </Suspense>
    ]);
}




const updateProjectInfo = async ()=>{
        
  console.log("======================================")
  console.log(JSON.stringify(project))
  
  const postData = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  };

  const res = await fetch(
    '/api/update/update_project',
    postData
  )
  const response = await res.json()
  console.log(response)
  if(response.status == 200)
    fetchProjects()
  
}







// ====================================       Return Function        ====================================================================










  return (
    <section class="frmr-project-detail-main">
      <Loader open={isLoad}/>
    <div class="fpd-cover-img-box"
    > 
      <div style={{backgroundColor: '#00000050', height: '300px', width: '100%', position: 'absolute'}}></div>
      <img src={`/images/${project?.cover_img}`}
      
      style={{height: '100%', width: '100%', objectFit: 'cover'}} alt="" srcset="" />
    </div>
    <div class="w-layout-blockcontainer fpd-other-part-container w-container">
      <div style={{display: 'flex', alignItems:'center', justifyContent: 'space-between'}}>
        <h1 class="fpd-project-detail-heading" style={{marginTop: '10px'}}>{project?.title} </h1> 
        <div>
        <Tooltip title="Delete Project">
          <IconButton aria-label="delete" onClick={()=>deleteProject()} color='error'>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Update Project">
          <IconButton aria-label="edit" color='primary' onClick={() => setOpenProjectUpdateDialog(true)}>
              <EditIcon />
          </IconButton>
        </Tooltip>
        
        
        </div>

      </div>
      <div class="fpd-basic-info">
      <Stack direction={'row'} gap={'20px'} style={{marginTop: '30px'}}>

        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{backgroundColor: '#244441' ,
          display: 'flex',
          gap: '10px', 
          padding: '20px 30px',
          borderRadius: '10px'
          }}>
            <InventoryIcon fontSize='large' style={{color: '#f7c35f'}}/>
            <div>
              <h6 style={{color: "#f7c35a", fontWeight: 'bold'}}>Product Type</h6>
              <p style={{margin: '0', color: '#eee'}}>{project?.product_name}</p>
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
            <ForestIcon fontSize='large' style={{color: '#f7c35f'}}/>
            <div>
              <h6 style={{color: "#f7c35a", fontWeight: 'bold'}}>Seedling</h6>
              <p style={{margin: '0', color: '#eee'}}>{project?.seedling}</p>
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
            <LandscapeIcon fontSize='large' style={{color: '#f7c35f'}}/>
            <div>
              <h6 style={{color: "#f7c35a", fontWeight: 'bold'}}>Land</h6>
              <p style={{margin: '0', color: '#eee'}}>{project?.land} Acr</p>
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
              <h6 style={{color: "#f7c35a", fontWeight: 'bold'}}>Starting Date</h6>
              <p style={{margin: '0', color: '#eee'}}>{project?.start_time}</p>
            </div>
          </div>
        </div>


        
        </Stack>
        <div class="w-layout-hflex fpd-total-calculations">
          <div class="fpd-calc-item">
            <div class="w-layout-hflex fpd-total-calc-flex"><img src="/images/investing.png" loading="lazy" alt="" class="fpd-total-calc-icons"/>
              <div class="fpd-total-calc-text">
                <h5 class="fpd-total-calc-h4">Total Expenses</h5>
                <h4 class="fpd-total-calc-h5">{parseInt(total.total_expense).toLocaleString('en-US')} <span class="fpd-total-calc-h5-span"></span></h4>
              </div>
            </div>
          </div>
          <div class="fpd-calc-item">
            <div class="w-layout-hflex fpd-total-calc-flex"><img src="/images/acquisition.png" loading="lazy" alt="" class="fpd-total-calc-icons"/>
              <div class="fpd-total-calc-text">
                <h5 class="fpd-total-calc-h4">Total Sales</h5>
                <h4 class="fpd-total-calc-h5">{parseInt(total.total_sales).toLocaleString('en-US')} <span class="fpd-total-calc-h5-span"></span></h4>
              </div>
            </div>
          </div>
          <div class="fpd-calc-item">
            <div class="w-layout-hflex fpd-total-calc-flex"><img src="/images/revenue.png" loading="lazy" alt="" class="fpd-total-calc-icons"/>
              <div class="fpd-total-calc-text">
                <h5 class="fpd-total-calc-h4">Total Profit</h5>
                <h4 class="fpd-total-calc-h5">{(parseInt(total.total_sales)-parseInt(total.total_expense)).toLocaleString('en-US')} <span class="fpd-total-calc-h5-span"></span></h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-layout-hflex fpd-tab-link-container">
        <div className="fpd-tab-links" style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
          <div class="fpd-tab-link-wrapper">
            <a class="fpd-tab-link active" onClick={(e) => fpdTabClickAction(e)}>Expenses</a>
          </div>
          <div class="fpd-tab-link-wrapper">
            <a class="fpd-tab-link" onClick={(e) => fpdTabClickAction(e)}>Selling</a>
          </div>
          <div class="fpd-tab-link-wrapper">
            <a class="fpd-tab-link" onClick={(e) => fpdTabClickAction(e)}>Accepted Offers</a>
          </div>
        </div>
        <div className="fpd-table-action-buttons" style={{display:'flex', alignItems: 'center', justifyContent: 'center', height:'30px', marginRight: '10px'}}>
              <Button variant='outline' onClick={()=>{tabState == 'Expenses'? handleClickOpenAddExpenseRow(): handleClickOpenAddSalesRow()}} style={{color: '#fff', backgroundColor: '#ffffff22'}} startIcon={<AddIcon/>}>Add {tabState == 'Expenses'? 'Expense':'Sales'}</Button>
        </div>
      </div>
      <div className="fpd-project-details-tab-container" style={{minHeight: '400px'}}>

      {tabContainer}
      
      </div>
    </div>


    <Suspense fallback={<Loading/>}>
    <Dialog
        open={openAddExpenseRow}
        onClose={handleCloseAddExpenseRow}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Add Expenses"}
            </DialogTitle>
            <DialogContent>
                <form style={{width: '410px'}}>
                    <TextField
                    style={{ width: "400px", margin: "5px" }}
                    type="text"
                    value={addExpenseData.sector}
                    onChange={(e)=> {
                      setAddExpenseData(ex => ({
                        ...ex,
                        sector: e.target.value
                      }))
                    }}
                    label="Expense Sector"
                    variant="outlined"
                    />
                    <br />
                    <TextField
                    style={{ width: "400px", margin: "5px" }}
                    type="number"
                    label="Measurement Unit"
                    value={addExpenseData.unit}
                    onChange={(e)=> {
                      setAddExpenseData(ex => ({
                        ...ex,
                        unit: e.target.value
                      }))
                    }}
                    variant="outlined"
                    />
                    <br />
                    <TextField
                    style={{ width: "400px", margin: "5px" }}
                    type="number"
                    label="Cost"
                    value={addExpenseData.cost}
                    onChange={(e)=> {
                      setAddExpenseData(ex => ({
                        ...ex,
                        cost: e.target.value
                      }))
                    }}
                    variant="outlined"
                    />
                    <TextField
                    style={{ width: "400px", margin: "5px" }}
                    type="date"
                    value={addExpenseData.date}
                    onChange={(e)=> {
                      setAddExpenseData(ex => ({
                        ...ex,
                        date: e.target.value
                      }))
                    }}
                    label="Date"
                    focused
                    variant="outlined"
                    />
                    <br />
                </form>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseAddExpenseRow}>Cancel</Button>
            <Button onClick={()=>{
              setAddExpenseData(ex => ({
                ...ex,
                project_id: project?.id
              }))
              handleCloseAddExpenseRow()
              AddExpense()
              
              setTabContainer([<ExpenseTable project_id={params.project_id} total = {{total, setTotal}}/>]);
            }} autoFocus>
                Add
            </Button>
            </DialogActions>
        </Dialog>


        
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
                <form style={{width: '410px'}}>
                    <TextField
                    style={{ width: "400px", margin: "5px" }}
                    type="number"
                    label="Quantity (kg)"
                    variant="outlined"
                    value={addSalesData.quantity}
                    onChange={(e)=>{
                      setAddSalesData(ex=>({
                        ...ex,
                        quantity: e.target.value
                      }))
                    }}
                    />
                    <TextField
                    style={{ width: "400px", margin: "5px" }}
                    type="number"
                    label="Price (per kg)"
                    variant="outlined"
                    value={addSalesData.price}
                    onChange={(e)=>{
                      setAddSalesData(ex=>({
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
                        onChange={(e)=>{
                          setAddSalesData(ex=>({
                            ...ex,
                            status: e.target.value
                          }))
                        }}
                      >
                        <MenuItem value={'Pending'}>Pending</MenuItem>
                        <MenuItem value={'Sold Out'}>Sold Out</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                    style={{ width: "400px", margin: "5px" }}
                    type="date"
                    label="Collection Date"
                    focused
                    variant="outlined"value={addSalesData.collection_date}
                    onChange={(e)=>{
                      setAddSalesData(ex=>({
                        ...ex,
                        collection_date: e.target.value
                      }))
                    }}
                    />
                </form>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseAddSalesRow}>Cancel</Button>
            <Button onClick={()=>{
              handleCloseAddSalesRow()
              setTabContainer([]);
              addProjectSales()
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





        <Dialog
        open={openProjectUpdateDialog}
        onClose={()=>setOpenProjectUpdateDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Update Project"}
            </DialogTitle>
            <DialogContent>
                <form autoComplete="off" noValidate style={{width: '420px'}}>
                    <TextField
                    style={{ width: "400px", margin: "6px" }}
                    type="text"
                    required
                    label="Project Title"
                    value={project?.title}
                    onChange={(e)=> {
                      setProject(ex => ({
                        ...ex,
                        title: e.target.value
                      }))
                    }}
                    name='title'
                    variant="outlined"
                    />
                    <br />
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      style={{ width: "400px", margin: "6px" }}
                      options={products}
                      value={project?.product_name}
                      onChange={(e)=> {
                      setProject(ex => ({
                        ...ex,
                        product_name: e.target.value
                      }))
                    }}
                      renderInput={(params) => <TextField {...params} label="Product Name" />}
                    />
                    
                    <TextField
                    style={{ width: "400px", margin: "6px" }}
                    type="number"
                    label="Seedling"
                    name='seedling'
                    value={project?.seedling}
                    onChange={(e)=> {
                      setProject(ex => ({
                        ...ex,
                        seedling: e.target.value
                      }))
                    }}
                    variant="outlined"
                    />
                    <br />
                    <TextField
                    style={{ width: "400px", margin: "6px" }}
                    type="number"
                    label="Land Size (Acr)"
                    value={project?.land}
                    onChange={(e)=> {
                      setProject(ex => ({
                        ...ex,
                        land: e.target.value
                      }))
                    }}
                    name='Land'
                    variant="outlined"
                    />
                    
                    <FormControl style={{ width: "400px", margin: "6px" }}>
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={project?.status}
                            label="Status"
                            onChange={(e)=>{
                              setProject(ex=>({
                                ...ex,
                                status: e.target.value
                            }))
                            }}
                        >
                            <MenuItem value={'Running'}>Running</MenuItem>
                            <MenuItem value={'Completed'}>Completed</MenuItem>
                        </Select>
                        </FormControl>

                    <TextField
                    style={{ width: "400px", margin: "6px" }}
                    type="date"
                    focused
                    label="Start Time"
                    value={project?.start_time}
                    onChange={(e)=> {
                      setProject(ex => ({
                        ...ex,
                        start_time: e.target.value
                      }))
                    }}
                    name='start_time'
                    variant="outlined"
                    />
                    
                    <div style={{padding: '10px 10px 0px'}}>
                        <label for='img-upload' style={{marginBottom: '5px'}}>Upload Cover Image</label> <br/>
                        <input type='file' id='img-upload' 
                        onChange={(e)=> {
                          setProject(ex => ({
                            ...ex,
                            cover_img: e.target.files[0].name
                          }))
                          setProjectCoverImg(e.target.files?.[0])
                        }}
                        />
                      </div>
                </form>
            </DialogContent>
            <DialogActions>
            <Button onClick={()=>setOpenProjectUpdateDialog(false)}>Cancel</Button>
            <Button onClick={(e)=> {
              e.preventDefault()
              // setIsLoad(ex=>({...ex, sub: true}))
              setOpenProjectUpdateDialog(false)
              setIsLoad(true)
              shiftProjectImgToLocal(projectCoverImg)
              updateProjectInfo()
              setProject(undefined)
              // fetchProjects()
            }} autoFocus>
                Save
            </Button>
            </DialogActions>
        </Dialog>

        </Suspense>

  </section>
  )
}



export default ProjectDetails






