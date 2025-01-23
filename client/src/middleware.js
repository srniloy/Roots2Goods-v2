import { NextResponse } from 'next/server'
// import { GetCookie } from './utils/cookie-management'


export async function middleware(request) {

    // if (request.nextUrl.pathname.endsWith('/') || request.nextUrl.pathname.endsWith('/auth')) {
    //     const cookie = request.cookies.get('userToken')
    //     if (cookie) {
    //         return NextResponse.redirect(new URL('/dashboard', request.url))
    //     }
    // }
    if (request.nextUrl.pathname.startsWith('/users/farmer')) {
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
    else if (request.nextUrl.pathname.startsWith('/users/trader')) {
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
    else if (request.nextUrl.pathname.startsWith('/users/wholesaler')) {
        const cookie = request.cookies.get('WholesalerToken')
        if (!cookie) {
            return NextResponse.redirect(new URL('/auth/signin', request.url))
        }
        const response = NextResponse.next()
        response.cookies.set('WholesalerToken', cookie.value, {
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