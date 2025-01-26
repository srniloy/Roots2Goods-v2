
import * as React from 'react';
import Loading from '@app/loading';


export const metadata = {
  title: 'Farmer Dashboard - Roots2Goods',
  description: 'This is an Agricultural Supply Chain Management System',
}

export default function FarmerLayout({ children }) {

  return (

    <main style={{ height: '100%', width: '100%', backgroundColor: "var(--color-bg-1)" }}>
      {children}

    </main>
  )
}
