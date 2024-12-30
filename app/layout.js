import {
  ClerkProvider
} from '@clerk/nextjs'
import {NextUIProvider} from "@nextui-org/react";
import './globals.css'
import Nav from '@/app/_layout-components/Nav'
import { Calendar, Home, Inbox, Settings, LucideScreenShare, Share, Sparkles } from "lucide-react"


// Menu items.
const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "My Tasks",
    url: "/myTasks",
    icon: Inbox,
  },
  {
    title: "Shared Tasks",
    url: "/sharedTasks",
    icon: LucideScreenShare,
  },
  {
    title: "AI Tasks",
    url: "/sharedTasks",
    icon: Sparkles,
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
        <body className='bg-gray-100 w-full min-h-screen h-auto'>
            
            <main>
            <Nav />
            <div className="drawer lg:drawer-open relative z-50">
              <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      {/* label former postion */}
  <div className="drawer-content">
                  {/* Page content here */}
                  <NextUIProvider>
                  {children}
                  </NextUIProvider>
  </div>
  <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay z-10 relative"></label>
                <ul className="menu lg:bg-white bg-secondary text-base-content min-h-full w-52 border p-4 z-[99999]">
                  {items.map((list, index) => (
    <li key={index} >
    <a className='flex items-center mt-5 gap-2' href={list.url}>
    <list.icon />
    <span>{list.title}</span>
                      </a>
                      </li>
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