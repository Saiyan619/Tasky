"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import TaskCard from './TaskCard'
import CreateTaskDialog from './CreateTaskDialog'
import GlobalApi from '@/app/_utils/GlobalApi'
import { useUser } from '@clerk/nextjs'
import {Button} from "@nextui-org/react";
import Collaborators from './Collaborators'



const Tasks = () => {
  const { user } = useUser();
  const [allTasks, setAllTasks] = useState([])
  const [userList, setUserList] = useState([])




  useEffect(() => {
     if (user) {
       getTaskById()
       getAllUsers()
     }
  }, [user])


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
  

  const getTaskById = async () => {
    try {
      await GlobalApi.getTaskByClerkId(user?.id).then(resp => {
        console.log(resp)
        console.log(resp.data)
         setAllTasks(resp.data)
        //  console.log(allTasks)
        console.log("these are all my tasks")
      })
    } catch (error) {
      console.log(error)
    }
  }

  const getSharedTask = async () => {
    try {
      await GlobalApi.getSharedTask(user?.id).then(resp => {
        if (resp.data != []) {
          console.log(resp.data)
        } else {
          console.log("task not found!!!")
        }
        
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='flex items-center justify-center flex-col'>
      <p>My Tasks</p>
      <div>
        <CreateTaskDialog
          userList={userList}
          getTaskById={getTaskById} />
      </div>
       
      {/* <Collaborators /> */}
      <div className='flex items-center flex-wrap gap-3 mt-3'>
        {user && allTasks.map((item) => {
          return <TaskCard
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

<TaskCard />

        </div>
    </div>
  )
}

export default Tasks
