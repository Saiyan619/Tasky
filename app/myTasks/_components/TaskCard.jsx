import * as React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
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


function TaskCard({ title, description, status, priority, TaskDbId }) {
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
        <Link href={`/myTasks/${TaskDbId}`}> <Button onclick={handleSeeDetails} className='text-xs mt-5'>See More</Button></Link>
      </CardContent>
      <CardFooter className="flex justify-between text-xs">
        <div className="flex flex-col">
          <span>Assigned to:</span>
          <span>Me</span>
        </div>
        <div className="flex flex-col">
          <span>Deadline</span>
          <span>30 Nov 2024</span>
        </div>
      </CardFooter>
    </Card>
  )
}

export default TaskCard