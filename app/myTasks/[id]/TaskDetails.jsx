'use client'
import React from "react";
import moment from 'moment/moment';
import { Card, CardHeader, CardBody, CardFooter,Chip, Button } from "@nextui-org/react";
import {Avatar, AvatarGroup} from "@nextui-org/react";






export default function TaskDetails({taskDetails}) {
  const [isFollowed, setIsFollowed] = React.useState(false);
    // const formatDate = (isoString) => moment(isoString).format('MMMM Do YYYY, h:mm:ss a');
  const formatDate = (isoString) => moment(isoString).format('MMMM Do YYYY');
  
console.log(taskDetails)


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

    return (
      
      // <div className="container w-full mx-auto py-10">
      <div>

        {taskDetails ? (
          <Card className="w-full">
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
                    {/* <Chip color="primary" size="sm">{taskDetails?.status}</Chip> */}
                    <Chip color="danger" size="sm">{taskDetails?.priority}</Chip>
                  </div>
                </div>
              
          </div>
          <Button
            className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
            color="primary"
            radius="full"
            size="sm"
            variant="solid"
            // onPress={() => setIsFollowed(!sFollowed)}
          >
                {/* {isFollowed ? "Unfollow" : "Follow"} */}
                {taskDetails?.status}
          </Button>
        </CardHeader>
        <CardBody className="px-3 py-0 text-small text-default-400">
              <p>
                {taskDetails?.description}
                {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab alias eius dolorum cum! Enim ducimus animi iusto blanditiis, cupiditate mollitia, at voluptate maxime architecto iure illum maiores modi alias numquam! */}
                {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab alias eius dolorum cum! Enim ducimus animi iusto blanditiis, cupiditate mollitia, at voluptate maxime architecto iure illum maiores modi alias numquam! */}
              </p>
         
        </CardBody>
        <CardFooter className="flex items-center justify-between">
          
         
              
              <div className="flex flex-col">
            <p className="font-semibold text-default-400 text-small">Assigned to:</p>
                    <div>
                      Me
                  <AvatarGroup isBordered max={3}>
                    {taskDetails?.collaborators.map((item) => {
                      return (
                        <Avatar size="sm" name={item.email.slice(0, 2)} />
                      )
                    })}
      </AvatarGroup>
           </div>
                </div>
                
                  <div className="flex flex-col">
                    <span className="font-semibold text-default-400 ">Deadline</span>
                <span className="">
          {taskDetails?.dueDate ? formatDate(taskDetails.dueDate) : 'No date available'}
                    </span>
                  </div>

                  
        </CardFooter>
      </Card >)
      
      :

    " Task doest not exist"
          
      
                  }
        {taskDetails.activityLogs.map((item) => {
          return <div><span>{item.action}</span></div>
})}
    </div>
  )
}

