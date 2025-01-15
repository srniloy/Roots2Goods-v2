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
import { TextField } from '@mui/material';
import Invoice from '@components/Invoice';
import PrintIcon from '@mui/icons-material/Print';
import { useReactToPrint } from 'react-to-print';
import { SubLoader } from '@app/loading';


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



  const columns1 = [
    { id: 'name', label: 'Trader Name', align: 'center', minWidth: 180 },
    { id: 'phone', label: 'Phone', align: 'center', minWidth: 150 },
    { id: 'address', label: 'Location', align: 'center', minWidth: 150 },
    { id: 'quantity', label: 'Quantity', align: 'center', minWidth: 100, format: (value) => value+' kg',},
    { id: 'price', label: 'Price (per kg)', align: 'center', minWidth: 80, format: (value) => value+' Taka', },
    { id: 'amount', label: 'Amount', align: 'center', minWidth: 80, format: (value) => value+' Taka', },
    {
        id: 'Acceptance',
        label: 'Acceptance',
        minWidth: 80,
        align: 'center',
    }
  ];

  





const SellingTable = (props) => {








    const [isLoad, setIsLoad] = React.useState(true);

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

    const [open, setOpen] = React.useState(false);
    const [salesEditData, setSalesEditData] = React.useState({});


    const handleClickOpen = (data) => {
        setOpen(true);
        setSalesEditData(data)
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [openSalesOffer, setOpenSalesOffer] = React.useState(false);

    const handleClickOpenSalesOffer = () => {
        setOpenSalesOffer(true);
    };

    const handleCloseSalesOffer = () => {
        setOpenSalesOffer(false);
    };


    // =============================== Invoice ======================================================================

    const [openInvoice, setOpenInvoice] = React.useState(false);

    const handleClickOpenInvoice = () => {
      setOpenInvoice(true);
    };
  
    const handleCloseInvoice = () => {
      setOpenInvoice(false);
      handleCloseSalesOffer();
    };

    const [openFullInvoice, setOpenFullInvoice] = React.useState(false);

    const handleClickOpenFullInvoice = () => {
        setOpenFullInvoice(true);
    };
  
    const handleCloseFullInvoice = () => {
        printInvoice();
        setOpenFullInvoice(false);
    };

    const componentRef = useRef(null);

    const printInvoice = useReactToPrint({
        content: () => componentRef.current,
    })


    let startedYear = 2009;
    const [page1, setPage1] = React.useState(0);
    const [rowsPerPage1, setRowsPerPage1] = React.useState(4);

    const handleChangePage1 = (event, newPage) => {
        setPage1(newPage);
    };

    const handleChangeRowsPerPage1 = (event) => {
        setRowsPerPage1(+event.target.value);
        setPage1(0);
    };




        // ===========================================       API CALLS       ==================================================================

        const [salesData, setSalesData] = React.useState(undefined)

        let totalSales = 0;
        const getTotalSales = ()=>{
            salesData?.forEach(element => {
                if(element.status == 'Sold Out')
                totalSales += element.amount;
            })
            props.total.setTotal(ex=>({
                ...ex,
                total_sales: totalSales
            }))
    
            updateTotalSales(props.project_id, totalSales)
    
            return totalSales.toLocaleString('en-us');
        }
    
    
    
    
    
    
    const fetchSales = async ()=>{
        const postData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({project_id: props.project_id}),
        };
    
        const res = await fetch(
        '/api/get/get_sales',
        postData
        )
        const response = await res.json()
        setSalesData(response.data)
        console.log(response.data)
        setIsLoad(false)
    }
    
    React.useEffect(() => {
        fetchSales()
    }, []);


    



    const updateSales = async ()=>{
        
            
            const postData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(salesEditData),
            };
        
            const res = await fetch(
            '/api/update/sales_update',
            postData
            )
            const response = await res.json()
            console.log(response)
            
            fetchSales()

        }

        const deleteSales = async (data)=>{
        
            
        const postData = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
    
        const res = await fetch(
            '/api/delete/sales_delete',
            postData
        )
        const response = await res.json()
        console.log(response)
        setSalesData(undefined)
        fetchSales()
    }
    
    
         
        const updateTotalSales = async (project_id, total_sales)=>{
            
              
          const postData = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              project_id: project_id,
              total_sales: total_sales
            }),
          };
      
          const res = await fetch(
            '/api/update/total_sales_update',
            postData
          )
          const response = await res.json()
      }
    
    
    const [totalOffersList, setTotalOffersList] = React.useState()
    const [currentSalesRow, setCurrentSalesRow] = React.useState(false)



    const getOffersList = async (row)=>{
        if(row.status != 'Pending'){
            setCurrentSalesRow(true)
        }
        const postData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            sales_id: row.id,
            project_id: row.project_id
        }),
        };
    
        const res = await fetch(
        '/api/get/get_sales_offer_list',
        postData
        )
        const response = await res.json()
        setTotalOffersList(response.data)
        // console.log(response.data)
    }



    const [acceptedOfferInfo, setAcceptedOfferInfo] = React.useState()


    const salesAndOfferStatusUpdate = async()=>{
        const postData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(acceptedOfferInfo),
            };
            
        const res = await fetch(
            '/api/update/update_sales_offers_status',
            postData
        )
        const response = await res.json()
        setSalesData(undefined)
        fetchSales()
    }











    // ===============================                     =================================================================


















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
                    {salesData
                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                        return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
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
                                else if(column.id == 'Actions'){
                                    return(
                                        <TableCell key={column.id} align={column.align}>
                                        
                                        <IconButton aria-label="delete" onClick={()=>deleteSales(row)} color='error'>
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton aria-label="edit" color='primary' onClick={() => handleClickOpen(row)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    )
                                }
                                else if(column.id == 'ViewOffers'){
                                    return(
                                        <TableCell key={column.id} align={column.align}>
                                        
                                        <Badge badgeContent={row.total_offers} color="primary">
                                            <Button disabled={row.status == 'Pending' ? false : true}  variant='outlined' onClick={()=>{
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
                    <TableRow>
                        <TableCell colSpan={2}  style={{borderBottomWidth: '0px'}}/>
                        <TableCell key={'totalLabel'} align='center' style={{fontWeight: '700', fontSize: '16px'}}> Total Sales </TableCell>
                        <TableCell key={'totalAmount'} align='center' style={{fontWeight: '700', fontSize: '16px'}}> {
                            `${getTotalSales()} Taka`
                        } </TableCell>
                    </TableRow>
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[4, 8, 10]}
                component="div"
                count={salesData?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>






{/* ===================================       Dialog Boxed        ============================================================================= */}






        <Dialog
        open={openSalesOffer}
        onClose={handleCloseSalesOffer}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
            '& .css-1qxadfk-MuiPaper-root-MuiDialog-paper':{
                maxWidth: '1200px !important',
            }
        }}
        >
            <DialogTitle id="alert-dialog-title">
            {"Offers From Trader"}
            </DialogTitle>
            <DialogContent>
                <Paper sx={{ width: '100%', overflow: 'hidden', backgroundColor: "transparent" }}>
                    <TableContainer sx={{ maxHeight: 400, minHeight: 300 }}>
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
                            {totalOffersList
                            ?.slice(page1 * rowsPerPage1, page1 * rowsPerPage1 + rowsPerPage1)
                            .map((row) => {
                                return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns1.map((column) => {
                                    if(column.id == 'Actions'){
                                        return(
                                            <TableCell key={column.id} align={column.align}>
                                            
                                            <Button variant='outlined' href='/farmer-dashboard/message' style={{fontSize: '12px'}}>Message</Button>

                                        </TableCell>
                                        )
                                    }
                                    if(column.id == 'Acceptance'){
                                        return(
                                            <TableCell key={column.id} align={column.align}>
                                            
                                            <Button disabled={currentSalesRow} variant='outlined' onClick={()=>{
                                                handleClickOpenInvoice()
                                                setAcceptedOfferInfo(row)
                                            }} style={{fontSize: '12px'}}>Accept</Button>

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
                    <TablePagination
                        rowsPerPageOptions={[4, 8, 16]}
                        component="div"
                        count={totalOffersList?.length}
                        rowsPerPage={rowsPerPage1}
                        page={page1}
                        onPageChange={handleChangePage1}
                        onRowsPerPageChange={handleChangeRowsPerPage1}
                    />
                    </Paper>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseSalesOffer}>Cancel</Button>
            <Button onClick={handleCloseSalesOffer} autoFocus>
                Save
            </Button>
            </DialogActions>
        </Dialog>

        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Update Sales"}
            </DialogTitle>
            <DialogContent>
                    <form style={{width: '410px'}}>
                        <TextField
                        style={{ width: "400px", margin: "5px" }}
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
                        style={{ width: "400px", margin: "5px" }}
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
                        <FormControl style={{ width: "400px", margin: "10px 5px" }}>
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
                        style={{ width: "400px", margin: "5px" }}
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
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={()=> {updateSales(); handleClose()}} autoFocus>
                Upadate
            </Button>
            </DialogActions>
        </Dialog>





        <Dialog
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
        </Dialog>








    </div>
  )
}

export default SellingTable