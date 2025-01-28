'use server'
import axios from "axios";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";


const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;


export const UpdateProfileInfo = async (user) => {
    const cookieStore = await cookies()
    let response = { message: "", status: 0, data: undefined }
    const { img, ...otherInfo } = user
    const data = new FormData()
    data.append("user", JSON.stringify(otherInfo))
    data.append("img", img)

    try {
        const res = await axios.post(`${SERVER_URL}/farmer/update-profile-info`, data,
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
            const { user_type, token } = res.data.resData
            cookieStore.set({
                name: `${user_type}Token`,
                value: token,
                maxAge: 60 * 120
            })
            GetUserData(user_type)
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


export const GetUserData = async (user_type) => {
    let user = undefined
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get(`${user_type}Token`)
        console.log(user_type);
        user = await jwtDecode(token?.value)
        console.log("==================================");
        console.log(user);
        return user
    } catch (error) {
        console.log(error)
    }
    return user
}


export const CreateNewProject = async ({ project_info, created_by }) => {
    let response = { message: "", status: 0, data: undefined }
    const { img, ...project } = project_info
    const data = new FormData()
    project.created_by = created_by
    data.append("img", img)
    data.append("project", JSON.stringify(project))
    console.log("Created_by: ", project.created_by);
    try {
        const res = await axios.post(`${SERVER_URL}/farmer/create-new-project`, data,
            {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                }
            }
        );
        console.log(res.data.resData)
        if (res.status === 200) {

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


export const GetProjects = async ({ user_id, status }) => {
    let response = { message: "", status: 0, data: undefined }
    try {
        const res = await axios.post(`${SERVER_URL}/farmer/get-projects`, { user_id, status });
        if (res.status === 200) {
            console.log(res.data.resData.projects)

            response = {
                message: res.data.message,
                status: res.status,
                data: res.data.resData.projects
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



export const GetProjectDetails = async ({ project_id }) => {
    let response = { message: "", status: 0, data: undefined }
    try {
        const res = await axios.post(`${SERVER_URL}/farmer/get-projects-details`, { project_id });
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




export const GetTransactions = async (user_id) => {
    let response = { message: "", status: 0, data: undefined }
    try {
        const res = await axios.post(`${SERVER_URL}/farmer/get-transactions`, { user_id });
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


export const GetDashboardAnalyticsData = async (user_id)=>{
    let response = { message: "", status: 0, data: undefined }
    try {
        const res = await axios.post(`${SERVER_URL}/farmer/get-dashboard-analytics-data`, { user_id });
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