
import * as React from 'react';
import Loading from '@app/loading';
import { GetUserData } from '@services/fd-service/dashboard_service';
import DashboardLayout from './_components/Dashboard_Layout';


export const metadata = {
  title: 'Farmer Dashboard - Roots2Goods',
  description: 'This is an Agricultural Supply Chain Management System',
}

export default function FarmerDashboardLayout({ children }) {



  return (

    <main style={{ height: '100%', width: '100%', backgroundColor: "var(--color-bg-1)" }}>
      {/* {children} */}
      <DashboardLayout children={children} />

    </main>
  )
}
