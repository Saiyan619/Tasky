import { UserButton } from '@clerk/nextjs'
import React from 'react'
  
  const Nav = () => {
    return (
<div className="navbar bg-base-100">
  <div className="flex-none">
    <button className="btn btn-square btn-ghost">
    <label htmlFor="my-drawer-2" className="btn text-sm rounded-lg underline lg:hidden">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block h-5 w-5 stroke-current">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"></path>
      </svg> 
</label>
    </button>
  </div>
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">Tasky</a>
  </div>
  <div className="flex-none gap-2">
    <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
          </div>
          
    <div className="dropdown dropdown-end">
    <div className='w-full m-auto'>
                  <UserButton />
                  </div>
      {/* <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul> */}
    </div>
  </div>
</div>
    )
  }
  
export default Nav

  