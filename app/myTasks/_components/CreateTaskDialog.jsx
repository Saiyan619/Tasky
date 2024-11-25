// "use client"
// import React from "react"
// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectLabel,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"
  
// import { format } from "date-fns"
// import { CalendarIcon } from "lucide-react"
 
// import { cn } from "@/lib/utils"
// import { Calendar } from "@/components/ui/calendar"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { useUser } from "@clerk/nextjs"
// import GlobalApi from "@/app/_utils/GlobalApi"
// import { Loader2 } from "lucide-react"
// import Collaborators from "./Collaborators"


// const CreateTaskDialog = ({getTaskById}) => {

//   const { user } = useUser();

//   const [toastVisible, setToastVisible] = useState(false);
//   const [loading, setLoading] = useState(false)
//   const [title, setTitle] = useState('')
//   const [priority, setPriority] = useState('medium')
//   const [status, setStatus] = useState('Pending')
//   const [desc, setDesc] = useState('')
//   const [dueDate, setDueDate] = useState(null)
//   const [date, setDate] = useState(null);

//   function handleTitle(e) {
//     setTitle(e.target.value)
//     console.log(title)
//   } function handlePriority(value) {
//     // console.log(value)
//     setPriority(value)
//     console.log(priority)
//   }function handleStatus(e) {
//     setStatus(e.target.value)
//     console.log(status)
//   }function handleDesc(e) {
//     setDesc(e.target.value)
//     console.log(desc)
//   }
//   function checkData() {
//     console.log(priority)
//   }

//   const createATask = async() => {
//     const data = {
//       userId: user?.id,
//       title: title,
//       description:desc,
//       status: status,
//       dueDate:dueDate,
//       priority:priority,
//       createdAt: user?.createdAt
//     }

//     try {
//       GlobalApi.createTask(data).then(resp => {
//         console.log(resp)
//         console.log(resp.data)
//         console.log("task added")
//         // Show toast message
//         setLoading(true)
//         setToastVisible(true);
//         getTaskById()

//         // Clear input fields
//         setTitle("");
//         setDesc("");
//         setStatus("");
//         setPriority("");

//         // Hide toast after 3 seconds
//         setTimeout(() => {
//           setLoading(false);
//         }, 2000);
//         // Hide toast after 3 seconds
//         setTimeout(() => {
//           setToastVisible(false);
//         }, 5000);
      
//       })

//     } catch (error) {
// console.log(error)
//     }

//   }

//   // console.log(priority)

//     return (
//       <div>
//           {toastVisible && (
//         <div className="toast toast-top toast-end">
//           <div className="alert alert-success">
//             <span>Task Created successfully.</span>
//           </div>
//         </div>
//       )}

       
//     <Dialog>
//           <DialogTrigger asChild>
         
//       <Button className='mt-5 text-xs text-white'>
//       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
//   <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
// </svg>
//  Create new Tasks
//       </Button>
//                 </DialogTrigger>
//                 <div>
//       <DialogContent className="w-[90%] rounded-md">
//         <DialogHeader>
//           <DialogTitle className='text-left'>Create Task</DialogTitle>
//           <DialogDescription className='text-left'>
//             Create Tasks to work on here. Click Create when you're done.
//           </DialogDescription>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//         <div className="grid w-[100%] items-center gap-1.5">
//       <Label htmlFor="email">Title</Label>
//       <Input onChange={handleTitle} type="text" id="text" placeholder="Type title here" />
//                 </div>
    
//                     <div className="flex items-center gap-2">
//                     <Select onValueChange={setStatus}>
//       <SelectTrigger className="">
//         <SelectValue  placeholder="Select Status" />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectGroup>
//           <SelectLabel>Status</SelectLabel>
//           <SelectItem value="pending">Pending</SelectItem>
//           <SelectItem value="ongoing">Ongoing</SelectItem>
//           <SelectItem value="completed">Completed</SelectItem>
//           <SelectItem value="failed">Failed</SelectItem>
//         </SelectGroup>
//       </SelectContent>
//                   </Select>
                      
