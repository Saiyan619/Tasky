"use client"
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const { user } = useUser();
  // const [userList, setUserList] = useState([])
const [allowClick, setAllowClick] = useState(false)


  useEffect(() => {
    // getAllUsers();
   user && createUsers()
    console.log('this is home')
    
  }, [user])

  const createUsers = async () => {
    setAllowClick(true);
    try {
        const data = {
            clerkId: user?.id,
            name: user?.fullName,
            email: user?.primaryEmailAddress?.emailAddress,
            createdAt: user?.createdAt
        };
        
        const resp = await GlobalApi.createUser(data);
        console.log(resp);
        console.log('user created');
        setAllowClick(false);
    } catch (error) {
        console.log(error);
    } 
};
  
  
  // const getAllUsers = async () => {
  //   try {
  //     GlobalApi.getUsers().then(resp => {
  //       setUserList(resp.data)
  //       console.log(resp.data)
  //     })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }


  return (
    <div className="hero bg-base-200 min-h-screen">
    <div className="hero-content text-center">
      <div className="max-w-md">
        <h1 className="text-5xl font-bold">Hello 👋</h1>
        <span className="text-2xl font-bold">Welcome to Tasky</span>
        <p className="py-6">
         Make collaboration and organization of Task easier
        </p>

          


          {!allowClick ? 
              ( <button className="btn btn-primary">
                <Link href="/home">
                Get Started📝
                    </Link>
                </button>
            )
              :
            (   <button  disabled="disabled" className="btn">
              <span className="loading loading-spinner"></span>
              <Link href="/home">
              please wait...
                          </Link>
            </button>)
            
          
      }    

          {!allowClick ? 
            (<div></div>)
            :
          (  <div>
            <span className="text-sm font-bold text-gray-600">Please wait, saving user profile....</span>
          </div>)
}
g       
      </div>
    </div>
  </div>
  );
}
