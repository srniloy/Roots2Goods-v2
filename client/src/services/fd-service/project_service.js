'use server'
import axios from "axios";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";


const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;


export const DeleteProject = async (project_id) => {
    let response = { message: "", status: 0, data: undefined }
    const res = await axios.post(`${SERVER_URL}/farmer/delete-project`, {project_id})
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



export const UpdateProject = async (project) => {
    let response = { message: "", status: 0, data: undefined }
    const { cover_img, ...otherInfo } = project
    const data = new FormData()
    data.append("project", JSON.stringify(otherInfo))
    data.append("cover_img", cover_img)

    try {
        const res = await axios.post(`${SERVER_URL}/farmer/update-project-info`, data,
            {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                }
            }
        );
        if (res.status === 200) {
            console.log(res.data.resData)
            
            response = {
                message: res.data.message,
                status: res.status,
                data: res.data
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


// ==================================================== Project Expense =========================================================


export const AddProjectExpense = async ({project_id, expense}) => {
    let response = { message: "", status: 0, data: undefined }
    expense.project_id = project_id
    console.log(expense);
    const res = await axios.post(`${SERVER_URL}/farmer/add-project-expense`, expense)
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


export const GetProjectExpenses = async (project_id) => {
    let response = { message: "", status: 0, data: undefined }
    try {
        const res = await axios.post(`${SERVER_URL}/farmer/get-projects-expenses`,{project_id});
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


export const DeleteExpense = async (expense_id) => {
    let response = { message: "", status: 0, data: undefined }
    const res = await axios.post(`${SERVER_URL}/farmer/delete-expense`, {expense_id})
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

export const UpdateProjectExpense = async (expense) => {
    let response = { message: "", status: 0, data: undefined }
    const res = await axios.post(`${SERVER_URL}/farmer/update-project-expense`, expense)
    console.log(res.status);
    if (res.status == 200) {
        response = {
            message: res.data.message,
            status: res.status,
        }
    }else{
        response = {
            message: "Failed to update",
            status: 400,
        }
    }
    return response
}

// =================================================== Project Sales ======================================================

export const AddProjectSales = async ({project_id, sales}) => {
    let response = { message: "", status: 0, data: undefined }
    console.log(sales);
    sales.project_id = project_id
    const res = await axios.post(`${SERVER_URL}/farmer/add-project-sales`, sales)
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


export const GetProjectSales = async (project_id) => {
    let response = { message: "", status: 0, data: undefined }
    try {
        const res = await axios.post(`${SERVER_URL}/farmer/get-projects-sales`,{project_id});
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
    const res = await axios.post(`${SERVER_URL}/farmer/delete-sales`, {sales_id})
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

export const UpdateProjectSales = async (sale) => {
    let response = { message: "", status: 0, data: undefined }
    const res = await axios.post(`${SERVER_URL}/farmer/update-project-sales`, sale)
    console.log(res.status);
    if (res.status == 200) {
        response = {
            message: res.data.message,
            status: res.status,
        }
    }else{
        response = {
            message: "Failed to update",
            status: 400,
        }
    }
    return response
}


// ======================================================== Offers =================================================================


export const GetOffersList = async (sales_id) => {
    let response = { message: "", status: 0, data: undefined }
    try {
        const res = await axios.post(`${SERVER_URL}/farmer/get-offers-list`,{sales_id});
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
        const res = await axios.post(`${SERVER_URL}/farmer/update-status-on-offer-acceptance`,{offer_id});
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

export const GetAcceptedOffersList = async (project_id) => {
    let response = { message: "", status: 0, data: undefined }
    try {
        const res = await axios.post(`${SERVER_URL}/farmer/get-accepted_offers-list`,{project_id});
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
        const res = await axios.post(`${SERVER_URL}/farmer/offer-cancellation`,{offer_id});
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