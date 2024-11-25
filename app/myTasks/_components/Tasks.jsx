"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import TaskCard from './TaskCard'
import CreateTaskDialog from './CreateTaskDialog'
import GlobalApi from '@/app/_utils/GlobalApi'
import { useUser } from '@clerk/nextjs'
import {Button} from "@nextui-org/react";
import Collaborators from './Collaborators'
import {DatePicker} from "@nextui-org/react";
import {parseDate, getLocalTimeZone} from "@internationalized/date";
import {useDateFormatter} from "@react-aria/i18n";


const Tasks = () => {
  const { user } = useUser();
  const [allTasks, setAllTasks] = useState([])
  const [value, setValue] = React.useState(parseDate("2024-04-04"));

  let formatter = useDateFormatter({dateStyle: "full"});

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
      console.log(evrror)
    }
  }
  return (
    <div className='flex items-center justify-center flex-col'>
      <p>My Tasks</p>
      <Button color="primary">
      Button
    </Button>
  
      <div>
      <CreateTaskDialog getTaskById={getTaskById} />
      </div>
        <div className="flex flex-row gap-2">
      <div className="w-full flex flex-col gap-y-2">
        <DatePicker className="max-w-[284px]" label="Date (controlled)" value={value} onChange={setValue} />
        <p className="text-default-500 text-sm">
          Selected date: {value ? formatter.format(value.toDate(getLocalTimeZone())) : "--"}
        </p>
      </div>
      <DatePicker className="max-w-[284px]" defaultValue={parseDate("2024-04-04")} label="Date (uncontrolled)" />
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
            
          />

        })}

<TaskCard />

        </div>
    </div>
  )
}

export default Tasks
