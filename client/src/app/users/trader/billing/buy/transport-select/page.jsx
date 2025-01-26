'use client';
import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import AppMap from '../_components/AppMap';
import { ChakraProvider, theme } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';



const TransportSelect = () => {
  const router = useRouter()
  const [transportInfo, setTransportInfo] = React.useState(
    {
        type: '',
        from: '',
        to: '',
        distance: 0,
        cost: 0,
    }
  )
  return (
    <div style={{height: '100vh', width: '100vw'}}>
        <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
                <IconButton
                edge="start"
                color="inherit"
                aria-label="close"
                onClick={() => router.push('/users/trader/billing')}
                >
                <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Select Transportation
                </Typography>
                <Button autoFocus onClick={() => router.push('/users/trader/billing')} color="inherit">
                Add
                </Button>
            </Toolbar>
            </AppBar>
            <div style={{height: '100%', width: '100%'}}>

            <ChakraProvider theme={theme}>
                <AppMap  info= {{transportInfo, setTransportInfo}} />
            </ChakraProvider>
            </div>
    </div>
  )
}

export default TransportSelect