import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// import { GetCookie } from './utils/cookie-management'


export async function middleware(request: NextRequest) {

    // if (request.nextUrl.pathname.endsWith('/') || request.nextUrl.pathname.endsWith('/auth')) {
    //     const cookie = request.cookies.get('userToken')
    //     if (cookie) {
    //         return NextResponse.redirect(new URL('/dashboard', request.url))
    //     }
    // }
    if (request.nextUrl.pathname.startsWith('/users/farmer-dashboard')) {
        const cookie = request.cookies.get('FarmerToken')
        console.log(cookie?.name);

        if (!cookie) {
            return NextResponse.redirect(new URL('/auth/signin', request.url))
        }
        const response = NextResponse.next()
        response.cookies.set('FarmerToken', cookie?.value, {
            maxAge: 60 * 30, // 30 minutes
            httpOnly: true,
            secure: true,
        })
        return response
    }
    else if (request.nextUrl.pathname.startsWith('/users/trader-dashboard')) {
        const cookie = request.cookies.get('TraderToken')
        console.log(cookie.name);
        // if (!cookie) {
        //     return NextResponse.redirect(new URL('/auth/signin', request.url))
        // }
        const response = NextResponse.next()
        response.cookies.set('TraderToken', cookie.value, {
            maxAge: 60 * 30, // 30 minutes
            httpOnly: true,
            secure: true,
        })
        return response
    }
}

// export const config = {
//     matcher: ['/dashboard/:path*',],
// }