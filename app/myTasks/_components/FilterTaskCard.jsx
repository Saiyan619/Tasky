import React from 'react'
import { useRouter } from "next/navigation"
import Link from "next/link"
import moment from 'moment/moment';

import {Card, CardHeader, CardBody, CardFooter, Avatar, Button, AvatarGroup, Chip} from "@nextui-org/react";



const FilterTaskCard = ({ key, title, description, status, dueDate, priority, TaskDbId, collaborators }) => {
    const [isFollowed, setIsFollowed] = React.useState(false);

  const formatDate = (isoString) => moment(isoString).format('MMMM Do YYYY')
  const router = useRouter();
  const handleSeeDetails = () => {
    router.push(`/task/${TaskDbId}`)
  }
  return (
    <Card key={key} className="w-[300px] mt-5">
    <CardHeader className="justify-between">
        <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-xl font-semibold leading-none text-default-600">{title}</h4>
                <div className="flex gap-2">
                <Chip color="danger" size="sm">{priority}</Chip>
                <Chip color="primary" size="sm">{status}</Chip>
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
              <Link onClick={handleSeeDetails}  href={`/myTasks/${TaskDbId}`}> See More</Link>
      </Button>
    </CardHeader>
    <CardBody className="px-3 py-0 text-small text-default-400">
      <p className="text-sm">
     {description?.slice(0, 100)}...
      </p>
    
    </CardBody>
    <CardFooter className="flex justify-between items-center gap-3">
      <div className="flex gap-1 flex-col">
      <span className="font-semibold text-default-400 text-small">Assigned to:</span>
      <div>
                  <AvatarGroup isBordered max={3}>
                    {collaborators?.map((item, index) => {
                      return (
                        <Avatar key={index} size="sm" name={item?.email?.slice(0, 2)} />
                      )
                    })}
      </AvatarGroup>
           </div>
      </div>
      <div className="flex gap-1 flex-col">
      <span className="font-semibold text-default-400 ">Deadline</span>
            <span className="text-sm">
      {dueDate ? formatDate(dueDate) : 'No date available'}
                </span>
      </div>
    </CardFooter>
  </Card>
  )
}

export default FilterTaskCard
