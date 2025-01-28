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
import { DeleteExpense, UpdateProjectExpense } from '@services/fd-service/project_service';



const columns = [
    { id: 'sector', label: 'Expense Sector', align: 'left', minWidth: 120 },
    { id: 'date', label: 'Date', align: 'center', minWidth: 120 },
    { id: 'unit', label: 'Measurement Unit', align: 'center', minWidth: 100 },
    {
      id: 'cost',
      label: 'Cost',
      minWidth: 120,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
      {
        id: 'Actions',
        label: 'Actions',
        minWidth: 120,
        align: 'center',
      },
   
  ];
  







const ExpenseTable = ({projectExpenses, setProjectExpenses, rerender, setRerender}) => {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(4);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
      
    };

    const [isExpenseEditDialogOpen, setIsExpenseEditDialogOpen] = React.useState(false);
    const [expenseEditData, setExpenseEditData] = React.useState({});




    // =============================================================================================================





  const calculateTotal = (allExpenses)=>{
    let totalExpense = 0;
    allExpenses?.map(exp => {totalExpense += exp.cost})
    return totalExpense
  }

  const deleteExpense = async (expense_id)=>{
    const res = await DeleteExpense(expense_id)
    if(res.status == 200){
      setRerender(!rerender)
    }
  }

  const updateExpense = async ()=>{
    const res = await UpdateProjectExpense(expenseEditData)
    if(res.status == 200){
      setRerender(!rerender)
    }else{
      alert(res.message)
    }
  }

  console.log(projectExpenses);

  return (
    <div key={'kalskdfao'} style={{position: 'relative', width: '100%', height: '100%'}}>
        <Paper key={'alkdfjaifeaoir'} sx={{ width: '100%', overflowX: 'scroll', margin: '50px 0', backgroundColor: "transparent" }}>
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
                    {projectExpenses
                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                        return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                            {columns.map((column) => {
                                if(column.id == 'Date'){
                                    return (
                                        <TableCell key={column.id} align={column.align}>
                                            {row[column.id]}
                                    </TableCell>
                                    );
                                }
                                else if(column.id == 'Actions'){
                                  return(
                                      <TableCell key={column.id} align={column.align}>
                                      
                                      <IconButton aria-label="delete" onClick={()=>{
                                        deleteExpense(row)
                                      }} color='error'>
                                          <DeleteIcon />
                                      </IconButton>
                                      <IconButton aria-label="edit" color='primary' onClick={() =>{
                                        setIsExpenseEditDialogOpen(true)
                                        setExpenseEditData(row)
                                      }}>
                                          <EditIcon />
                                      </IconButton>
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
                    <TableRow>
                        <TableCell colSpan={2}  style={{borderBottomWidth: '0px'}}/>
                        <TableCell key={'totalLabel'} align='center' style={{fontWeight: '700', fontSize: '16px'}}> Total Cost </TableCell>
                        <TableCell key={'totalAmount'} align='center' style={{fontWeight: '700', fontSize: '16px'}}> {
                            calculateTotal(projectExpenses).toLocaleString('en-us')
                        } </TableCell>
                    </TableRow>
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[4, 8, 12, 16, 20]}
                component="div"
                style={{marginTop: '10px'}}
                count={projectExpenses?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>



        <Dialog
        open={isExpenseEditDialogOpen}
        onClose={()=>setIsExpenseEditDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Update Expenses"}
            </DialogTitle>
            <DialogContent>
                <form className="dialog-form" style={{width: '420px'}}>
                    <TextField
                    style={{ width: "100%", margin: "10px" }}
                    type="text"
                    value={expenseEditData.sector}
                    onChange={(e)=> {
                        setExpenseEditData(ex => ({
                        ...ex,
                        sector: e.target.value
                      }))
                    }}
                    label="Expense Sector"
                    variant="outlined"
                    />
                    <br />
                    <TextField
                    style={{ width: "100%", margin: "10px" }}
                    type="number"
                    label="Measurement Unit"
                    value={expenseEditData.unit}
                    onChange={(e)=> {
                        setExpenseEditData(ex => ({
                        ...ex,
                        unit: e.target.value
                      }))
                    }}
                    variant="outlined"
                    />
                    <br />
                    <TextField
                    style={{ width: "100%", margin: "10px" }}
                    type="number"
                    label="Cost"
                    value={expenseEditData.cost}
                    onChange={(e)=> {
                        setExpenseEditData(ex => ({
                        ...ex,
                        cost: e.target.value
                      }))
                    }}
                    variant="outlined"
                    />
                    <TextField
                    style={{ width: "100%", margin: "10px" }}
                    type="date"
                    value={expenseEditData.date}
                    onChange={(e)=> {
                        setExpenseEditData(ex => ({
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
            <Button onClick={()=>setIsExpenseEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={()=>{
              setIsExpenseEditDialogOpen(false)
              updateExpense()
            }} autoFocus>
                Update
            </Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}

export default ExpenseTable