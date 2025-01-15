import React from 'react'
import '@styles/invoice.css'

const Invoice = (props) => {

    if(props.size == 'half'){
        return (
            <div className="container invoice-container" style={{maxWidth: '1000px', minWidth: '700px'}}>
                <div className="row">
                                    <div className="col-xs-12">
                                        <div className="grid invoice">
                                            <div className="grid-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <h3>ORDER SUMMARY</h3>
                                                        <table className="table table-striped">
                                                            <thead>
                                                                <tr className="line" style={{color:'#ddd !important' }}>
                                                                    <td><strong>#</strong></td>
                                                                    <td className="text-center"><strong>PRODUCT</strong></td>
                                                                    <td className="text-center"><strong>Quantity</strong></td>
                                                                    <td className="text-center"><strong>RATE</strong></td>
                                                                    <td className="text-center"><strong>SUBTOTAL</strong></td>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td className='text-center'><strong>Tometo</strong></td>
                                                                    <td className="text-center">150 kg</td>
                                                                    <td className="text-center">75 Taka</td>
                                                                    <td className="text-center">11,250 Taka</td>
                                                                </tr>
                                                                
                                                                <tr>
                                                                    <td colspan="3"></td>
                                                                    <td className="text-center"><strong>Taxes</strong></td>
                                                                    <td className="text-center"><strong>N/A</strong></td>
                                                                </tr>
                                                                <tr>
                                                                    <td colspan="3">
                                                                    </td><td className="text-center"><strong>Total</strong></td>
                                                                    <td className="text-center"><strong>11,250 Taka</strong></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>									
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                </div>
            </div>
          )
    }
    else{
        return (
            <div className="container" style={{maxWidth: '1000px', minWidth: '700px'}}>
                <div className="row">
                                    <div className="col-xs-12">
                                        <div className="grid invoice">
                                            <div className="grid-body">
                                                <div className="invoice-title" style={{borderBottom: '1px solid #ddd', paddingBottom:"10px", marginBottom: '20px'}}>
                                                    
                                                    <div className="row">
                                                        <div className="col-xs-12">
                                                            <h2>Invoice<br/>
                                                            <span className="small">order #1082</span></h2>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{display:'flex', justifyContent:'space-between'}}>
                                                    <div className="col-xs-6">
                                                        <address>
                                                            <strong>Billed To:</strong><br/>
                                                            Abdul Kashem<br/>
                                                            Kabirhut, Noakhali<br/>
                                                            <abbr title="Phone">P:</abbr> 01880-206993
                                                        </address>
                                                    </div>
                                                    <div className="col-xs-6 align-right">
                                                        <address>
                                                            <strong>Shipped To:</strong><br/>
                                                            Md. Abdul Ahmed<br/>
                                                            Begumganj, Noakhali<br/>
                                                            <abbr title="Phone">P:</abbr> 01880-206993
                                                        </address>
                                                    </div>
                                                </div>
                                                <div style={{display:'flex', justifyContent:'space-between'}}>
                                                    <div className="col-xs-6">
                                                        <address>
                                                            <strong>Payment Method:</strong><br/>
                                                            Cash<br/>
                                                        </address>
                                                    </div>
                                                    <div className="col-xs-6 text-right">
                                                        <address>
                                                            <strong>Order Date:</strong><br/>
                                                            17/06/2023
                                                        </address>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <h3>ORDER SUMMARY</h3>
                                                        <table className="table table-striped">
                                                            <thead>
                                                                <tr className="line" style={{color:'#ddd !important' }}>
                                                                    <td><strong>#</strong></td>
                                                                    <td className="text-center"><strong>PRODUCT</strong></td>
                                                                    <td className="text-center"><strong>Quantity</strong></td>
                                                                    <td className="text-center"><strong>RATE</strong></td>
                                                                    <td className="text-center"><strong>SUBTOTAL</strong></td>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td className='text-center'><strong>Tometo</strong></td>
                                                                    <td className="text-center">150 kg</td>
                                                                    <td className="text-center">75 Taka</td>
                                                                    <td className="text-center">11,250 Taka</td>
                                                                </tr>
                                                                
                                                                <tr>
                                                                    <td colspan="3"></td>
                                                                    <td className="text-center"><strong>Taxes</strong></td>
                                                                    <td className="text-center"><strong>N/A</strong></td>
                                                                </tr>
                                                                <tr>
                                                                    <td colspan="3">
                                                                    </td><td className="text-center"><strong>Total</strong></td>
                                                                    <td className="text-center"><strong>11,250 Taka</strong></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>									
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                </div>
            </div>
          )
    }
  
}

export default Invoice