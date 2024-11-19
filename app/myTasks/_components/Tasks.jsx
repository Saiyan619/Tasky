"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import TaskCard from './TaskCard'
import CreateTaskDialog from './CreateTaskDialog'
import GlobalApi from '@/app/_utils/GlobalApi'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

const Tasks = () => {
  const { user } = useUser();
  const [allTasks, setAllTasks] = useState([])

  useEffect(() => {
     if (user) {
      getTaskById()
     }
  }, [user])
  

  const getTaskById = async () => {
    try {
      await GlobalApi.getTaskByClerkId(user?.id).then(resp => {
        console.log(resp)
        console.log(resp.data)
         setAllTasks(resp.data)
         console.log(allTasks)
        console.log("these are all my tasks")
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      {/* <TaskInput /> */}
      <p>My Tasks</p>
      {/* <Button onClick={getTaskById}>get all task</Button> */}
      <CreateTaskDialog />
      <div className='flex items-center flex-wrap gap-3 mt-3'>
        {user && allTasks.map((item) => {
          return <TaskCard
            TaskDbId={item._id}
            title={item.title}
            description={item.description}
            status={item.status}
            priority={item.priority}
            
          />

        })}

<TaskCard />

        </div>
    </div>
  )
}

export default Tasks
