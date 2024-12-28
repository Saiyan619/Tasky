"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import TaskCard from './TaskCard'
import CreateTaskDialog from './CreateTaskDialog'
import GlobalApi from '@/app/_utils/GlobalApi'
import { useUser } from '@clerk/nextjs'
import {Button} from "@nextui-org/react";
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

  const [useSkeleten, setUseSkeleten] = useState(false)


  console.log(filterTasks)
  console.log(allTasks)

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
    setUseSkeleten(true)
    try {
      await GlobalApi.getTaskByClerkId(user?.id).then(resp => {
        console.log(resp)
        console.log(resp.data)
         setAllTasks(resp.data)
        //  console.log(allTasks)
        console.log("these are all my tasks")
        setUseSkeleten(false)
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
    <div className=''>
    <div className=''>
      <p className='text-center mt-3 font-bold text-xl'>My Tasks</p>
     <div className='flex items-center gap-5 justify-center mt-2'>
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

       {allTasks.length === 0 ?
         
         

         (<div>
           <span className='flex items-center justify-center text-center text-sm text-gray-600 font-bold mt-20 p-5'>
           Nothing to see here! Your task list📝 is empty. <br/> Click 'Create New Task' to start organizing your day.
           </span>
         </div>)
         
         :
         
           (filterTasks.length === 0
             ?
             (useSkeleten ?
               <div className='flex items-center justify-center gap-3 mt-3 flex-wrap'>
                 <div className="flex w-52 flex-col gap-4">
                   <div className="flex items-center gap-4">
                     <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                     <div className="flex flex-col gap-4">
                       <div className="skeleton h-4 w-20"></div>
                       <div className="skeleton h-4 w-28"></div>
                     </div>
                   </div>
                   <div className="skeleton h-32 w-full"></div>
                 </div>
   
                 <div className="flex w-52 flex-col gap-4">
                   <div className="flex items-center gap-4">
                     <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                     <div className="flex flex-col gap-4">
                       <div className="skeleton h-4 w-20"></div>
                       <div className="skeleton h-4 w-28"></div>
                     </div>
                   </div>
                   <div className="skeleton h-32 w-full"></div>
                 </div>
   
                 <div className="flex w-52 flex-col gap-4">
                   <div className="flex items-center gap-4">
                     <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                     <div className="flex flex-col gap-4">
                       <div className="skeleton h-4 w-20"></div>
                       <div className="skeleton h-4 w-28"></div>
                     </div>
                   </div>
                   <div className="skeleton h-32 w-full"></div>
                 </div>
   
              
               </div>
               :
               (<div className='flex items-center justify-center flex-wrap gap-3 mt-3'>
                 {allTasks.map((item) => {
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
      
     
      
               </div>)
             )
       
   
             :
   
           (<div className='flex items-center justify-center flex-wrap gap-3 mt-3'>
             {filterTasks.map((item) => {
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
             })}
             </div>)
           )

       
   
       }
     
   
   
    </div>
    </div>
  )
}

export default Tasks
