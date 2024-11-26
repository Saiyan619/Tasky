'use client'

import { useState } from "react"
import moment from 'moment/moment';
import { CalendarIcon, FlagIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
// import { EditTaskDialog } from "./edit-task-dialog"
// import { CompleteTaskDialog } from "./complete-task-dialog"

// Mock data for demonstration with a longer description
const initialTask = {
  id: "1",
  title: "Implement user authentication",
  description: `Set up a comprehensive user authentication system using JSON Web Tokens (JWT) and integrate it seamlessly with our backend API. This task involves several key steps:

1. Research and select the most appropriate JWT library for our tech stack.
2. Implement token generation on successful login, ensuring proper payload structure and encryption.
3. Set up token verification middleware for protected routes.
4. Implement token refresh mechanism to maintain user sessions securely.
5. Create login, logout, and password reset functionalities.
6. Integrate the authentication system with our existing user database.
7. Implement proper error handling and user feedback for authentication failures.
8. Set up secure storage of tokens on the client-side (e.g., HTTP-only cookies).
9. Conduct thorough testing, including unit tests and integration tests.
10. Document the authentication flow and API endpoints for the development team.

Consider security best practices throughout the implementation, such as protecting against common vulnerabilities like XSS and CSRF attacks. Also, ensure the system is scalable and can handle a high volume of authentication requests.`,
  status: "In Progress",
  priority: "High",
  dueDate: "2023-12-31",
  assignee: {
    name: "John Doe",
    avatar: "/placeholder-avatar.jpg",
    initials: "JD"
  },
  comments: [
    { id: "1", author: "Jane Smith", content: "How's the progress on this? Any blockers we should be aware of?", timestamp: "2023-12-15T10:30:00Z" },
    { id: "2", author: "John Doe", content: "I've completed the basic setup and token generation. Currently working on the token refresh mechanism and integration with our API. No major blockers at the moment, but I'd appreciate a review of the current implementation.", timestamp: "2023-12-15T11:45:00Z" },
  ]
}

export default function TaskDetails({taskDetails}) {
  const [task, setTask] = useState(initialTask)
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

    return (
      
    <div className="container w-full mx-auto py-10">
      <Card className="w-full mx-auto">
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
        <Separator />
        {/* <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setIsEditDialogOpen(true)}>Edit Task</Button>
          <Button 
            onClick={() => setIsCompleteDialogOpen(true)}
            disabled={task.status === "Completed"}
          >
            {task.status === "Completed" ? "Completed" : "Mark as Completed"}
          </Button>
        </CardFooter> */}
      </Card>
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

