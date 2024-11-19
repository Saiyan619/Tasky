"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import GlobalApi from '@/app/_utils/GlobalApi';
import { Button } from '@/components/ui/button';
import moment from 'moment/moment';

const page = ({params}) => {
  const router = useRouter();
  const [taskDetails, setTaskDetails] = useState(null)
  const formatDate = (isoString) => moment(isoString).format('MMMM Do YYYY, h:mm:ss a');


  useEffect(() => {
    getTaskDetailsById()
  }, [])
  
  const {id} = params

  const getTaskDetailsById = async () => {
    try {
      GlobalApi.getTaskDetails(id).then(resp => {
        console.log(resp.data)
        setTaskDetails(resp.data)
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='bg-white p-8 rounded-lg m-auto w-2/3'>
      {/* <Button onClick={getTaskDetailsById}>get task data</Button> */}
      {/* userId, title, description, status, dueDate, priority, createdAt, updatedAt */}
      <div className=''>
        {/* <p>{taskDetails?.userId}</p> */}
        <div>
          <span className='text-3xl'>{taskDetails?.title}</span>
         <p className='text-sm mt-5'>Status: <span className='text-sm'>{taskDetails?.status}</span></p>
          <p className='text-sm '>Priority: <span className='text-sm'>{taskDetails?.priority}</span></p>
          <p className='text-sm '>Created at {taskDetails?.createdAt ? formatDate(taskDetails.createdAt) : 'No date available'}</p>
        </div>

        <div className='mt-5'>
        <p>{taskDetails?.description}</p>
        </div>
        {/* <p>{taskDetails?.dueDate}</p>
        <p>{taskDetails?.updatedAt}</p> */}
      </div>
    </div>
  )
}

export default page
