"use client"
import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useUser } from "@clerk/nextjs"
import GlobalApi from "@/app/_utils/GlobalApi"
import { Loader2 } from "lucide-react"
import { Collaborators } from "./Collaborators"


const CreateTaskDialog = ({getTaskById}) => {

  const { user } = useUser();

  const [toastVisible, setToastVisible] = useState(false);
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('medium')
  const [status, setStatus] = useState('Pending')
  const [desc, setDesc] = useState('')
  const [dueDate, setDueDate] = useState(null)
  const [date, setDate] = useState(null);

  function handleTitle(e) {
    setTitle(e.target.value)
    console.log(title)
  } function handlePriority(value) {
    // console.log(value)
    setPriority(value)
    console.log(priority)
  }function handleStatus(e) {
    setStatus(e.target.value)
    console.log(status)
  }function handleDesc(e) {
    setDesc(e.target.value)
    console.log(desc)
  }
  function checkData() {
    console.log(priority)
  }

  const createATask = async() => {
    const data = {
      userId: user?.id,
      title: title,
      description:desc,
      status: status,
      dueDate:dueDate,
      priority:priority,
      createdAt: user?.createdAt
    }

    try {
      GlobalApi.createTask(data).then(resp => {
        console.log(resp)
        console.log(resp.data)
        console.log("task added")
        // Show toast message
        setLoading(true)
        setToastVisible(true);
        getTaskById()

        // Clear input fields
        setTitle("");
        setDesc("");
        setStatus("");
        setPriority("");

        // Hide toast after 3 seconds
        setTimeout(() => {
          setLoading(false);
        }, 2000);
        // Hide toast after 3 seconds
        setTimeout(() => {
          setToastVisible(false);
        }, 5000);
      
      })

    } catch (error) {
console.log(error)
    }

  }

  // console.log(priority)

    return (
      <div>
          {toastVisible && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>Task Created successfully.</span>
          </div>
        </div>
      )}

       
    <Dialog>
          <DialogTrigger asChild>
         
      <Button className='mt-5 text-xs text-white'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
</svg>
 Create new Tasks
      </Button>
                </DialogTrigger>
                <div>
      <DialogContent className="w-[90%] rounded-md">
        <DialogHeader>
          <DialogTitle className='text-left'>Create Task</DialogTitle>
          <DialogDescription className='text-left'>
            Create Tasks to work on here. Click Create when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        <div className="grid w-[100%] items-center gap-1.5">
      <Label htmlFor="email">Title</Label>
      <Input onChange={handleTitle} type="text" id="text" placeholder="Type title here" />
                </div>
    
                    <div className="flex items-center gap-2">
                    <Select onValueChange={setStatus}>
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
                      
                  <Select onValueChange={setPriority}>
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
          {dueDate ? format(dueDate, "PPP") : <span>Pick a Deadline</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={dueDate}
          onSelect={setDueDate}
          initialFocus
        />
      </PopoverContent>
              </Popover>
              {/* ///////////////////////////////////////// */}

              <Collaborators />

              <DialogFooter>
                <div className="grid w-full gap-2">
                  <Textarea onChange={handleDesc} placeholder="Type your Task description here." />
               
                  <Button onClick={createATask} disabled={loading}>
                    {loading &&  <Loader2 className="animate-spin" /> }
                    {loading ? "Please wait" : "Create"}
    </Button>
    </div>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
                    </DialogContent>
                    </div>
            </Dialog>
            </div>
  )
}


export default CreateTaskDialog
