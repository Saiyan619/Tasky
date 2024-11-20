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
import { Calendar, Home, Inbox, Search, Settings, Settings2, SettingsIcon } from "lucide-react"


// Menu items.
const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "My Tasks",
    url: "/myTasks",
    icon: Inbox,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className='bg-gray-100 w-full'>
          {/* <SignedOut>
            <SignInButton />
          </SignedOut> */}
            
            <main>
            <Nav />
            <div className="drawer lg:drawer-open z-10">
              <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
              <label htmlFor="my-drawer-2" className="text-black pt-2 text-sm rounded-lg underline lg:hidden">
      Open drawer 
    </label>
  <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                {children}
  </div>
  <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-secondary text-base-content min-h-full w-60 p-4">
  {items.map((list, index) => (
    // <li key={index}>
    //   <a href={list.url}>{list.title}</a>
    // </li>
    <a className='flex items-center mt-5 gap-2' href={list.url}>
    <list.icon />
    <span>{list.title}</span>
  </a>
  ))}
</ul>

  </div>
</div>
      </main>
        </body>
      </html>
    </ClerkProvider>
  )
}