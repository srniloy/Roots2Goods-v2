import React from 'react'
import { Stack, TextField, Box, FormControl, Button, Typography, IconButton } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import MovingIcon from '@mui/icons-material/Moving';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import NearMeRoundedIcon from '@mui/icons-material/NearMeRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DirectionsRoundedIcon from '@mui/icons-material/DirectionsRounded';


import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete
  } from '@react-google-maps/api'
import Loading from '@app/loading';


const Vehicle = ({info}) => {
    const center = { lat: 23.798603, lng: 90.449599 }
    
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyB2epTDl7ezvnEwHukOTzvPIEpHHf1U6SY',
        libraries: ['places'],
    })


    const [map, setMap] = React.useState(/** @type google.maps.Map */ (null))
    
    if(!isLoaded){
        return <Loading/>
    }
    
  return (
    <div style={{height: '100%', width: '100%', backgroundColor: '#fff', position: 'relative'}}>

            <Box position='absolute' left={0} top={0} height={'100%'} width={'100%'}>
                <GoogleMap center={center} zoom={16} mapContainerStyle={{width: '100%', height: '100%'}}
                options={{
                    zoomControl: false,
                    streetView: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                }}
                onLoad={(map) => setMap(map)}
                >
                <Marker position={center} />
                
                </GoogleMap>
            </Box>
            

        <div style={{height: 'fit-content', width: '800px', backgroundColor: '#272727', position: 'absolute', 
                    top: '20px', left: '50%', transform: 'translateX(-50%)', borderRadius: '10px',
                    display:'flex', flexDirection: 'column', padding: '20px'}}>
        <Stack direction={'row'} gap={'10px'}>
            <TextField id="outlined-basic" value={info.transportInfo.from} label="From" variant="outlined"
                onChange={(e)=>{
                    info.setTransportInfo(ex=>({
                        ...ex,
                        from: e.target.value,
                    }))
                }}
            />
            <TextField id="outlined-basic" label="To" variant="outlined"
                value={info.transportInfo.to}
                onChange={(e)=>{
                    info.setTransportInfo(ex=>({
                        ...ex,
                        to: e.target.value,
                    }))
                }}
            />

            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Vehicle</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={info.transportInfo.type}
                    label="Age"
                    name='type'
                    onChange={(e)=>{
                        info.setTransportInfo(ex=>({
                            ...ex,
                            type: e.target.value,
                        }))
                    }}
                    >
                    <MenuItem value={'Large Truck'}>Large Truck</MenuItem>
                    <MenuItem value={'Medium Truck'}>Medium Truck</MenuItem>
                    <MenuItem value={'Small Truck'}>Small Truck</MenuItem>
                    </Select>
                </FormControl>
                </Box>
                <Button variant='contained' startIcon={<DirectionsRoundedIcon/>} style={{backgroundColor: '#f7c35f', height:'45px'}}>Calculate</Button>
                <IconButton style={{backgroundColor: '#ffffff10', height: '45px', width: '45px'}}>
                    <CloseRoundedIcon fontSize='large' color='error'/>
                </IconButton>
        </Stack>
        <Stack direction={'row'} justifyContent={'space-between'}>
            <Stack direction={'row'} gap={5} style={{marginTop: '10px'}}>
                <Typography variant='body' style={{padding: '6px 10px'}}>Distance: <span>223km</span> </Typography>
                <Typography variant='body' style={{padding: '6px 10px'}}>Duration: <span>22h</span> </Typography>
                <Typography variant='body' style={{padding: '6px 10px'}}>Cost: <span>1500 taka</span> </Typography>
            </Stack>
            <IconButton onClick={()=> map.panTo(center)} style={{backgroundColor: '#ffffff10', height: '45px', width: '45px'}}>
                <NearMeRoundedIcon fontSize='large' color='primary'/>
            </IconButton>
            
        </Stack>
        </div>
    </div>
  )
}

export default Vehicle