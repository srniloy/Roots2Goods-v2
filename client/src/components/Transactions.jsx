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



const columns = [
  { id: 'order_id', label: 'Transaction ID', align: 'center', minWidth: 100 },
  { id: 'buyer_name', label: 'Seller Name', align: 'center', minWidth: 120 },
  {
    id: 'product',
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


  const [isLoad, setIsLoad] = React.useState(true);
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
      const postData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user_id: props.info.user_id}),
      };

      const res = await fetch(
      '/api/get/get_transaction_lists_for_farmer',
      postData
      )
      const response = await res.json()
      if(response.data)
        setTransactionLists(response.data)
      setIsLoad(false)
      // console.log(response.data)
      // setIsLoad(false)
  }
  
  React.useEffect(() => {
    fetchData()
  }, []);






  return (
    <div>
      
      <Paper className='transaction-table' sx={{ width: '100%', overflow: 'hidden', margin: '50px 0', backgroundColor: "transparent" }}>
              <SubLoader open={isLoad}/>
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
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            if(column.id == 'date'){
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {value.slice(3, value.length)}
                                </TableCell>
                              );
                            }
                            else if(column.id == 'transport_cost'){
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {parseInt(row[column.id].split(' ')[0])}
                                </TableCell>
                              );
                            }
                            else if(column.id == 'total_amount'){
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {row['amount']+parseInt(row['transport_cost'].split(' ')[0])}
                                </TableCell>
                              );
                            }
                            else{
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
                    }): ''}
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