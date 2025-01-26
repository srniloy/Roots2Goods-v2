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
import { TextField } from '@mui/material';
import { SubLoader } from '@app/loading';
import UserContext from '@context/userContext';
import moment from 'moment';


moment.updateLocale('en', {
  relativeTime: {
       future: "in %s",
       past:   "%s ago",
       s:  "seconds",
       m:  "1 minute",
       mm: "%d minutes",
       h:  "1 hour",
       hh: "%d hours",
       d:  "1 day",
       dd: "%d days",
       M:  "1 month",
       MM: "%d months",
       y:  "1 year",
       yy: "%d years"
 }
});

const columns = [
  { id: 'slot', label: 'Slot Id', align: 'center', minWidth: 100 },
  { id: 'seller_name', label: 'Seller Name', align: 'center', minWidth: 120 },
  {
    id: 'createdAt',
    label: 'Date',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString(),
  },
  {
    id: 'productAge',
    label: 'Product Age',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString(),
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
    label: 'Price (per kg)',
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
  {
    id: 'transport_cost',
    label: 'Transport Cost',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString(),
  },
  {
    id: 'total_amount',
    label: 'Total Amount',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString(),
  },
  {
    id: 'avg_price',
    label: 'Avg. Price (per kg)',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString(),
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 120,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
];







const SlotTable = ({stockSlots, setStockSlots, total}) => {
    const {user, setUser} = React.useContext(UserContext)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(4);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
      
    };


    
  return (
    <div style={{position: 'relative', width: '100%', height: '100%'}}>
        <Paper sx={{ width: '100%', overflow: 'hidden', margin: '50px 0', backgroundColor: "transparent" }}>
            <TableContainer sx={{ maxHeight: 500, minHeight: 300 }}>
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
                  {stockSlots
                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.slot}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            if(column.id == 'slot'){
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {row.slot}
                                </TableCell>
                              );
                            }
                            else if(column.id == 'status'){
                              if(row[column.id] == 'Ready to sell'){
                                  return (
                                      <TableCell key={column.id} align={column.align}>
                                          <Button variant="outlined" color='success' style={{fontSize:'12px'}}>
                                              {row[column.id]}
                                          </Button>
                                      </TableCell>
                                  );
                              }
                              if(row[column.id] == 'Not Ready'){
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
                            
                            else if(column.id == 'transport_cost'){
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {row[column.id].toLocaleString('en-us')}
                                </TableCell>
                              );
                            }
                            else if(column.id == 'total_amount'){
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {(row['amount']+row['transport_cost']).toLocaleString('en-us')}
                                </TableCell>
                              );
                            }
                            else if(column.id == 'avg_price'){
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {((row['amount']+row['transport_cost'])/row['quantity']).toLocaleString('en-us')}
                                </TableCell>
                              );
                            }
                            else if(column.id == 'createdAt'){
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {row[column.id].split('T')[0]}
                                </TableCell>
                              );
                            }
                            else if(column.id == 'productAge'){
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {moment(row['collection_date']).fromNow(true)}
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
                    })}
                    <TableRow>
                        <TableCell colSpan={6}  style={{borderBottomWidth: '0px'}}/>
                        <TableCell key={'totalLabel'} align='center' style={{fontWeight: '700', fontSize: '16px'}}> Total Cost </TableCell>
                        <TableCell key={'totalAmount'} align='center' style={{fontWeight: '700', fontSize: '16px'}}> {
                            total?.total_costs.toLocaleString('en-US')
                        } </TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[4, 8, 12, 16, 20]}
                component="div"
                count={stockSlots?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>



    </div>
  )
}

export default SlotTable