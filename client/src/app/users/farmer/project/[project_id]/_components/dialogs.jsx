'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import { useRouter } from 'next/navigation';




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

export function ProjectUpdateDialog({open, setOpen, project, setProject, onConfirm}) {


    return (
        <Dialog
        open={open}
        onClose={()=>setOpen(false)}
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
                        <label htmlFor='img-upload' style={{marginBottom: '5px'}}>Upload Cover Image</label> <br/>
                        <input type='file' id='img-upload' 
                        onChange={(e)=> {
                          setProject(ex => ({
                            ...ex,
                            cover_img: e.target.files[0]
                          }))
                        }}
                        />
                      </div>
                </form>
            </DialogContent>
            <DialogActions>
            <Button onClick={()=>setOpen(false)}>Cancel</Button>
            <Button onClick={(e)=> {
              e.preventDefault()
              // setIsLoad(ex=>({...ex, sub: true}))
              setOpen(false)
              onConfirm(project)
            }} autoFocus>
                Save
            </Button>
            </DialogActions>
        </Dialog>
    );
}



export function AddExpenseDialog({open, setOpen, addExpenseData, setAddExpenseData, onConfirm}) {


    return (
        <Dialog
        open={open}
        onClose={setOpen}
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
            <Button onClick={()=> setOpen(false)}>Cancel</Button>
            <Button onClick={()=>{
              setOpen(false)
              onConfirm()
            }} autoFocus>
                Add
            </Button>
            </DialogActions>
        </Dialog>

    );
}



export function AddSalesDialog({open, setOpen, addSalesData , setAddSalesData, onConfirm}) {


  return (
    <Dialog
    open={open}
    onClose={()=> setOpen(false)}
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
                value={addSalesData?.quantity}
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
                value={addSalesData?.price}
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
                    value={addSalesData?.status}
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
                variant="outlined"value={addSalesData?.collection_date}
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
        <Button onClick={()=> setOpen(false)}>Cancel</Button>
        <Button onClick={()=>{
          setOpen(false)
          onConfirm()
        }} autoFocus>
            Add
        </Button>
        </DialogActions>
    </Dialog>

  );
}



