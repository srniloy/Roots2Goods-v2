'use client'
import React from 'react'
import StockedProducts from './_components/stocked_products'
import OfferUpdates from './_components/offer-updates'

const BuyProducts = (props) => {
  const [tabType, setTabType] = React.useState(<StockedProducts/>)
  const BuyProjectTabButtonAction =(e)=>{
    const allTabs = document.querySelectorAll('#buy_product_tabs .fpd-tab-link');

    allTabs.forEach(element => {
      if(element.classList.contains("t-active")){
        element.classList.remove("t-active");
      }
    });
    e.target.classList.add("t-active");
  }
  return (
    <div className='buy-products' style={{backgroundColor: '#244441be',minHeight: '80vh', padding: '20px 20px 30px', marginTop: '10px'}}>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <div className="w-layout-hflex frmr-tab-link-container" id='buy_product_tabs'>
                <div className="frmr-tab-link-wrapper" >
                <a className="fpd-tab-link t-active" style={{padding: '6px 20px'}}
                onClick={(e)=>{
                  BuyProjectTabButtonAction(e)
                  setTabType(<StockedProducts />)
                }}
                >Stocks</a>
                </div>
                <div className="frmr-tab-link-wrapper" >
                <a className="fpd-tab-link" style={{padding: '6px 20px'}} 
                onClick={(e)=>{
                  BuyProjectTabButtonAction(e)
                  setTabType(<OfferUpdates/>)
                }}
                >Offers Update</a>
                </div>
            </div>
        </div>
    <div className='styled-scrollbar' style={{marginTop: '10px', height: '470px', overflowY: 'scroll', padding: '20px',position:'relative'}}>

        {tabType}
        </div>
    </div>
  )
}

export default BuyProducts