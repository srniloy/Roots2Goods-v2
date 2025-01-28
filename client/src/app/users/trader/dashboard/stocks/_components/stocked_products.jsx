'use client'
import * as React from 'react';
import { Grid } from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Loading, { Loader } from '@app/loading';
import { SubLoader } from '@app/loading';
import { GetStockedProducts } from '@services/td-service/product_service';
import UserContext from '@context/userContext';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;


const StockedProducts = () => {
  const {user, setUser} = React.useContext(UserContext)
  const [projectFollow, setProjectFollow] = React.useState(false)
  const [loaderOpen, setLoaderOpen] = React.useState(false)
  const [subLoaderOpen, setSubLoaderOpen] = React.useState(false)


  const [products, setProducts] = React.useState(undefined)


    const fetchProducts = async ()=>{
      
      const res = await GetStockedProducts(user?._id)
      if(res.status == 200){
        setProducts(res.data)
        console.log(res.data)
        setSubLoaderOpen(false)
      }else{
        alert(res.message)
      }
    }
    
    React.useEffect(() => {
      fetchProducts()
    }, []);

  const router = useRouter()
  return (
    <>
     
      <Grid  container gap={2}
      className='card-container'
      style={{
        marginTop: '50px',
        position: 'relative',
      }}>
        {
          products?.map((product)=>{
            return (
              <Card key={product.product_name} sx={{ width: 280, backgroundColor: '#21391f', borderRadius: '20px' }}>
                <CardActionArea onClick={()=>{
                  router.push(`/users/trader/stock/${product?.product_name.replace(' ', '-')}`)
                  setLoaderOpen(true)
                }}> 
                    <CardMedia
                      component="img"
                      height="180"
                      image={`/images/${product?.product_name.replace(' ','-').toLowerCase()}.jpg`}
                      alt="Product Image"
                      style={{
                        borderRadius: '20px'
                      }}
                    />
                    <CardContent>
                      <Typography style={{fontFamily: 'Roboto-Bold', fontWeight: 700}} variant="h5" component="div">
                        {product?.product_name}
                      </Typography>
                      <Typography variant="body2" letterSpacing={'.5px'} color="text.secondary">
                        <b>Last Update: </b> {product?.last_update.split('T')[0]} <br/>
                        <b>Quantity: </b>{product?.quantity} kg <br/>
                        {/* <b>Last Update: </b>1d ago<br/> */}
                      </Typography>
                    </CardContent>
                </CardActionArea>
              </Card>
            )
          })
        }
        
      </Grid>
    </>
  )
}

export default StockedProducts