import React from 'react'
import TaskCard from './TaskCard'
import TaskInput from './TaskInput'
import { Button } from '@/components/ui/button'
import CreateTaskDialog from './CreateTaskDialog'

const Tasks = () => {
  return (
    <div>
      {/* <TaskInput /> */}
      <p>My Tasks</p>
      <CreateTaskDialog />
      <div className='flex items-center flex-wrap gap-3 mt-3'>
      <TaskCard />
      <TaskCard />
        <TaskCard />
        </div>
    </div>
  )
}

export default Tasks
