import { NextResponse } from 'next/server'
// import { GetCookie } from './utils/cookie-management'


export async function middleware(request) {

    // if (request.nextUrl.pathname.endsWith('/') || request.nextUrl.pathname.endsWith('/auth')) {
    //     const cookie = request.cookies.get('userToken')
    //     if (cookie) {
    //         return NextResponse.redirect(new URL('/dashboard', request.url))
    //     }
    // }
    if (request.nextUrl.pathname.startsWith('/users/farmer/dashboard') || request.nextUrl.pathname.startsWith('/users/farmer/project')) {
        const cookie = request.cookies.get('FarmerToken')

        if (!cookie) {
            return NextResponse.redirect(new URL('/auth/signin', request.url))
        }
        const response = NextResponse.next()
        response.cookies.set('FarmerToken', cookie?.value, {
            maxAge: 60 * 60, // 60 minutes
            httpOnly: true,
            secure: true,
        })
        return response
    }
    else if (request.nextUrl.pathname.startsWith('/users/trader/dashboard') || request.nextUrl.pathname.startsWith('/users/trader/product')) {
        const cookie = request.cookies.get('TraderToken')
        if (!cookie) {
            return NextResponse.redirect(new URL('/auth/signin', request.url))
        }
        const response = NextResponse.next()
        response.cookies.set('TraderToken', cookie.value, {
            maxAge: 60 * 60, // 60 minutes
            httpOnly: true,
            secure: true,
        })
        return response
    }
}

// export const config = {
//     matcher: ['/dashboard/:path*',],
// }