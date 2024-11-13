import React from "react"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"


const CreateTaskDialog = () => {
    return (
        <div>
    <Dialog>
      <DialogTrigger asChild>
      <Button className='mt-5 text-xs text-white'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
</svg>
 Create new Tasks
      </Button>
                </DialogTrigger>
                <div className="p-10">
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-left'>Create Task</DialogTitle>
          <DialogDescription className='text-left'>
            Create Tasks to work on here. Click Create when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        <div className="grid w-full items-center gap-1.5">
      <Label htmlFor="email">Title</Label>
      <Input type="text" id="text" placeholder="Type title here" />
    </div>
    {/* <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
                    </div> */}
                    <div className="flex items-center gap-2">
                    <Select>
      <SelectTrigger className="">
        <SelectValue placeholder="Select Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          <SelectItem value="apple">Pending</SelectItem>
          <SelectItem value="banana">Ongoing</SelectItem>
          <SelectItem value="blueberry">Finished</SelectItem>
          <SelectItem value="grapes">Failed</SelectItem>
        </SelectGroup>
      </SelectContent>
                        </Select>
                        
                    <Select>
      <SelectTrigger className="">
        <SelectValue placeholder="Select Priority" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Priority</SelectLabel>
          <SelectItem value="apple">Low</SelectItem>
          <SelectItem value="banana">Medium</SelectItem>
          <SelectItem value="blueberry">High</SelectItem>
        </SelectGroup>
      </SelectContent>
                        </Select>
                        </div>
        </div>
                <DialogFooter>
                <div className="grid w-full gap-2">
      <Textarea placeholder="Type your Task description here." />
      <Button>Create</Button>
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
