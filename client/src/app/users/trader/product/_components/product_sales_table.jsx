import React, {useRef, useContext} from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Badge from '@mui/material/Badge';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
// import Invoice from '../Invoice';
import PrintIcon from '@mui/icons-material/Print';
import { useReactToPrint } from 'react-to-print';
import Checkbox from '@mui/material/Checkbox';
import UserContext from '@context/userContext';
import { AddNewOffer } from '@services/td-service/dashboard_service';


const columns = [
    { id: 'Step', label: 'Step', align: 'center', minWidth: 50 },
    { id: 'quantity', label: 'Quantity', align: 'center', minWidth: 100, format: (value) => value+' kg',},
    { id: 'price', label: 'Price (per kg)', align: 'center', minWidth: 80, format: (value) => value+' Taka', },
    { id: 'amount', label: 'Amount', align: 'center', minWidth: 120, format: (value) => value.toLocaleString('en-US')+' Taka',},
    {
      id: 'status',
      label: 'Status',
      minWidth: 120,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'collection_date',
        label: 'Collection Date',
        minWidth: 100,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
      {
        id: 'SendOffer',
        label: 'Send Offer',
        minWidth: 80,
        align: 'center',
      },
     
   
  ];
  
  function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
  }
  
  const rows = [
    createData('India', 'IN', 1324171354, 9545661),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
  ];





const ProductSalesTable = ({productDetails}) => {
    const {user, setUser} = useContext(UserContext)
    const salesData = [{
        id: productDetails?._id,
        quantity: productDetails?.quantity, 
        price: productDetails?.price, 
        amount: (productDetails?.quantity * productDetails?.price),
        status: productDetails?.status, 
        collection_date: productDetails?.collection_date,
        project_id: productDetails?.project_id._id,
    }]
    
    let sellingStep = 0;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(8);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    // =============================== Invoice ======================================================================


    const [openSendOffer, setOpenSendOffer] = React.useState(false);

    const handleClickOpenSendOffer = () => {
        setOpenSendOffer(true);
    };
  
    const handleCloseSendOffer = () => {
        setOpenSendOffer(false);
    };

    const componentRef = useRef(null);


    let startedYear = 2009;
    const [page1, setPage1] = React.useState(0);
    const [rowsPerPage1, setRowsPerPage1] = React.useState(5);

    const handleChangePage1 = (event, newPage) => {
        setPage1(newPage);
    };

    const handleChangeRowsPerPage1 = (event) => {
        setRowsPerPage1(+event.target.value);
        setPage1(0);
    }


    // =========================================================================================================

    // const [salesData, setSalesData] = React.useState(undefined)




    const [offerData, setOfferData] = React.useState({
        price: '',
        quantity: ''
    })


    const addOffers= async ()=>{
        console.log(offerData);
        const res = await AddNewOffer(offerData);
        if(res.status == 200){
            console.log(res.data);
            setOfferData({
                price: '',
                quantity: ''
            })
        }else{
            alert(res.message)
        }
    }



    









  return (
    <div>
        <Paper sx={{ width: '100%', overflow: 'hidden', margin: '40px 0',marginBottom:'200px', backgroundColor: "transparent" }}>
            <TableContainer sx={{ maxHeight: 500 }}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth, backgroundColor: "rgba(36, 68, 65, 0.946)" }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {salesData
                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                        return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id+sellingStep}>
                            {columns.map((column) => {
                                if(column.id == 'Step'){
                                    return (
                                        <TableCell key={column.id} align={column.align}>
                                            {++sellingStep}
                                    </TableCell>
                                    );
                                }
                                else if(column.id == 'status'){
                                    if(row[column.id] == 'Pending'){
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                <Button variant="outlined" color='primary' style={{fontSize:'12px'}}>
                                                    {row[column.id]}
                                                </Button>
                                            </TableCell>
                                        );
                                    }
                                    if(row[column.id] == 'Processing'){
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                <Button variant="outlined" color='warning' style={{fontSize:'12px'}}>
                                                    {row[column.id]}
                                                </Button>
                                            </TableCell>
                                        );
                                    }
                                    else{
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                <Button variant="outlined" color='error' style={{fontSize:'12px'}}>
                                                    {row[column.id]}
                                                </Button>
                                            </TableCell>
                                        );
                                    }
                                }
                                else if(column.id == 'SendOffer'){
                                    return(
                                        <TableCell key={column.id} align={column.align}>
                                            <Button disabled={!(row['status'] == 'Pending')} variant={'contained'} onClick={()=>{
                                                setOfferData(ex=>({
                                                    ...ex,
                                                    offered_by: user?._id,
                                                    sales_id: row.id,
                                                    project_id: row.project_id
                                                }))
                                                handleClickOpenSendOffer()
                                            }} style={{fontSize: '12px'}}>Send</Button>
                                        </TableCell>
                                    )
                                }
                                else{
                                    const value = row[column.id];
                                    return (
                                        <TableCell key={column.id} align={column.align}>
                                        {column.format && typeof value === 'number'
                                            ? column.format(value)
                                            : value}
                                        </TableCell>
                                    );
                                }
                            
                            })}
                        </TableRow>
                        );
                    })}
                </TableBody>
                </Table>
            </TableContainer>
            
        </Paper>




        

        {/* <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Update Sales"}
            </DialogTitle>
            <DialogContent>
                <form>
                <TextField
                    style={{ width: "400px", margin: "5px" }}
                    type="text"
                    label="Amount"
                    variant="outlined"
                    />
                    <br />
                    <TextField
                    style={{ width: "400px", margin: "5px" }}
                    type="text"
                    label="Price (per kg)"
                    variant="outlined"
                    />
                    <br />
                    <TextField
                    style={{ width: "400px", margin: "5px" }}
                    type="text"
                    label="Status"
                    variant="outlined"
                    />
                    <br />
                    <TextField
                    style={{ width: "400px", margin: "5px" }}
                    type="text"
                    label="Collection Date"
                    variant="outlined"
                    />
                    <br />
                </form>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose} autoFocus>
                Upadate
            </Button>
            </DialogActions>
        </Dialog> */}





        <Dialog
        open={openSendOffer}
        onClose={handleCloseSendOffer}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
            '& .css-1qxadfk-MuiPaper-root-MuiDialog-paper':{
                maxWidth: '1200px !important',
            }
        }}
        >
            <DialogTitle id="alert-dialog-title">
            {"Send Offer"}
            </DialogTitle>
            <DialogContent>
                <form className='dialog-form' style={{width: '420px'}}>
                    <TextField 
                        style={{ width: "100%", margin: "5px" }}
                        type="number"
                        label="Quantity"
                        variant="outlined"
                        value={offerData.quantity}
                        onChange={(e)=>{
                            setOfferData(ex=>({
                                ...ex,
                                quantity: e.target.value,
                            }))
                        }}
                        />
                        <br />
                        <TextField
                        style={{ width: "100%", margin: "5px" }}
                        type="number"
                        label="Price (per kg)"
                        variant="outlined"
                        value={offerData.price}
                        onChange={(e)=>{
                            setOfferData(ex=>({
                                ...ex,
                                price: e.target.value,
                            }))
                        }}
                        />
                        <br />
                        <br />
                </form>
            </DialogContent>
            <DialogActions style={{paddingBottom: '20px', paddingRight: '20px'}}>
            <Button onClick={handleCloseSendOffer}>Cancel</Button>
            <Button onClick={()=>{
                
                handleCloseSendOffer()
                addOffers()
            }} autoFocus>
                Send
            </Button>
            </DialogActions>
        </Dialog>

        








    </div>
  )
}

export default ProductSalesTable