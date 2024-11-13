import React from 'react'
import TaskCard from './TaskCard'
import TaskInput from './TaskInput'
import { Button } from '@/components/ui/button'

const Tasks = () => {
  return (
    <div>
      {/* <TaskInput /> */}
      <p>My Tasks</p>
      <Button className='mt-5 text-xs text-white'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
</svg>
 Create new Tasks
    </Button>
      <div className='flex items-center flex-wrap gap-3 mt-3'>
      <TaskCard />
      <TaskCard />
        <TaskCard />
        </div>
    </div>
  )
}

export default Tasks
