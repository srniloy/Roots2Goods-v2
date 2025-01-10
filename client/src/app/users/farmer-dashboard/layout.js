'use client';
import { ThemeProvider, createTheme } from '@mui/material';
import * as React from 'react';
import UserContext from '@context/userContext';
import { Suspense } from 'react';
import Loading from './loading';
import { GetUserData } from '@services/fd-service/dashboard_service';



export default function FarmerDashboardLayout({ children }) {


  const [user, setUser] = React.useState(undefined)

  React.useEffect(() => {
    async function GetUser(){
      const userData = await GetUserData("Farmer");
      setUser(userData)
    }
    GetUser()
  }, []);

  return (

    <main style={{ height: '100%', width: '100%', backgroundColor: "var(--color-bg-1)" }}>
      <ThemeProvider theme={createTheme({ palette: { mode: "dark" } })}>
        <UserContext.Provider value={{ user, setUser }}>
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </UserContext.Provider>

      </ThemeProvider>

    </main>
  )
}
