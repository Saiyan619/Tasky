import * as React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import moment from 'moment/moment';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge";


function TaskCard({ title, description, status, dueDate, priority, TaskDbId }) {
  const formatDate = (isoString) => moment(isoString).format('MMMM Do YYYY')
  const router = useRouter();
  const handleSeeDetails = () => {
    router.push(`/task/${TaskDbId}`)
  }

  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className='flex gap-4'>
          <Badge>{status}</Badge>
          <Badge variant='secondary'>{priority}</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm">{description?.slice(0, 100)}...</div>
        <Link href={`/myTasks/${TaskDbId}`}> <Button onClick={handleSeeDetails} className='text-xs mt-5'>See More</Button></Link>
      </CardContent>
      <CardFooter className="flex justify-between text-xs">
        <div className="flex flex-col">
          <span>Assigned to:</span>
          <span>Me</span>
        </div>
        <div className="flex flex-col">
          <span>Deadline</span>
          {/* {taskDetails?.createdAt ? formatDate(taskDetails.createdAt) : 'No date available'} */}
          <span>{dueDate ? formatDate(dueDate) : 'No date available'}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

export default TaskCard