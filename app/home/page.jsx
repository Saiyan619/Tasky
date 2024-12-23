"use client"
import React from 'react'
import Card from './_components/Card'
import Chart from './_components/Chart'
import Activity from './_components/Activity'
import { UserButton, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
// import Image from "next/image";
import GlobalApi from "@/app/_utils/GlobalApi";
// import { Button } from "@/components/ui/button";

const page = () => {
    const { user } = useUser();
  console.log(user);
  console.log(user?.fullName);
  console.log(user?.createdAt);
  console.log(user?.primaryEmailAddress);
  console.log(user?.primaryEmailAddressId);

//   const [userList, setUserList] = useState([])

// // "_id": "6729b279b668b26e0c4538d5",
// //     "clerkId": "6901",
// //     "__v": 0,
// //     "createdAt": "2024-11-05T05:51:53.547Z",
// //     "email": "ola@example.com",
// //     "name": "olaniyi arokoyu",
  // //     "role": "user"
  

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
         if (resp) {
          console.log('user created')
        }
      })
    
  } catch (error) {
    console.log(error)
  }
   }
  return (
    <div className=''>
      {/* this the home page */}
      <p>Welcome, {user?.fullName}</p>

          <div className='flex items-center flex-col justify-center'>
          <Card />
              <Chart />
              <Activity />
              </div>
    </div>
  )
}

export default page



