'use client'
import React from 'react'
import AgroProducts from './_components/available-products'

const BuyProducts = () => {

  return (
    <div className='buy-products' style={{backgroundColor: '#244441be', padding: '10px 20px', marginTop: '10px'}}>
        {<AgroProducts/>}
    </div>
  )
}

export default BuyProducts