import React, {useRef} from 'react'
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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, Tooltip } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import { useReactToPrint } from 'react-to-print';
import { SubLoader } from '@app/loading';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useRouter } from 'next/navigation';



const columns = [
    {
        id: 'cancel',
        label: 'Cancel',
        minWidth: 30,
        align: 'left',
      },
    { id: 'product_name', label: 'Product Name', align: 'center', minWidth: 80, format: (value) => value,},
    { id: 'farmer_name', label: 'Farmer', align: 'center', minWidth: 100, },
    {
        id: 'offer_status',
        label: 'Status',
        minWidth: 100,
        align: 'center',
    },
    { id: 'quantity', label: 'Quantity', align: 'center', minWidth: 100, format: (value) => value+' kg',},
    { id: 'price', label: 'Price (per kg)', align: 'center', minWidth: 80, format: (value) => value+' Taka', },
    { id: 'amount', label: 'Amount', align: 'center', minWidth: 120, format: (value) => value.toLocaleString('en-US')+' Taka',},

    
  ];








const AcceptedOffersTable = (props) => {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(4);
    const router = useRouter()
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const [sendedOffersList, setSendedOffersList] = React.useState([])


    const fetchOffers = async ()=>{
        const postData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({project_id: props.info.project_id}),
        };
    
        const res = await fetch(
        '/api/get/accepted_offers_list',
        postData
        )
        const response = await res.json()
        setSendedOffersList(response.data)
        console.log(response.data)
        // setIsLoad(false)
    }
    
    React.useEffect(() => {
        fetchOffers()
    }, []);


    const [cancelOfferInfo, setCancelOfferInfo] = React.useState()
    const [openCancelDialog, setOpenCancelDialog] = React.useState(false)


    const cancelOffer = async()=>{
        // console.log(cancelOfferInfo)
        setSendedOffersList([])
        const postData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cancelOfferInfo),
            };
            
        const res = await fetch(
            '/api/update/update_sales_offers_On_cancel_from_farmer',
            postData
        )
        const response = await res.json()
        fetchOffers()
    }




    const proceedToBilling = async (row) =>{
        const postData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                row: row,
                current_user: props.info.user_id
            }),
            };
            
        const res = await fetch(
            '/api/add/add_orders',
            postData
        )
        const response = await res.json()
        if(response.status == 200){
            router.push(`/users/trader-dashboard/billing/${response?.order_id}`)
        }
        console.log(response)
    }







  return (
    <div style={{height: '100%', width: '100%', position: 'relative'}}>
        <SubLoader open={false}/>
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
                    {sendedOffersList
                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                        return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                            {columns.map((column) => {
                                if(column.id == 'cancel'){
                                    return(
                                        <TableCell key={column.id} align={column.align}>
                                        
                                        <Tooltip title='Cancel'>
                                            <IconButton aria-label="cancel" onClick={()=>{
                                                setCancelOfferInfo(row)
                                                setOpenCancelDialog(true)
                                            }} color='error' style={{marginRight: '20px'}}>
                                                <CancelOutlinedIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                    )
                                }
                                else if(column.id == 'Step'){
                                    return (
                                        <TableCell key={column.id} align={column.align}>
                                            {++sellingStep}
                                    </TableCell>
                                    );
                                }
                                else if(column.id == 'offer_status'){
                                    if(row[column.id] == 'Pending'){
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                <Button variant="outlined" color='warning' style={{fontSize:'12px'}}>
                                                    {row[column.id]}
                                                </Button>
                                            </TableCell>
                                        );
                                    }
                                    if(row[column.id] == 'Accepted'){
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                <Button variant="outlined" color='success' style={{fontSize:'12px'}}>
                                                    {row[column.id]}
                                                </Button>
                                            </TableCell>
                                        );
                                    }
                                    if(row[column.id] == 'Sold Out'){
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                <Button variant="outlined" color='error' style={{fontSize:'12px'}}>
                                                    {row[column.id]}
                                                </Button>
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
                                }
                                else if(column.id == 'ViewOffers'){
                                    return(
                                        <TableCell key={column.id} align={column.align}>
                                        
                                        <Badge badgeContent={row.total_offers} color="primary">
                                            <Button variant='outlined' onClick={()=>{
                                                handleClickOpenSalesOffer()
                                                getOffersList(row)
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
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[4, 8, 10]}
                component="div"
                count={sendedOffersList?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>









        <Dialog
        open={openCancelDialog}
        onClose={()=>setOpenCancelDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
            '& .css-1qxadfk-MuiPaper-root-MuiDialog-paper':{
                maxWidth: '1200px !important',
            }
        }}
        >
            <DialogTitle id="alert-dialog-title">
            {"Are you sure to cancel this offer ?"}
            </DialogTitle>
            
            <DialogActions>
            <Button onClick={()=>setOpenCancelDialog(false)}>no</Button>
            <Button onClick={()=>{
                setOpenCancelDialog(false)
                cancelOffer()
            }} autoFocus>
                Yes
            </Button>
            </DialogActions>
        </Dialog>












    </div>
  )
}

export default AcceptedOffersTable