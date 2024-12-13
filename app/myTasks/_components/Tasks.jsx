"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import TaskCard from './TaskCard'
import CreateTaskDialog from './CreateTaskDialog'
import GlobalApi from '@/app/_utils/GlobalApi'
import { useUser } from '@clerk/nextjs'
import {Button} from "@nextui-org/react";
import Collaborators from './Collaborators'
import FilterTaskForm from './FilterTaskForm'
import FilterTaskCard from './FilterTaskCard'




const Tasks = () => {
  const { user } = useUser();
  const [allTasks, setAllTasks] = useState([])
  const [userList, setUserList] = useState([])
  const [filterTasks, setFilterTasks] = useState([])
  
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [searchFilter, setSearchFilter] = useState('')


  console.log(filterTasks)

  function logger() {
    console.log(statusFilter)
    console.log(priorityFilter)
    console.log(searchFilter)
  }

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


  const getFilteredTask = async()=>{
    try {
      if (user) {
        await GlobalApi.getFilterTasks({
          userId: user?.id, // Always include userId
          status: statusFilter, // Optional
          priority: priorityFilter, // Optional
          search: searchFilter
      }).then(resp => {
        console.log(resp.data)
        setFilterTasks(resp.data)
        })
      }
     
    } catch(error) {
      console.error(error)
    }
  }


 return (
    <div className='flex items-center justify-center flex-col'>
      <p>My Tasks</p>
     <div>
        <CreateTaskDialog
          userList={userList}
          getTaskById={getTaskById} />

       <FilterTaskForm
         searchFilter={searchFilter}
         setSearchFilter={setSearchFilter}
         priorityFilter={priorityFilter}
         setPriorityFilter={setPriorityFilter}
         statusFilter={statusFilter}
         setStatusFilter={setStatusFilter}
         getFilteredTask={getFilteredTask}
         logger={logger}
       />
     </div>


     {filterTasks.length === 0 
       ?
       (  <div className='flex items-center justify-center flex-wrap gap-3 mt-3'>
        { allTasks.map((item) => {
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
   
        </div>)
    

     :

   (  filterTasks.map((item) => {
      return <FilterTaskCard
        key={item._id}
        TaskDbId={item._id}
        title={item.title}
        description={item.description}
        status={item.status}
        dueDate={item.dueDate}
        priority={item.priority}
        collaborators={item.collaborators}
      />
      }))
     }

   
   
    </div>
  )
}

export default Tasks
