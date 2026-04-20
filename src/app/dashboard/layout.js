/**
 * Defines the dashboard layout.
 *
 * @author Maria Mair <mm225mz@student.lnu.se>
 */

import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Header from './components/Header'

export default async function DashboardLayout({ children }) {
  const session = await auth()
  
  // Redirect to login page, when not logged in
  if (!session) redirect('/')

  return (
    <div>
      <Header />
      <main>
        {children}
      </main>
    </div>
  )
}
