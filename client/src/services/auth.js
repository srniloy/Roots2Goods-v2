'use server'
import axios from "axios";
import { cookies } from "next/headers";
// import { Router } from "next/router";
// import { NextResponse } from 'next/server'
import { redirect } from 'next/navigation'


const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const HandleLogout = async (user_type)=>{
    const cookieStore = await cookies()
    cookieStore.delete(`${user_type}Token`)
    redirect('/auth/signin')
    
}

export const HandleSignup = async (data) => {
    const cookieStore = await cookies()
    let response = { message: "", status: 0, data: undefined }
    console.log(SERVER_URL);
    try {
        const res = await axios.post(`${SERVER_URL}/auth/signup`, data);
        console.log(res.data)
        if (res.status === 200) {
            // const cookieName = `${data.user_type}Token`;
            // cookieStore.set({
            //     name: cookieName,
            //     value: res.data.resData.token,
            //     secure: true,
            //     httpOnly: true,
            //     maxAge: 60 * 60
            // })
            response = {
                message: res.data.message,
                status: res.status,
                data: res.data
            }
        }
    } catch (error) {
        console.log(error)
        response = {
            message: error.response.data.message || error.message,
            status: error.status,
            data: undefined
        }
    }
    return response
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
                maxAge: 60 * 120
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