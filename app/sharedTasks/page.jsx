"use client"
import React from 'react'
import GlobalApi from '../_utils/GlobalApi'
import { useUser } from '@clerk/nextjs'
import { Button } from '@nextui-org/react'

const page = () => {
  const { user } = useUser();
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
    <div>
            <Button onClick={getSharedTask}>get shared task</Button>
      this is the shared page
    </div>
  )
}

export default page
