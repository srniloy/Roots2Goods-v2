import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { red } from '@mui/material/colors';

export default function ConfirmationAlert({open, setOpen, title, onConfirm}) {


    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={()=> setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                
                <DialogActions>
                    <Button onClick={()=> setOpen(false)}>No</Button>
                    <Button onClick={()=> {
                        setOpen(false);
                        onConfirm();
                    }} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}





