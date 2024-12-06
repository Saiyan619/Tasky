"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import GlobalApi from '../_utils/GlobalApi'
import { useUser } from '@clerk/nextjs'
import { Button } from '@nextui-org/react'
import { useRouter } from "next/navigation"
import Link from "next/link"
import SharedTaskCard from './SharedTaskCard'


const page = () => {
  
  const { user } = useUser();
  const [sharedTasks, setSharedTasks] = useState([])

  const router = useRouter();
  const handleSeeDetails = () => {
    router.push(`/task/${TaskDbId}`)
  }

  useEffect(() => {
    getSharedTask()
  }, [user])
  

  const getSharedTask = async () => {
    try {
      await GlobalApi.getSharedTask(user?.id).then(resp => {
        if (resp.data != []) {
          console.log(resp.data)
          setSharedTasks(resp.data)
        } else {
          console.log("task not found!!!")
        }
        
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <div>
      <h1 className='text-2xl font-bold'>Shared Tasks</h1>
        <p className='text-sm'>You were added to colloborate in these Tasks</p>
        </div>
{/* 
      {sharedTasks.map((item) => {
        return <div>
          {item.title}
          <Link href={`/myTasks/${item._id}`}> <Button onC3lick={handleSeeDetails} className='text-xs mt-5'>See More</Button></Link>
          {item._id}
        </div>
      })} */}

{user && sharedTasks.map((item) => {
          return <SharedTaskCard
            key={item._id}
            TaskDbId={item._id}
            title={item.title}
            description={item.description}
            status={item.status}
            dueDate={item.dueDate}
            priority={item.priority}
            collaborators={item.collaborators}
            
          />

        })}

    </div>
  )
}

export default page
