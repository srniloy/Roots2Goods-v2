'use server'
import axios from "axios";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";


const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const GetOffersList = async (offered_by) => {
  let response = { message: "", status: 0, data: undefined }
  try {
      const res = await axios.post(`${SERVER_URL}/wholesaler/get-offers-list`,{offered_by});
      if (res.status === 200) {
          // console.log(res.data.resData)

          response = {
              message: res.data.message,
              status: res.status,
              data: res.data.resData
          }
      }
  } catch (error) {
      console.log(error)
      response = {
          message: error.response?.data.message || error.message,
          status: error.status,
          data: undefined
      }
  }
  return response
}



export const UpdateStatusOnOfferAcceptance = async (offer_id) => {
    let response = { message: "", status: 0, data: undefined }
    try {
        const res = await axios.post(`${SERVER_URL}/wholesaler/update-status-on-offer-acceptance`,{offer_id});
        if (res.status === 200) {
            // console.log(res.data.resData)

            response = {
                message: res.data.message,
                status: res.status,
                data: res.data.resData
            }
        }
    } catch (error) {
        console.log(error)
        response = {
            message: error.response?.data.message || error.message,
            status: error.status,
            data: undefined
        }
    }
    return response
}


export const OfferCancellation = async (offer_id) => {
  let response = { message: "", status: 0, data: undefined }
  try {
      const res = await axios.post(`${SERVER_URL}/trader/offer-cancellation`,{offer_id});
      if (res.status === 200) {
          // console.log(res.data.resData)

          response = {
              message: res.data.message,
              status: res.status,
              data: res.data.resData
          }
      }
  } catch (error) {
      console.log(error)
      response = {
          message: error.response?.data.message || error.message,
          status: error.status,
          data: undefined
      }
  }
  return response
}


export const ApproveOffer = async (offer_id) => {
    let response = { message: "", status: 0, data: undefined }
    try {
        const res = await axios.post(`${SERVER_URL}/wholesaler/approve-offer`,{offer_id});
        if (res.status === 200) {
            // console.log(res.data.resData)

            response = {
                message: res.data.message,
                status: res.status,
                data: res.data.resData
            }
        }
    } catch (error) {
        console.log(error)
        response = {
            message: error.response?.data.message || error.message,
            status: error.status,
            data: undefined
        }
    }
    return response
}




// ============================================================= Orders ==================================================


export const AddOrders = async (data) => {
  let response = { message: "", status: 0, data: undefined }
  try {
      const res = await axios.post(`${SERVER_URL}/trader/add-orders`, data);
      if (res.status === 200) {
          // console.log(res.data.resData)

          response = {
              message: res.data.message,
              status: res.status,
              data: res.data.resData
          }
      }
  } catch (error) {
      console.log(error)
      response = {
          message: error.response?.data.message || error.message,
          status: error.status,
          data: undefined
      }
  }
  return response
}


export const GetOrderInfo = async (order_id) => {
  let response = { message: "", status: 0, data: undefined }
  try {
      const res = await axios.post(`${SERVER_URL}/trader/get-order-info`,{order_id});
      if (res.status === 200) {
          // console.log(res.data.resData)

          response = {
              message: res.data.message,
              status: res.status,
              data: res.data.resData
          }
      }
  } catch (error) {
      console.log(error)
      response = {
          message: error.response?.data.message || error.message,
          status: error.status,
          data: undefined
      }
  }
  return response
}

export const ConfirmOrder = async (data) => {
  let response = { message: "", status: 0, data: undefined }
  try {
      const res = await axios.post(`${SERVER_URL}/trader/confirm-order`,data);
      if (res.status === 200) {
          // console.log(res.data.resData)

          response = {
              message: res.data.message,
              status: res.status,
              data: res.data.resData
          }
      }
  } catch (error) {
      console.log(error)
      response = {
          message: error.response?.data.message || error.message,
          status: error.status,
          data: undefined
      }
  }
  return response
}





// ============================================================= Stocked ================================================






export const GetStockedProducts = async (user_id) => {
    let response = { message: "", status: 0, data: undefined }
    try {
        const res = await axios.post(`${SERVER_URL}/wholesaler/get-stocked-products`,{user_id});
        if (res.status === 200) {
  
            response = {
                message: res.data.message,
                status: res.status,
                data: res.data.resData
            }
        }
    } catch (error) {
        console.log(error)
        response = {
            message: error.response?.data.message || error.message,
            status: error.status,
            data: undefined
        }
    }
    return response
  }


  export const GetStockedSlots = async (data) => {
    console.log(data);
    let response = { message: "", status: 0, data: undefined }
    try {
        const res = await axios.post(`${SERVER_URL}/wholesaler/get-stocked-slots`,data);
        if (res.status === 200) {
            response = {
                message: res.data.message,
                status: res.status,
                data: res.data.resData
            }
        }
    } catch (error) {
        console.log(error)
        response = {
            message: error.response?.data.message || error.message,
            status: error.status,
            data: undefined
        }
    }
    return response
  }






// ============================================================= Sales ================================================



  export const AddNewProductSale = async ({sales_info, stock_id}) => {
    let response = { message: "", status: 0, data: undefined }
    const res = await axios.post(`${SERVER_URL}/trader/add-product-sales`, {stock_id, sales_info})
    console.log(res.status);
    if (res.status == 200) {
        response = {
            message: res.data.message,
            status: res.status,
        }
    }else{
        response = {
            message: "Failed to add",
            status: 400,
        }
    }
    return response
}


export const GetProductSales = async (product_name) => {
    let response = { message: "", status: 0, data: undefined }
    try {
        const res = await axios.post(`${SERVER_URL}/trader/get-product-sales`,{product_name});
        if (res.status === 200) {
            console.log(res.data.resData)

            response = {
                message: res.data.message,
                status: res.status,
                data: res.data.resData
            }
        }
    } catch (error) {
        console.log(error)
        response = {
            message: error.response?.data.message || error.message,
            status: error.status,
            data: undefined
        }
    }
    return response
}

export const DeleteSales = async (sales_id) => {
    let response = { message: "", status: 0, data: undefined }
    const res = await axios.post(`${SERVER_URL}/trader/delete-sales`, {sales_id})
    console.log(res.status);
    if (res.status == 200) {
        response = {
            message: res.data.message,
            status: res.status,
        }
    }else{
        response = {
            message: "Failed to Delete",
            status: 400,
        }
    }
    return response
}
