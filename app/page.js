"use client"
import { UserButton, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Image from "next/image";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const { user } = useUser();
  // console.log(user);
  const [userList, setUserList] = useState([])

// "_id": "6729b279b668b26e0c4538d5",
//     "clerkId": "6901",
//     "__v": 0,
//     "createdAt": "2024-11-05T05:51:53.547Z",
//     "email": "ola@example.com",
//     "name": "olaniyi arokoyu",
//     "role": "user"



  useEffect(() => {
    // getAllUsers();
   user && createUsers()
    console.log('this is home')
    
  }, [])

  const createUsers = async () => {
    try {
      const data = {
          clerkId: user?.id,
          name: user?.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
          createdAt: user?.createdAt
      }
      GlobalApi.createUser(data).then(resp => {
        console.log(resp)
          console.log(resp)
          console.log('user created')
      })
    } catch (error) {
      console.log('user created')
    }
  }
  
  
  const getAllUsers = async () => {
    try {
      GlobalApi.getUsers().then(resp => {
        setUserList(resp.data)
        console.log(resp.data)
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="hero bg-base-200 min-h-screen">
    <div className="hero-content text-center">
      <div className="max-w-md">
        <h1 className="text-5xl font-bold">Hello 👋</h1>
        <span className="text-2xl font-bold">Welcome to Tasky</span>
        <p className="py-6">
         Make collaboration and organization of Task easier
        </p>

          <Link href="/home">
            <button className="btn btn-primary">Get Started📝</button>
          </Link>
       
      </div>
    </div>
  </div>
  );
}
