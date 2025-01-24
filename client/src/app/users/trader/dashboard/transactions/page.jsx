'use client'
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, ThemeProvider, createTheme } from '@mui/material';
import { Loader, SubLoader } from '@app/loading';
import UserContext from '@context/userContext';
import { GetTransactions } from '@services/td-service/dashboard_service';



const columns = [
  { id: 'order_id', label: 'Transaction ID', align: 'center', minWidth: 100 },
  { id: 'buyer_name', label: 'Buyer Name', align: 'center', minWidth: 120 },
  { id: 'seller_name', label: 'Seller Name', align: 'center', minWidth: 120 },
  {
    id: 'product_name',
    label: 'Product',
    minWidth: 120,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'date',
    label: 'Date',
    minWidth: 120,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'quantity',
    label: 'Quantity',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString(),
  },
  {
    id: 'price',
    label: 'Price (Per KG)',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString(),
  },
  {
    id: 'amount',
    label: 'Amount',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString(),
  },
];






const Transactions = (props) => {

  const {user, setUser} = React.useContext(UserContext)
  const [isLoad, setIsLoad] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  
  const [transactionLists, setTransactionLists] = React.useState([])


  const fetchData = async ()=>{
    const res = await GetTransactions(user?._id)
    if(res.status == 200){
      console.log(res.data);
      setTransactionLists(res.data)
    }else{
      alert(res.message)
    }
  }
  
  React.useEffect(() => {
    fetchData()
  }, []);






  return (
    <div>
      
      <Paper className='transaction-table' sx={{ width: '100%', overflow: 'hidden', margin: '50px 0', backgroundColor: "transparent" }}>
            <TableContainer sx={{ maxHeight: 500, minHeight: '430px', position: 'relative' }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth, backgroundColor: "rgba(36, 68, 65, 0.946)"}}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    transactionLists.length > 0 ?
                    transactionLists?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                          {columns.map((column) => {
                            if(column.id == 'date'){
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {(row.createdAt).split('T')[0]}
                                </TableCell>
                              );
                            }
                            else if(column.id == 'order_id'){
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {row._id}
                                </TableCell>
                              );
                            }
                            else if(column.id == 'buyer_name'){
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {row.buyer_id.name}
                                </TableCell>
                              );
                            }
                            else if(column.id == 'seller_name'){
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {row.seller_id.name}
                                </TableCell>
                              );
                            }
                            else if(column.id == 'product_name'){
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {row.product_id?.product_name ? row.product_id.product_name : row.stock_id.product_name}
                                </TableCell>
                              );
                            }
                            else if(column.id == 'quantity'){
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {row.sales_id.quantity}
                                </TableCell>
                              );
                            }
                            else if(column.id == 'price'){
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {row.sales_id.price}
                                </TableCell>
                              );
                            }
                            else if(column.id == 'amount'){
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {(row.sales_id.quantity*row.sales_id.price).toLocaleString('en-US')}
                                </TableCell>
                              );
                            }
                            else{
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : 'value'}
                                </TableCell>
                              );
                            }
                          })}
                        </TableRow>
                      );
                    }): (<TableRow></TableRow>)}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[7, 10, 16]}
              component="div"
              count={transactionLists?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />



            
          </Paper>
    </div>
    



  );
}

export default Transactions