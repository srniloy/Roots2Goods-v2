import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Select,
  option,
  Text,
} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useRef, useState } from 'react'
import { Loader } from '@app/loading'

const center = { lat: 23.798603, lng: 90.449599 }


function AppMap({ transportInfo, setTransportInfo }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyB2epTDl7ezvnEwHukOTzvPIEpHHf1U6SY',
    libraries: ['places'],
  })


  const [map, setMap] = useState(/** @type google.maps.Map */(null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [cost, setCost] = useState('')

  const transportCost = {
    'Large Truck': 120,
    'Medium Truck': 110,
    'Small Truck': 100,
  }

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()

  if (!isLoaded) {
    return <h4>Loading...</h4>
  }

  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return
    }


    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
    setCost(parseInt(results.routes[0].legs[0].distance.text.split(' ')[0]) * transportCost[transportInfo.type] + ' taka')

    setTransportInfo(ex => ({
      ...ex,
      from: originRef.current.value,
      to: destiantionRef.current.value,
      distance: parseInt(results.routes[0].legs[0].distance.text.split(' ')[0]),
      cost: parseInt(parseInt(results.routes[0].legs[0].distance.text.split(' ')[0]) * transportCost[transportInfo.type])
    }))
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    setCost('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }

  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100%'
      w='100%'
      className='transport-main-container'
    >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={map => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
      className='transport-select-container'
        p={4}
        borderRadius='lg'
        m={4}
        bgColor='#272727'
        shadow='base'
        minW='container.md'
        zIndex='100'
      >
        <HStack className='hstack' spacing={2} justifyContent='space-between'>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type='text' placeholder='From' color={'#eee'} bg={'#333'} ref={originRef}
                onChange={(e) => {
                  setTransportInfo(ex => ({
                    ...ex,
                    from: e.target.value,
                  }))
                }}
              />
            </Autocomplete>
          </Box>

          <Box flexGrow={1}>
            <Autocomplete>
              <Input
                type='text'
                placeholder='To'
                color={'#eee'}
                bg={'#333'}
                ref={destiantionRef}
                onChange={(e) => {
                  setTransportInfo(ex => ({
                    ...ex,
                    to: e.target.value,
                  }))
                }}
              />
            </Autocomplete>
          </Box>

          <Box flexGrow={1}>
            <Select variant='filled' bg={'#333'} color={'#eee'} placeholder='Select Vehicle'
              onChange={(e) => {
                setTransportInfo(ex => ({
                  ...ex,
                  type: e.target.value,
                }))
              }}
              _hover={{ backgroundColor: '#373737', }}
              sx={{
                '> option': {
                  background: '#373737',
                  color: 'white',
                },
              }}
            >
              <option value='Large Truck'>Large Truck</option>
              <option value='Medium Truck'>Medium Truck</option>
              <option value='Small Truck'>Small Truck</option>
            </Select>
          </Box>

          <ButtonGroup>
            <Button backgroundColor='#6d8c54' color={'#eee'} _hover={{ backgroundColor: '#6d8c54' }} type='submit' onClick={calculateRoute}>
              Calculate Cost
            </Button>
            <IconButton
              aria-label='center back'
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack className='hstack' spacing={3} mt={4} justifyContent='space-between'>
          <div  style={{
            display: 'flex'
          }}>
            < Text color={'#eee'} width={'250px'} > Distance: {distance} </Text>
            <Text color={'#eee'} width={'250px'}>Duration: {duration} </Text>
            <Text color={'#eee'} width={'250px'}>Cost: {cost} </Text>

          </div>
          <IconButton
            aria-label='center back'
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center)
              map.setZoom(15)
            }}
          />
        </HStack>
      </Box >
    </Flex >
  )
}

export default AppMap
