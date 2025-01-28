import React from 'react'
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

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Badge, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
// import { DeleteExpense, GetOffersList, UpdateProjectExpense, UpdateProjectSales, UpdateStatusOnOfferAcceptance } from '@services/fd-service/project_service';
import ConfirmationAlert from '@components/ui/confirmation-alert';
import { DeleteSales, GetSalesOffersList, UpdateProjectSales } from '@services/td-service/product_service';
import { UpdateStatusOnOfferAcceptance } from '@services/wd-service/product_service';



const columns = [
  { id: 'Step', label: 'Step', align: 'center', minWidth: 50 },
  { id: 'quantity', label: 'Quantity', align: 'center', minWidth: 100, format: (value) => value+' kg',},
  { id: 'price', label: 'Price (per kg)', align: 'center', minWidth: 80, format: (value) => value+' Taka', },
  { id: 'amount', label: 'Amount', align: 'center', minWidth: 120, format: (value) => value.toLocaleString('en-US')+' Taka',},
  {
      id: 'collection_date',
      label: 'Collection Date',
      minWidth: 100,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 120,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  
  
  {
      id: 'ViewOffers',
      label: 'View Offers',
      minWidth: 80,
      align: 'center',
    },
  {
      id: 'Actions',
      label: 'Actions',
      minWidth: 120,
      align: 'center',
    },
   
 
];




const columns1 = [
  { id: 'name', label: 'Wholesaler Name', align: 'center', minWidth: 180 },
  { id: 'phone', label: 'Phone', align: 'center', minWidth: 150 },
  { id: 'address', label: 'Location', align: 'center', minWidth: 150 },
  { id: 'quantity', label: 'Quantity', align: 'center', minWidth: 100, format: (value) => value.toLocaleString('us')+' kg',},
  { id: 'price', label: 'Price (per kg)', align: 'center', minWidth: 80, format: (value) => value.toLocaleString('us')+' Taka', },
  { id: 'amount', label: 'Amount', align: 'center', minWidth: 80, format: (value) => value.toLocaleString('us')+' Taka', },
  {
      id: 'Acceptance',
      label: 'Acceptance',
      minWidth: 80,
      align: 'center',
  }
  
];










const SalesTable = ({productSales, setProductSales, rerender, setRerender}) => {
  let sellingStep = 0;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(4);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
      
    };

    const [isSalesEditDialogOpen, setIsSalesEditDialogOpen] = React.useState(false);
    const [isOfferAcceptanceDialogOpen, setIsOfferAcceptanceDialogOpen] = React.useState(false);
    const [salesEditData, setSalesEditData] = React.useState({});
    const [openSalesOffer, setOpenSalesOffer] = React.useState(false);
    const [offersList, setOffersList] = React.useState()
    const [acceptedOffersId, setAcceptedOffersId] = React.useState('')




    const [page1, setPage1] = React.useState(0);
    const [rowsPerPage1, setRowsPerPage1] = React.useState(4);

    const handleChangePage1 = (event, newPage) => {
        setPage1(newPage);
    };

    const handleChangeRowsPerPage1 = (event) => {
        setRowsPerPage1(+event.target.value);
        setPage1(0);
    };


    // =============================================================================================================





  const calculateTotal = (allSales)=>{
    let totalSales = 0
    allSales?.map(exp => { exp.status == 'Sold Out'? totalSales += (exp.price * exp.quantity): totalSales += 0})
    return totalSales
  }

  const deleteSales = async (sales_id)=>{
    const res = await DeleteSales(sales_id)
    console.log(sales_id);
    if(res.status == 200){
      setRerender(!rerender)
    }else{
      alert(res.message)
    }
  }

  const updateSales = async ()=>{
    console.log(salesEditData);
    const res = await UpdateProjectSales(salesEditData)
    if(res.status == 200){
      setRerender(!rerender)
    }else{
      alert(res.message)
    }
  }

  console.log(productSales);



  const getOffersList = async (sales_id)=>{
    const res = await GetSalesOffersList(sales_id)
    if(res.status == 200){
        // setRerender(!rerender)
        console.log(res.data);
        
        setOffersList(res.data)
    }else{
        alert(res.message)
    }
    console.log("clicked");
}


const onAcceptanceAction = async ()=>{
    setIsOfferAcceptanceDialogOpen(false)
    setOpenSalesOffer(false)
    const res = await UpdateStatusOnOfferAcceptance(acceptedOffersId)
    if(res.status == 200){
        setRerender(!rerender)
        console.log(res.data);
        
        // setOffersList(res.data)
    }else{
        alert(res.message)
    }

}








  return (
    <div style={{height: '100%', width: '100%', position: 'relative'}}>
        <Paper sx={{ width: '100%', minHeight: '400px', overflow: 'hidden', margin: '40px 0', backgroundColor: "transparent" }}>
            <TableContainer sx={{ maxHeight: 500, minHeight: 300 }}>
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
                    {productSales
                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                        return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                            {columns.map((column) => {
                                if(column.id == 'Step'){
                                    return (
                                        <TableCell key={column.id} align={column.align}>
                                            {++sellingStep}
                                    </TableCell>
                                    );
                                }
                                if(column.id == 'amount'){
                                  return (
                                      <TableCell key={column.id} align={column.align}>
                                          {(row.quantity * row.price).toLocaleString('us')}
                                  </TableCell>
                                  );
                              }
                                else if(column.id == 'status'){
                                    if(row[column.id] == 'Ready to sell'){
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
                                else if(column.id == 'Actions'){
                                    return(
                                        <TableCell key={column.id} align={column.align}>
                                        
                                        <IconButton aria-label="delete" onClick={()=>deleteSales(row._id)} color='error'>
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton aria-label="edit" color='primary' onClick={() => {
                                          setIsSalesEditDialogOpen(true)
                                          setSalesEditData(row)
                                        }}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    )
                                }
                                else if(column.id == 'ViewOffers'){
                                    return(
                                        <TableCell key={column.id} align={column.align}>
                                        <Badge badgeContent={row.total_offers} color="primary">
                                            <Button disabled={row.status == 'Ready to sell' ? false : true}  variant={'contained'} onClick={()=>{
                                                setOpenSalesOffer(true)
                                                getOffersList(row._id)
                                            }} style={{fontSize: '12px'}}>Offers</Button>
                                        </Badge>
                                    </TableCell>
                                    )
                                }
                                // else if(column.id == 'Receipt' && row['Status'] == 'Sold Out'){
                                //     return(
                                //         <TableCell key={column.id} align={column.align}>
                                //             <Button variant='outlined' onClick={handleClickOpenFullInvoice} style={{fontSize: '12px'}}>Receipt</Button>
                                //         </TableCell>
                                //     )
                                // }
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
                    <TableRow>
                        <TableCell colSpan={2}  style={{borderBottomWidth: '0px'}}/>
                        <TableCell key={'totalLabel'} align='center' style={{fontWeight: '700', fontSize: '16px'}}> Total Sales </TableCell>
                        <TableCell key={'totalAmount'} align='center' style={{fontWeight: '700', fontSize: '16px'}}> {
                            `${calculateTotal(productSales).toLocaleString('us')} Taka`
                        } </TableCell>
                    </TableRow>
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[4, 8, 10]}
                component="div"
                count={productSales?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>






{/* ===================================       Dialog Boxed        ============================================================================= */}




<Dialog
        open={openSalesOffer}
        onClose={()=>setOpenSalesOffer(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
            '& .css-16bx961-MuiPaper-root-MuiDialog-paper':{
                maxWidth: '1200px !important',
            }
        }}
        >
            <DialogTitle id="alert-dialog-title">
            {"Offers From The Wholesalers"}
            </DialogTitle>
            <DialogContent>
                <Paper sx={{ width: '1000px', overflow: 'hidden', backgroundColor: "transparent" }}>
                    <TableContainer sx={{ maxHeight: 400, minHeight: 300,}}>
                        <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                            {columns1.map((column) => (
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
                            {offersList
                            ?.slice(page1 * rowsPerPage1, page1 * rowsPerPage1 + rowsPerPage1)
                            .map((row) => {
                                return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                    {columns1.map((column) => {
                                    if(column.id == 'Actions'){
                                        return(
                                            <TableCell key={column.id} align={column.align}>
                                            
                                            <Button variant='outlined' href='/farmer-dashboard/message' style={{fontSize: '12px'}}>Message</Button>

                                        </TableCell>
                                        )
                                    }
                                    else if(column.id == 'Acceptance'){
                                        return(
                                            <TableCell key={column.id} align={column.align}>
                                            
                                            <Button disabled={false} variant='outlined' onClick={()=>{
                                                setIsOfferAcceptanceDialogOpen(true)
                                                setAcceptedOffersId(row._id)
                                            }} style={{fontSize: '12px'}}>Accept</Button>

                                        </TableCell>
                                        )
                                    }
                                    else if(column.id == 'name' || column.id == 'phone' || column.id == 'address'){
                                        const value = row.offered_by[column.id];
                                        return (
                                        <TableCell key={column.id} align={column.align}>
                                            {column.format && typeof value === 'number'
                                            ? column.format(value)
                                            : value}
                                        </TableCell>
                                        );
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
                    <TablePagination
                        rowsPerPageOptions={[4, 8, 16]}
                        component="div"
                        count={offersList?.length}
                        rowsPerPage={rowsPerPage1}
                        page={page1}
                        onPageChange={handleChangePage1}
                        onRowsPerPageChange={handleChangeRowsPerPage1}
                    />
                    </Paper>
            </DialogContent>
            <DialogActions>
            <Button onClick={()=>setOpenSalesOffer(false)}>Cancel</Button>
            <Button onClick={()=>setOpenSalesOffer(false)} autoFocus>
                Save
            </Button>
            </DialogActions>
        </Dialog>

        <Dialog
        open={isSalesEditDialogOpen}
        onClose={()=>setIsSalesEditDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Update Sales"}
            </DialogTitle>
            <DialogContent>
                    <form className="dialog-form" style={{width: '410px'}}>
                        <TextField
                        style={{ width: "100%", margin: "5px" }}
                        type="number"
                        label="Quantity (kg)"
                        variant="outlined"
                        value={salesEditData?.quantity}
                        onChange={(e)=>{
                            setSalesEditData(ex=>({
                            ...ex,
                            quantity: e.target.value
                        }))
                        }}
                        />
                        <TextField
                        style={{ width: "100%", margin: "5px" }}
                        type="number"
                        label="Price (per kg)"
                        variant="outlined"
                        value={salesEditData?.price}
                        onChange={(e)=>{
                            setSalesEditData(ex=>({
                            ...ex,
                            price: e.target.value
                        }))
                        }}
                        />
                        <FormControl style={{ width: "100%", margin: "10px 5px" }}>
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={salesEditData?.status}
                            label="Status"
                            onChange={(e)=>{
                                setSalesEditData(ex=>({
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
                        style={{ width: "100%", margin: "5px" }}
                        type="date"
                        label="Collection Date"
                        focused
                        variant="outlined"value={salesEditData?.collection_date}
                        onChange={(e)=>{
                        setSalesEditData(ex=>({
                            ...ex,
                            collection_date: e.target.value
                        }))
                        }}
                        />
                    </form>
            </DialogContent>
            <DialogActions>
            <Button onClick={()=>setIsSalesEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={()=> {
              setIsSalesEditDialogOpen(false)
              updateSales()
              }} autoFocus>
                Upadate
            </Button>
            </DialogActions>
        </Dialog>


            <ConfirmationAlert open={isOfferAcceptanceDialogOpen} setOpen={setIsOfferAcceptanceDialogOpen} 
                title={'Do you want to accept this offer?'} onConfirm={onAcceptanceAction}/>


        {/* <Dialog
        open={openInvoice}
        onClose={handleCloseInvoice}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
            '& .css-1qxadfk-MuiPaper-root-MuiDialog-paper':{
                maxWidth: '1200px !important',
            }
        }}
        >
            <DialogTitle id="alert-dialog-title">
            {"Are you sure to go forward with this price ?"}
            </DialogTitle>
            
            <DialogActions>
            <Button onClick={handleCloseInvoice}>Cancel</Button>
            <Button onClick={()=>{
                handleCloseInvoice()
                salesAndOfferStatusUpdate()
            }} autoFocus>
                Proceed
            </Button>
            </DialogActions>
        </Dialog>

        <Dialog
        open={openFullInvoice}
        onClose={handleCloseFullInvoice}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
            '& .css-1qxadfk-MuiPaper-root-MuiDialog-paper':{
                maxWidth: '1200px !important',
            }
        }}
        >
            <DialogTitle id="alert-dialog-title">
            {"Review the Receipt"}
            </DialogTitle>
            <DialogContent>
                <Invoice size='full' ref={componentRef}/>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseFullInvoice}>Cancel</Button>
            <Button onClick={handleCloseFullInvoice} startIcon={<PrintIcon/>} autoFocus>
                Print
            </Button>
            </DialogActions>
        </Dialog> */}








    </div>
  )
}

export default SalesTable