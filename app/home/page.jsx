"use client"
import React, { useEffect, useState } from 'react'
import Card from './_components/Card'
import Chart from './_components/Chart'
import Activity from './_components/Activity'
import { UserButton, useUser } from "@clerk/nextjs";
import GlobalApi from "@/app/_utils/GlobalApi";

const Page = () => {
  const { user } = useUser();
  const [stats, setStats] = useState({
    allTask: 0,
    pending: 0,
    ongoing: 0,
    completed:0
  })
  
  useEffect(() => {
    getTaskStatistics()
  }, [user?.id])
  
  console.log(stats)

    const getTaskStatistics = async () => {
      try {
        if (user?.id)  {
        const resp = await GlobalApi.getStatistics(user.id);
          console.log('Statistics:', resp.data);
          setStats(resp.data)
          // return resp.data;
        }
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
  }


  


  

//  const createUsers = async () => {
//   try {
//     const data = {
//       clerkId: user?.id,
//       name: user?.fullName,
//       email: user?.primaryEmailAddress?.emailAddress,
//       createdAt: user?.createdAt
//     }
      
//         GlobalApi.createUser(data).then(resp => {
//         console.log(resp)
//          if (resp) {
//           console.log('user created')
//         }
//       })
    
//   } catch (error) {
//     console.log(error)
//   }
  //    }
  


  return (
    <div className=''>
      {/* this the home page */}
      <p className='text-center'>Welcome😁, {user?.fullName}</p>


      <div className='flex items-center flex-col justify-center'>
        <Card
          stats={stats}
        />
              <Chart />
              <Activity />
              </div>
    </div>
  )
}

export default Page



