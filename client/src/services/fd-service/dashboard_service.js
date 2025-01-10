'use server'
import axios from "axios";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";


const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const GetUserData = async (user_type) => {
    let user = undefined
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get(`${user_type}Token`)
        user = await jwtDecode(token.value)
        console.log(user);
        return user
    } catch (error) {
        console.log(error)
    }
    return user
}


export const HandleSignin = async (data) => {
    const cookieStore = await cookies()
    let response = { message: "", status: 0, data: undefined }
    try {
        const res = await axios.post(`${SERVER_URL}/auth/signin`, data);
        console.log(res.data.resData)
        if (res.status === 200) {
            const cookieName = `${res.data.resData.user_type}Token`;
            cookieStore.set({
                name: cookieName,
                value: res.data.resData.token,
                secure: true,
                httpOnly: true,
                maxAge: 60 * 30
            })
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