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
import Nav from '@/app/_layout-components/Nav'
import { NavigationMenu } from '@/components/ui/navigation-menu'
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className='bg-gray-100 w-full'>
          {/* <SignedOut>
            <SignInButton />
          </SignedOut> */}
          <SidebarProvider>
         
            <AppSidebar />
            
            <main>
            <Nav />
              <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}