//                   <Select onValueChange={setPriority}>
//       <SelectTrigger className="">
//         <SelectValue placeholder="Select Priority" />
//       </SelectTrigger>
//       <SelectContent >
//         <SelectGroup >
//           <SelectLabel>Priority</SelectLabel>
//           <SelectItem onClick={checkData}  value="low">Low</SelectItem>
//           <SelectItem value="medium">Medium</SelectItem>
//           <SelectItem onClick={checkData} value="high">High</SelectItem>
//         </SelectGroup>
//       </SelectContent>
//                         </Select>
//                         </div>
//               </div>
              
//               {/* /////////////////////////////// */}
//               <Popover>
//       <PopoverTrigger asChild>
//         <Button
//           variant={"outline"}
//           className={cn(
//             "w-[240px] justify-start text-left font-normal",
//             !date && "text-muted-foreground"
//           )}
//         >
//           <CalendarIcon />
//           {dueDate ? format(dueDate, "PPP") : <span>Pick a Deadline</span>}
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-auto p-0" align="start">
//         <Calendar
//           mode="single"
//           selected={dueDate}
//           onSelect={setDueDate}
//           initialFocus
//         />
//       </PopoverContent>
//               </Popover>
//               {/* ///////////////////////////////////////// */}

//               <Collaborators />



//               <DialogFooter>
//                 <div className="grid w-full gap-2">
//                   <Textarea onChange={handleDesc} placeholder="Type your Task description here." />
               
//                   <Button onClick={createATask} disabled={loading}>
//                     {loading &&  <Loader2 className="animate-spin" /> }
//                     {loading ? "Please wait" : "Create"}
//     </Button>
//     </div>
//           {/* <Button type="submit">Save changes</Button> */}
//         </DialogFooter>
//                     </DialogContent>
//                     </div>
//             </Dialog>
//             </div>
//   )
// }


// export default CreateTaskDialog


import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Avatar, Chip } from "@nextui-org/react";
import { users } from './data';
import {Textarea} from "@nextui-org/react";



const CreateTaskDialog = () => {
  const [value, setValue] = React.useState("");
  const [textAreaValue, setTextAreaValue] = React.useState("");


  const handleSelectionChange = (e) => {
    setValue(e.target.value);
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  const animals = [
    {key: "cat", label: "Cat"},
    {key: "dog", label: "Dog"},
    {key: "elephant", label: "Elephant"},
    {key: "lion", label: "Lion"},
    {key: "tiger", label: "Tiger"},
    {key: "giraffe", label: "Giraffe"},
    {key: "dolphin", label: "Dolphin"},
    {key: "penguin", label: "Penguin"},
    {key: "zebra", label: "Zebra"},
    {key: "shark", label: "Shark"},
    {key: "whale", label: "Whale"},
    {key: "otter", label: "Otter"},
    {key: "crocodile", label: "Crocodile"}
  ];

  return (
    <>
      <Button onPress={onOpen} color="primary">Open Modal</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  labelPlacement="outside"
                />
                <Input
                  
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div>

                <div className="flex w-full max-w-xs flex-col gap-2">
      <Select
        label="Favorite Animal"
        variant="bordered"
        placeholder="Select an animal"
        selectedKeys={[value]}
        className="max-w-xs"
        onChange={handleSelectionChange}
      >
        {animals.map((animal) => (
          <SelectItem key={animal.key}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>
      <p className="text-small text-default-500">Selected: {value}</p>
    </div>

    <Select
      items={users}
      label="Assigned to"
      variant="bordered"
      isMultiline={true}
      selectionMode="multiple"
      placeholder="Select a user"
      labelPlacement="outside"
      classNames={{
        base: "max-w-xs",
        trigger: "min-h-12 py-2",
      }}
      renderValue={(items) => {
        return (
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <Chip key={item.key}>{item.data.name}</Chip>
            ))}
          </div>
        );
      }}
    >
      {(user) => (
        <SelectItem key={user.id} textValue={user.name}>
          <div className="flex gap-2 items-center">
            <Avatar alt={user.name} className="flex-shrink-0" size="sm" src={user.avatar} />
            <div className="flex flex-col">
              <span className="text-small">{user.name}</span>
              <span className="text-tiny text-default-400">{user.email}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>


    <div className="w-full flex flex-col gap-2 max-w-[240px]">
      <Textarea
        variant="underlined"
        label="Description"
        labelPlacement="outside"
        placeholder="Enter your description"
        value={textAreaValue}
        onValueChange={setTextAreaValue}
      />
      <p className="text-default-500 text-small">Textarea value: {textAreaValue}</p>
    </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateTaskDialog
