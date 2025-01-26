'use server'
import axios from "axios";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";


const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const GetOffersList = async (offered_by) => {
  let response = { message: "", status: 0, data: undefined }
  try {
      const res = await axios.post(`${SERVER_URL}/trader/get-offers-list`,{offered_by});
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


export const GetWholesalerOffersList = async (user_id) => {
    let response = { message: "", status: 0, data: undefined }
    try {
        console.log(user_id);
        const res = await axios.post(`${SERVER_URL}/trader/get-wholesaler-offers-list`,{user_id});
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

export const AddWholesalerOrders = async (data) => {
    let response = { message: "", status: 0, data: undefined }
    try {
        const res = await axios.post(`${SERVER_URL}/trader/add-wholesaler-orders`, data);
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
export const GetWholeSalerOrderInfo = async (order_id) => {
    let response = { message: "", status: 0, data: undefined }
    try {
        const res = await axios.post(`${SERVER_URL}/trader/get-wholesaler-order-info`,{order_id});
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


export const ConfirmWholesalerOrder = async (data) => {
    let response = { message: "", status: 0, data: undefined }
    try {
        const res = await axios.post(`${SERVER_URL}/trader/confirm-wholesaler-order`,data);
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
        const res = await axios.post(`${SERVER_URL}/trader/get-stocked-products`,{user_id});
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
    let response = { message: "", status: 0, data: undefined }
    try {
        const res = await axios.post(`${SERVER_URL}/trader/get-stocked-slots`,data);
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


export const GetProductSales = async (data) => {
    let response = { message: "", status: 0, data: undefined }
    try {
        const res = await axios.post(`${SERVER_URL}/trader/get-product-sales`,data);
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


export const GetSalesOffersList = async (sales_id) => {
    let response = { message: "", status: 0, data: undefined }
    try {
        const res = await axios.post(`${SERVER_URL}/trader/get-sales-offers-list`,{sales_id});
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