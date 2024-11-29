'use client'
import React from "react";
import { useState } from "react"
import moment from 'moment/moment';
import { Card, CardHeader, CardBody, CardFooter,Chip, Button } from "@nextui-org/react";
import {Avatar, AvatarGroup} from "@nextui-org/react";



import { CalendarIcon, FlagIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
// import { EditTaskDialog } from "./edit-task-dialog"
// import { CompleteTaskDialog } from "./complete-task-dialog"

// Mock data for demonstration with a longer description


export default function TaskDetails({taskDetails}) {
  const [isFollowed, setIsFollowed] = React.useState(false);
  // const [task, setTask] = useState(initialTask)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false)
    // const formatDate = (isoString) => moment(isoString).format('MMMM Do YYYY, h:mm:ss a');
    const formatDate = (isoString) => moment(isoString).format('MMMM Do YYYY');


  const handleSaveTask = (updatedTask) => {
    setTask(updatedTask)
    // Here you would typically make an API call to update the task on the server
    console.log("Task updated:", updatedTask)
  }

  const handleCompleteTask = () => {
    setTask({ ...task, status: "Completed" })
    // Here you would typically make an API call to update the task status on the server
    console.log("Task marked as completed:", task.id)
    setIsCompleteDialogOpen(false)
  }

console.log(taskDetails?.collaborators.name)
    return (
      
      // <div className="container w-full mx-auto py-10">
      <div className="w-[90%]">
          
          <Card className="">
      <CardHeader className="flex justify-between">
        <div className="">
          {/* <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
            <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5>
          </div> */}
              {/* 
              <span>Due: {taskDetails?.createdAt ? formatDate(taskDetails.createdAt) : 'No date available'}</span>

              <span>Priority: {taskDetails?.priority}</span> */}

              <div>
                <div>
                  <span className="text-2xl font-bold">{taskDetails?.title}</span>
                </div>

                <div className="flex gap-3">
                  <Chip color="primary" size="sm">{taskDetails?.status}</Chip>
                  <Chip color="danger" size="sm">{taskDetails?.priority}</Chip>
                </div>
              </div>
              
        </div>
        <Button
          className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowed ? "bordered" : "solid"}
          onPress={() => setIsFollowed(!isFollowed)}
        >
              {/* {isFollowed ? "Unfollow" : "Follow"} */}
              Update Task
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
            <p>
              {taskDetails?.description}
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab alias eius dolorum cum! Enim ducimus animi iusto blanditiis, cupiditate mollitia, at voluptate maxime architecto iure illum maiores modi alias numquam!
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab alias eius dolorum cum! Enim ducimus animi iusto blanditiis, cupiditate mollitia, at voluptate maxime architecto iure illum maiores modi alias numquam!
            </p>
        <span className="pt-2">
        Due: {taskDetails?.dueDate ? formatDate(taskDetails.dueDate) : 'No date available'}
        </span>
      </CardBody>
      <CardFooter className="flex items-center justify-between">
        
        <div className="flex flex-col">
          <p className="font-semibold text-default-400 text-small">Assigned to:</p>
              <div>
                <AvatarGroup isBordered max={3}>
                  {taskDetails?.collaborators.map((item) => {
                    return (
                      <Avatar size="sm" name={item.email.slice(0, 2)} />
                    )
                  })}
    </AvatarGroup>
         </div>
            </div>
            
            <div className="">
        <Button
          // className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
          color="danger"
          radius="full"
          size="sm"
          // variant={isFollowed ? "bordered" : "solid"}
          // onPress={() => setIsFollowed(!isFollowed)}
        >
              {/* {isFollowed ? "Unfollow" : "Follow"} */}
              Delete Task
              </Button>
              
        </div>
      </CardFooter>
    </Card>
            
      {/* <Card className="w-full mx-auto">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{taskDetails?.title}</CardTitle>
              <CardDescription>Task ID: {taskDetails?.userId}</CardDescription>
            </div>
            <Badge variant={task.status === "Completed" ? "default" : "secondary"}>
            {taskDetails?.status}
                      </Badge>
          </div>
        </CardHeader>
          <CardContent className="space-y-6">

          <div>
              {taskDetails?.collaborators.map((item, index) => {
                return (<span key={index}>{item.email}</span>)
              })}
            </div>
            
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <div className={`relative ${isDescriptionExpanded ? '' : 'max-h-40 overflow-hidden'}`}>
              <p className="whitespace-pre-wrap">{taskDetails?.description}</p>
              {!isDescriptionExpanded && (
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
              )}
            </div>
            <Button
              variant="ghost"
              className="mt-2"
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            >
              {isDescriptionExpanded ? (
                <>
                  <ChevronUpIcon className="mr-2 h-4 w-4" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDownIcon className="mr-2 h-4 w-4" />
                  Show More
                </>
              )}
            </Button>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
              <span>Due: {taskDetails?.createdAt ? formatDate(taskDetails.createdAt) : 'No date available'}</span>
            </div>
            <div className="flex items-center">
              <FlagIcon className="mr-2 h-4 w-4 opacity-70" />
              <span>Priority: {taskDetails?.priority}</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Assignee</h3>
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                <AvatarFallback>{task.assignee.initials}</AvatarFallback>
              </Avatar>
              <span>{task.assignee.name}</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Comments</h3>
            <ul className="space-y-4">
              {task.comments.map((comment) => (
                <li key={comment.id} className="bg-muted p-3 rounded-md">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium">{comment.author}</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(comment.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p>{comment.content}</p>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
        <Separator /> */}
        {/* <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setIsEditDialogOpen(true)}>Edit Task</Button>
          <Button 
            onClick={() => setIsCompleteDialogOpen(true)}
            disabled={task.status === "Completed"}
          >
            {task.status === "Completed" ? "Completed" : "Mark as Completed"}
          </Button>
        </CardFooter> */}
      {/* </Card> */}
      {/* <EditTaskDialog
        task={task}
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleSaveTask}
      /> */}
      {/* <CompleteTaskDialog
        isOpen={isCompleteDialogOpen}
        onClose={() => setIsCompleteDialogOpen(false)}
        onConfirm={handleCompleteTask}
        taskTitle={task.title}
      /> */}
    </div>
  )
}

