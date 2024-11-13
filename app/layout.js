import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import './globals.css'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className='bg-gray-100'>
          {/* <SignedOut>
            <SignInButton />
          </SignedOut> */}

           <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}