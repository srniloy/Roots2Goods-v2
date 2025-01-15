'use client'
import { GetProjectDetails } from '@services/fd-service/dashboard_service'
import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation';
import { Button, Stack, Tooltip } from '@mui/material';


import ExpenseTable from '@app/users/farmer/project/[project_id]/_components/expense_table';
import SellingTable from '@app/users/farmer/project/[project_id]/_components/sales_table';

import { ThemeProvider, createTheme } from '@mui/material';

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
import { AddProjectExpense, AddProjectSales, DeleteProject, GetProjectExpenses, GetProjectSales, UpdateProject } from '@services/fd-service/project_service';
import ConfirmationAlert from '@components/ui/confirmation-alert';
import { AddExpenseDialog, AddSalesDialog, ProjectUpdateDialog } from './_components/dialogs';
import SalesTable from './_components/sales_table';
import AcceptedOffersTable from './_components/accepted_offers_table';


// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';


const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;





const ProjectDetails = ({ params }) => {
  const { project_id } = React.use(params)
  const [user, setUser] = useState(undefined)
  const [project, setProject] = useState(undefined)
  const [projectExpenses, setProjectExpenses] = useState(undefined)
  const [projectSales, setProjectSales] = useState(undefined)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [isProjectUpdateDialogOpen, setIsProjectUpdateDialogOpen] = useState(false)
  const [isAddEnpenseDialogOpen, setIsAddEnpenseDialogOpen] = useState(false)
  const [isAddSalesDialogOpen, setIsAddSalesDialogOpen] = useState(false)
  const router = useRouter()
  const [total, setTotal] = React.useState({ total_expense: '0', total_sales: '0', total_revenue: '0', reload: false, render: false })
  const [rerenderExpense, setRerenderExpense] = React.useState(false)
  const [rerenderSales, setRerenderSales] = React.useState(false)
  const [addExpenseData, setAddExpenseData] = React.useState({
    sector: '',
    unit: '',
    cost: '',
    date: '',
    project_id: '',
  })

  const [addSalesData, setAddSalesData] = React.useState({
    quantity: '',
    price: '',
    collection_date: '',
    status: 'Pending',
    project_id: '',
  })


  // const [tabContainer, setTabContainer] = React.useState();

  const [tabContainer, setTabContainer] = React.useState();
  const [tabState, setTabState] = React.useState('Expenses')

  const fpdTabClickAction = (e) => {
    e.preventDefault()
    const allTabs = document.querySelectorAll('.fpd-tab-link-container a');

    allTabs.forEach(element => {
      if (element.classList.contains("active")) {
        element.classList.remove("active");
      }
    });
    e.target.classList.add("active");

    if (e.target.innerHTML == "Expenses") {
      setTabContainer(<ExpenseTable projectExpenses={projectExpenses} setProjectExpenses={setProjectExpenses} 
        rerender={rerenderExpense} setRerender={setRerenderExpense}/>)
      setTabState("Expenses");
    }
    else if (e.target.innerHTML == "Selling") {
      setTabContainer(<SalesTable projectSales={projectSales} setProjectSales={setProjectSales}
        rerender={rerenderSales} setRerender={setRerenderSales}/>);
      setTabState("Selling");
    }
    else if (e.target.innerHTML == "Accepted Offers") {
      setTabContainer(<AcceptedOffersTable project_id={project?._id} rerender={rerenderSales} setRerender={setRerenderSales}/>);
      setTabState("Selling");
    }

  }


  const setExpenses = async ()=>{
    const res = await GetProjectExpenses(project_id)
    console.log(res.data);
    if(res.status == 200){
      const allExpenses = res.data
      let totalExpense = 0
      allExpenses.map(exp => {totalExpense += exp.cost})
      setTotal(ex=>({
        ...ex,
        total_expense: totalExpense
      }))
      setProjectExpenses(allExpenses)
      console.log(project);
    }
    else{
      alert(res.message)
    }

  }

  const setSales = async ()=>{
    const res = await GetProjectSales(project_id)
    console.log(res.data);
    if(res.status == 200){
      const allSales = res.data
      let totalSales = 0
      allSales.map(exp => { exp.status == 'Sold Out'? totalSales += (exp.price * exp.quantity): totalSales += 0})
      setTotal(ex=>({
        ...ex,
        total_sales: totalSales
      }))
      setProjectSales(allSales)
      console.log(project);
    }
    else{
      alert(res.message)
    }

  }

  useEffect(() => {
    if(projectExpenses && tabState == "Expenses"){
      setTabContainer(<ExpenseTable projectExpenses={projectExpenses} setProjectExpenses={setProjectExpenses} 
        rerender={rerenderExpense} setRerender={setRerenderExpense}/>)
    }
  }, [projectExpenses]);

  useEffect(() => {
    if(projectSales && tabState == "Selling"){
      setTabContainer(<SalesTable projectSales={projectSales} setProjectSales={setProjectSales}
        rerender={rerenderSales} setRerender={setRerenderSales}/>);
    }
  }, [projectSales]);


  useEffect(() => {setExpenses()}, [rerenderExpense]);

  useEffect(() => {
    const allTabs = document.querySelectorAll('.fpd-tab-link-container a');
    let flag = false
    allTabs.forEach(element => {
      if(element.innerHTML == "Accepted Offers" && element.classList.contains("active")){flag = true}
    });
    if(flag){
      allTabs.forEach(element => {
        if(element.innerHTML == "Selling"){
          element.classList.add("active");
        }
        else if (element.classList.contains("active")) {
          element.classList.remove("active");
        }
      });
    }
    
    setSales()
  }, [rerenderSales]);






  async function SetProjectDetails() {
    const res = await GetProjectDetails({ project_id: project_id })
    const { userInfo, projectDetails } = res.data
    setUser(userInfo)
    setProject(projectDetails)
  }


  useEffect(() => {
    SetProjectDetails()
    setExpenses()
    setSales()
  }, []);

  const deleteProject = async () => {
    const res = await DeleteProject(project._id)
    console.log(res);
    if (res.status == 200) { router.push("/users/farmer/dashboard/projects") }
  }
  const updateProjectInfo = async () => {
    const res = await UpdateProject(project)
    if (res.status == 200) {
      SetProjectDetails()
    }
  }

  const addExpense = async () => {
    console.log(project._id);
    console.log(addExpenseData);
    const res = await AddProjectExpense({ expense: addExpenseData, project_id: project?._id })
    if (res.status == 200) {
      console.log(res.data);
      setExpenses()
      setAddExpenseData({
        sector: '',
        unit: '',
        cost: '',
        date: '',
        project_id: '',
      })
    }
  }

  const addNewSales = async () => {
    console.log(project._id);
    console.log(addSalesData);
    const res = await AddProjectSales({ sales: addSalesData, project_id: project?._id })
    if (res.status == 200) {
      console.log(res.data);
      setSales()
      setAddSalesData({
        quantity: '',
        price: '',
        collection_date: '',
        status: 'Pending',
        project_id: '',
      })
    }
    else{
      alert(res.message)
    }
  }








  return (
    <ThemeProvider theme={createTheme({ palette: { mode: "dark" } })}>

      <section className="frmr-project-detail-main">
        <div className="fpd-cover-img-box">
          <div style={{ backgroundColor: '#00000050', height: '300px', width: '100%', position: 'absolute' }}></div>
          <img src={`${SERVER_URL}/${project?.cover_img}`}

            style={{ height: '100%', width: '100%', objectFit: 'cover' }} alt="" srcSet="" />
        </div>
        <div className="w-layout-blockcontainer fpd-other-part-container w-container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h1 className="fpd-project-detail-heading" style={{ marginTop: '10px' }}>{project?.title} </h1>
            <div>
              <Tooltip title="Delete Project">
                <IconButton aria-label="delete"
                  onClick={() => setIsAlertOpen(true)}
                  color='error'>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Update Project">
                <IconButton aria-label="edit" color='primary' onClick={() => setIsProjectUpdateDialogOpen(true)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>


            </div>

          </div>
          <div className="fpd-basic-info">
            <Stack direction={'row'} gap={'20px'} style={{ marginTop: '30px' }}>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  backgroundColor: '#244441',
                  display: 'flex',
                  gap: '10px',
                  padding: '20px 30px',
                  borderRadius: '10px'
                }}>
                  <InventoryIcon fontSize='large' style={{ color: '#f7c35f' }} />
                  <div>
                    <h6 style={{ color: "#f7c35a", fontWeight: 'bold' }}>Product Type</h6>
                    <p style={{ margin: '0', color: '#eee' }}>{project?.product_name}</p>
                  </div>
                </div>
              </div>



              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  backgroundColor: '#244441',
                  display: 'flex',
                  gap: '10px',
                  padding: '20px 30px',
                  borderRadius: '10px'
                }}>
                  <ForestIcon fontSize='large' style={{ color: '#f7c35f' }} />
                  <div>
                    <h6 style={{ color: "#f7c35a", fontWeight: 'bold' }}>Seedling</h6>
                    <p style={{ margin: '0', color: '#eee' }}>{project?.seedling}</p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  backgroundColor: '#244441',
                  display: 'flex',
                  gap: '10px',
                  padding: '20px 30px',
                  borderRadius: '10px'
                }}>
                  <LandscapeIcon fontSize='large' style={{ color: '#f7c35f' }} />
                  <div>
                    <h6 style={{ color: "#f7c35a", fontWeight: 'bold' }}>Land</h6>
                    <p style={{ margin: '0', color: '#eee' }}>{project?.land} Acr</p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  backgroundColor: '#244441',
                  display: 'flex',
                  gap: '10px',
                  padding: '20px 30px',
                  borderRadius: '10px'
                }}>
                  <CalendarMonthIcon fontSize='large' style={{ color: '#f7c35f' }} />
                  <div>
                    <h6 style={{ color: "#f7c35a", fontWeight: 'bold' }}>Starting Date</h6>
                    <p style={{ margin: '0', color: '#eee' }}>{project?.start_time}</p>
                  </div>
                </div>
              </div>



            </Stack>
            <div className="w-layout-hflex fpd-total-calculations">
              <div className="fpd-calc-item">
                <div className="w-layout-hflex fpd-total-calc-flex"><img src="/images/investing.png" loading="lazy" alt="" className="fpd-total-calc-icons" />
                  <div className="fpd-total-calc-text">
                    <h5 className="fpd-total-calc-h4">Total Expenses</h5>
                    <h4 className="fpd-total-calc-h5">{parseInt(total.total_expense).toLocaleString('en-US')} <span className="fpd-total-calc-h5-span"></span></h4>
                  </div>
                </div>
              </div>
              <div className="fpd-calc-item">
                <div className="w-layout-hflex fpd-total-calc-flex"><img src="/images/acquisition.png" loading="lazy" alt="" className="fpd-total-calc-icons" />
                  <div className="fpd-total-calc-text">
                    <h5 className="fpd-total-calc-h4">Total Sales</h5>
                    <h4 className="fpd-total-calc-h5">{parseInt(total.total_sales).toLocaleString('en-US')} <span className="fpd-total-calc-h5-span"></span></h4>
                  </div>
                </div>
              </div>
              <div className="fpd-calc-item">
                <div className="w-layout-hflex fpd-total-calc-flex"><img src="/images/revenue.png" loading="lazy" alt="" className="fpd-total-calc-icons" />
                  <div className="fpd-total-calc-text">
                    <h5 className="fpd-total-calc-h4">Total Profit</h5>
                    <h4 className="fpd-total-calc-h5">{(parseInt(total.total_sales) - parseInt(total.total_expense)).toLocaleString('en-US')} <span className="fpd-total-calc-h5-span"></span></h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-layout-hflex fpd-tab-link-container">
            <div className="fpd-tab-links" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="fpd-tab-link-wrapper">
                <a className="fpd-tab-link active" onClick={(e) => fpdTabClickAction(e)}>Expenses</a>
              </div>
              <div className="fpd-tab-link-wrapper">
                <a className="fpd-tab-link" onClick={(e) => fpdTabClickAction(e)}>Selling</a>
              </div>
              <div className="fpd-tab-link-wrapper">
                <a className="fpd-tab-link" onClick={(e) => fpdTabClickAction(e)}>Accepted Offers</a>
              </div>
            </div>
            <div className="fpd-table-action-buttons" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '30px', marginRight: '10px' }}>
              <Button variant='outline' onClick={() => { tabState == 'Expenses' ? setIsAddEnpenseDialogOpen(true) : setIsAddSalesDialogOpen(true) }} style={{ color: '#fff', backgroundColor: '#ffffff22' }} startIcon={<AddIcon />}>Add {tabState == 'Expenses' ? 'Expense' : 'Sales'}</Button>
            </div>
          </div>
          <div className="fpd-project-details-tab-container" style={{ minHeight: '400px' }}>

            {tabContainer}

          </div>
        </div>

        <ConfirmationAlert open={isAlertOpen} setOpen={setIsAlertOpen} title={"Do you want to delete the project?"} onConfirm={deleteProject} />

        <ProjectUpdateDialog open={isProjectUpdateDialogOpen} setOpen={setIsProjectUpdateDialogOpen}
          project={project} setProject={setProject} onConfirm={updateProjectInfo}
        />

        <AddExpenseDialog open={isAddEnpenseDialogOpen} setOpen={setIsAddEnpenseDialogOpen}
          addExpenseData={addExpenseData} setAddExpenseData={setAddExpenseData} onConfirm={addExpense}
        />

        <AddSalesDialog open={isAddSalesDialogOpen} setOpen={setIsAddSalesDialogOpen}
          addSalesData={addSalesData} setAddSalesData={setAddSalesData} onConfirm={addNewSales}
        />


      </section>
    </ThemeProvider>
  )

}

export default ProjectDetails