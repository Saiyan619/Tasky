"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import GlobalApi from '../_utils/GlobalApi'
import { useUser } from '@clerk/nextjs'
import SharedTaskCard from './SharedTaskCard'


const Page = () => {
  
  const { user } = useUser();
  const [sharedTasks, setSharedTasks] = useState([])
  const [useSkeleten, setUseSkeleten] = useState(false);
  

  
  useEffect(() => {
    getSharedTask()
  }, [user])
  

  const getSharedTask = async () => {
    setUseSkeleten(true)
    try {
      await GlobalApi.getSharedTask(user?.id).then(resp => {
        if (resp.data != []) {
          console.log(resp.data)
          setSharedTasks(resp.data)
          setUseSkeleten(false)
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
      <div className='text-center mt-3'> 
      <h1 className='text-2xl font-bold'>Shared Tasks</h1>
        <p className='text-sm'>You were added to colloborate on these Tasks</p>
      </div>
      

      {sharedTasks.length === 0 ?
         
        <div>nothing to show here</div>
        :
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
          <div className='flex items-center justify-center flex-wrap gap-3 mt-3'>
            {user && sharedTasks?.map((item) => {
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
      

  

    </div>
  )
}

export default Page
