"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import GlobalApi from '@/app/_utils/GlobalApi';
import { Button } from '@/components/ui/button';
import moment from 'moment/moment';
import { useUser } from '@clerk/nextjs';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import TaskDetails from './TaskDetails';

 

const page = ({params}) => {
  const router = useRouter();
  const [taskDetails, setTaskDetails] = useState(null)
  const { user } = useUser();

  const [toastVisible, setToastVisible] = useState(false);
  // const [updatedText, setUpdatedText] = useState(taskDetails?.title)

  
  const [loading, setLoading] = useState(false)
  const [priority, setPriority] = useState('medium')
  const [status, setStatus] = useState('Pending')
  const [updatedTitle, setUpdatedTitle] = useState('')
  const [updatedpriority, setUpdatedPriority] = useState('')
  const [updatedstatus, setUpdatedStatus] = useState('')
  const [updateddesc, setUpdatedDesc] = useState('')
  const [date, setDate] = useState(null);
  const formatDate = (isoString) => moment(isoString).format('MMMM Do YYYY, h:mm:ss a');

  // const [toastVisible, setToastVisible] = useState(false);
  // const [loading, setLoading] = useState(false)
  // const [title, setTitle] = useState('')
  // const [priority, setPriority] = useState('medium')
  // const [status, setStatus] = useState('Pending')


  useEffect(() => {
    getTaskDetailsById()
  }, [])
  
  function handleTitleInput(e) {
    setUpdatedTitle(e.target.value)
    console.log(e.target.value)
  }
  function handlePriority(e) {
    setUpdatedPriority(e.target.value)
    console.log(e.target.value)
    // console.log(updatedpriority)
  } 
  function handleDesc(e) {
    setUpdatedDesc(e.target.value)
    console.log(e.target.value)
    } 
    function handleStatus(e) {
    setUpdatedStatus(e.target.value)
      console.log(e.target.value)
      // console.log(updatedstatus)

  }

  const {id} = params

  const getTaskDetailsById = async () => {
    try {
      GlobalApi.getTaskDetails(id).then(resp => {
        // console.log(resp.data)
        setTaskDetails(resp.data)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const updateATask = async () => {
    try {
      const updatedTask = {
        title: updatedTitle,
        description:updateddesc,
        status: updatedstatus,
        priority:updatedpriority,
      };
      GlobalApi.updateTask(id, updatedTask).then(resp => {
        console.log("Updated task data from backend:", resp.data);
        // Optionally refetch the updated task details
       getTaskDetailsById();
      })
    } catch (error) {
      console.log(error)
    }
  }

  const deleteATask = async () => {
    try {
      await GlobalApi.deleteTask(id).then(resp => {
        console.log(resp.data)
        console.log("deleted");
      })
    } catch (error) {
      console.log(error)
    }
  }

  
  function checkData() {
    console.log(priority)
  }

  return (
    <div className='bg-white p-8 rounded-lg m-auto w-[90%] '>
      {/* ///////////////////////////////////////////////////////////////// */}
      <TaskDetails taskDetails={taskDetails} />
      {/* ///////////////////////////////////////////////////////////////// */}
      {taskDetails ?  (<div className=''>
        {/* <p>{taskDetails?.userId}</p> */}
      

        <div className='flex items-center justify-between'>
        <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Make changes to your Task here. Click create when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input onChange={handleTitleInput} id="name"  className="col-span-3" />
          </div>
              
              
              <div className="flex items-center gap-2">
                    <Select onValueChange={setUpdatedStatus}>
      <SelectTrigger className="">
        <SelectValue  placeholder="Select Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="ongoing">Ongoing</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="failed">Failed</SelectItem>
        </SelectGroup>
      </SelectContent>
                  </Select>
                      
                  <Select onValueChange={setUpdatedPriority}>
      <SelectTrigger className="">
        <SelectValue placeholder="Select Priority" />
      </SelectTrigger>
      <SelectContent >
        <SelectGroup >
          <SelectLabel>Priority</SelectLabel>
          <SelectItem onClick={checkData}  value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem onClick={checkData} value="high">High</SelectItem>
        </SelectGroup>
      </SelectContent>
                        </Select> 
              </div>
              
               {/* /////////////////////////////// */}
               <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a deadline</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
              </Popover>
              {/* ///////////////////////////////////////// */}

        </div>
        <DialogFooter>
        <div className="grid w-full gap-2">
                  <Textarea  onChange={handleDesc} placeholder="Type your Task description here." />
                  {/* <Textarea onChange={handleDesc} placeholder="Type your Task description here." /> */}
               
                  {/* <Button onClick={createATask} disabled={loading}> */}
                  {/* <Button>
                    {loading &&  <Loader2 className="animate-spin" /> }
                    {loading ? "Please wait" : "Create"}
    </Button> */}
                <Button onClick={updateATask}>Edit/Update Task</Button>
    </div>
        </DialogFooter>
      </DialogContent>
          </Dialog>
        
        {/* //////////////////////////////////// */}
      
        <AlertDialog>
  <AlertDialogTrigger>Delete Task</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your Task
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={deleteATask}>Delete Task</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

          {/* <Button onClick={deleteATask}>Delete Task</Button> */}
          
          </div>
        {/* <p>{taskDetails?.dueDate}</p>
        <p>{taskDetails?.updatedAt}</p> */}
      </div>) : "task does not exist"}
      {/* userId, title, description, status, dueDate, priority, createdAt, updatedAt */}
     
    </div>
  )
}

export default page
