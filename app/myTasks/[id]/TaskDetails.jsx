'use client'
import React from "react";
import moment from 'moment/moment';
import { Card, CardHeader, CardBody, CardFooter,Chip, Button } from "@nextui-org/react";
import { Avatar, AvatarGroup } from "@nextui-org/react";







export default function TaskDetails({taskDetails}) {
  const [isFollowed, setIsFollowed] = React.useState(false);
    // const formatDate = (isoString) => moment(isoString).format('MMMM Do YYYY, h:mm:ss a');
  const formatDate = (isoString) => moment(isoString).format('MMMM Do YYYY');
  
console.log(taskDetails)



    return (
      
      <div>

        {taskDetails ? (
          <div>
          <Card className="w-full">
        <CardHeader className="flex justify-between">
              <div className="">
  
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
                    {taskDetails?.collaborators.map((item, index) => {
                      return (
                        <Avatar key={index} size="sm" name={item.email.slice(0, 2)} />
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
          </Card >
          
          <div className="mt-5">
          <span >Activity History</span>
            <div className="overflow-x-auto">
    <table className="table">
      {/* head */}
      <thead>
        <tr>
          <th>Activity</th>
          <th>By</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
       
                  
                  {taskDetails?.activityLogs.map((item) => {
                    return <tr className="bg-base-200">
                      <td>{item.action}</td>
                      <td>{item.userEmail}</td>
                      <td>{formatDate(item.timestamp)}</td>
                     </tr>
                  })}
        
      </tbody>
    </table>
  </div>
            </div>
            </div>
          
        )
          
      
      
      :

      ( <div className="flex w-full flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-28"></div>
          </div>
        </div>
        <div className="skeleton h-32 w-full"></div>
           </div>)
          
      
                  }

      
        
    </div>
  )
}

