'use client'
import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete'
import Stack from '@mui/material/Stack'
import {Grid} from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Loader from '@app/loading';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import TextField from '@mui/material/TextField';
import { height } from '@mui/system';
import { SubLoader } from '@app/loading';
import { GetAvailableProducts, GetFilteredAvailableData, GetFilterSelestionData } from '@services/td-service/dashboard_service';


const productsImg = [
  {label: 'Tometo', img: 'tometo.jpg', coverImg: 'poteto-cover.jpg'},
  {label: 'Onion', img: 'onion.jpg', coverImg: 'onion-cover.jpg'},
  {label: 'Eggplant'},
  {label: 'Carrots'},
  {label: 'Cabbage', img: 'image-asset.jpeg', coverImg: 'cabbage.jpg'},
  {label: 'Chilli'},
  {label: 'Watermelon'},
  {label: 'Potato', img: 'poteto.webp', coverImg: 'poteto-cover.jpg'},
]


const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;



const AgroProducts = () => {
  const [loaderOpen, setLoaderOpen] = React.useState(true)
  const [isSubLoad, setIsSubLoad] = React.useState(false)

  const router = useRouter()







  const [products, setProducts] = React.useState(undefined)

  const [productFilterData, setProductFilterData] = React.useState({location:'',product:'', farmer: ''})




    const [locations, setLocations] = React.useState([]);
    const [productList, setProductList] = React.useState([]);
    const [farmersList, setFarmersList] = React.useState([]);


    const getTheListOfFilteredSelection = async ()=>{
      const res = await GetFilterSelestionData()
      if(res.status == 200){
        console.log(res.data);
        setLocations(res.data.locations)
        setProductList(res.data.products)
        setFarmersList(res.data.farmers)
      }else{
        alert(res.message)
      }
    }


  const setAvailableProducts = async ()=>{
    const res = await GetAvailableProducts()
    if(res.status == 200){
      setProducts(res.data)
      console.log(res.data);
    }else{
      alert(res.message)
    }
  }
  React.useEffect(() => {
    setAvailableProducts()
    getTheListOfFilteredSelection()
  }, []);

  const getFilteredAvailableData = async()=>{
    const res = await GetFilteredAvailableData(productFilterData)
    setProductFilterData({location:'',product:'', farmer: ''})
    setProducts(res.data)
  }



  return (
    <>



      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent='left' alignItems='center' gap={2} marginTop='15px'>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={locations}
          sx={{ width: 250 }}
          value={productFilterData.location}
          onChange={(e, v)=>{
            setProductFilterData(ex => ({
              ...ex,
              location: v || ''
            }))
          }}
          renderInput={(params) => <TextField {...params} variant='outlined' label="Location"/>}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={productList}
          sx={{ width: 250 }}
          value={productFilterData.product}
          onChange={(e, v)=>{
            setProductFilterData(ex => ({
              ...ex,
              product: v || ''
            }))
          }}
          renderInput={(params) => <TextField {...params} variant='outlined' label="Product" />}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={farmersList}
          sx={{ width: 250 }}
          value={productFilterData.farmer}
          onChange={(e, v)=>{
            setProductFilterData(ex => ({
              ...ex,
              farmer: v || ''
            }))
          }}
          renderInput={(params) => <TextField {...params} variant='outlined' label="Farmer" />}
        />


        <Button variant="contained" style={{height: '50px', marginBottom: '5px'}} sx={{backgroundColor: "var(--yellow)", fontFamily:'Gothicb'}} startIcon={<PersonSearchIcon fontSize='large' />}
          onClick={()=>{
            getFilteredAvailableData()
          }}
        >
          Search
        </Button>
      </Stack>



    
    <div className='styled-scrollbar' style={{
                width: '100%',
                maxHeight: '450px',
                minHeight: '450px',
                position: 'relative',
                zIndex: 0,
                height: 'max-content',
                overflow: 'scroll',
                padding: '20px 0px',
            }}>

    <SubLoader open={isSubLoad}/>
    <Grid container gap={2} className='card-container'>

      {
        products?.map((product)=>{
          return (
            <Card key={product?._id} sx={{ width: 280, backgroundColor: '#21391f', borderRadius: '20px' }}>
              <CardActionArea onClick={()=>{
                router.push('/users/trader/product/'+ product?._id)
                setLoaderOpen(true)
              }}> 
                  <CardMedia
                    component="img"
                    height="180"
                    image={`${SERVER_URL}/${product?.project_id.img}`}
                    alt="Product Image"
                    style={{
                      borderRadius: '20px'
                    }}
                  />
                  <CardContent>
                    <Typography style={{fontFamily: 'Roboto-Bold', fontWeight: 700}} variant="h5" component="div">
                      {product?.project_id.title}
                    </Typography>
                    <Typography variant="body2" letterSpacing={'.5px'} color="text.secondary">
                      <b>Product: </b>{product?.project_id.product_name}<br/>
                      <b>Quantity: </b>{product?.quantity} kg <br/>
                      <b>Price: </b>{product?.price} taka (per kg) <br/>
                      <b>Location: </b> {product?.project_id.created_by.address}<br/>
                      <b>Harvest time: </b> {product?.collection_date} <br/>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align='right' style={{marginTop: '5px'}}>
                      By <Link href={'/farmer-dashboard'}> {product?.project_id.created_by.name} </Link><br/>
                    </Typography>
                  </CardContent>
              </CardActionArea>
            </Card>
          )
        })
      }
        


        


      </Grid>


    </div>
    </>
  )
}

export default AgroProducts




