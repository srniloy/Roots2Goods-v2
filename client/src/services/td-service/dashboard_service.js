'use server'
import axios from "axios";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";


const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const GetAvailableProducts = async () => {
    let response = { message: "", status: 0, data: undefined }
    try {
        const res = await axios.get(`${SERVER_URL}/trader/get-available-products`);
        if (res.status === 200) {
            console.log(res.data.resData.products)
            response = {
                message: res.data.message,
                status: res.status,
                data: res.data.resData.products
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

export const GetProductDetails = async (sales_id) => {
    let response = { message: "", status: 0, data: undefined }
    try {
        console.log(sales_id);
        const res = await axios.post(`${SERVER_URL}/trader/get-product-details`, {sales_id});
        if (res.status === 200) {
            console.log(res.data.resData.product)
            response = {
                message: res.data.message,
                status: res.status,
                data: res.data.resData.product
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

export const AddNewOffer = async (offerData) => {
    let response = { message: "", status: 0, data: undefined }
    try {
        console.log(offerData);
        const res = await axios.post(`${SERVER_URL}/trader/add-new-offer`, offerData);
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




export const GetTransactions = async (user_id) => {
    let response = { message: "", status: 0, data: undefined }
    try {
        const res = await axios.post(`${SERVER_URL}/trader/get-transactions`, { user_id });
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



export const GetFilterSelestionData = async()=>{
    let response = { message: "", status: 0, data: undefined }
    try {
        const res = await axios.get(`${SERVER_URL}/trader/get-filter-selection-data`);
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


export const GetFilteredAvailableData = async (filter) => {
    let response = { message: "", status: 0, data: undefined }
    try {
        const res = await axios.post(`${SERVER_URL}/trader/get-filtered-available-products`, filter);
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