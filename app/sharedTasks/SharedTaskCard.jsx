import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button, AvatarGroup, Chip} from "@nextui-org/react";
import moment from 'moment/moment';

export default function SharedTaskCard({title, description, status, dueDate, priority, TaskDbId, collaborators}) {
    const [isFollowed, setIsFollowed] = React.useState(false);
    const formatDate = (isoString) => moment(isoString).format('MMMM Do YYYY')


  return (
    <Card className="w-[300px] mt-5">
      <CardHeader className="justify-between">
        {/* <div className="flex gap-5"> */}
          {/* <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" /> */}
          <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className="text-xl font-semibold leading-none text-default-600">{title}</h4>
                  <div className="flex gap-2">
                  <Chip color="danger" size="sm">{priority}</Chip>
                  <Chip color="primary" size="sm">{status}</Chip>
                  </div>
          </div>
        {/* </div> */}
        <Button
          className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowed ? "bordered" : "solid"}
          onPress={() => setIsFollowed(!isFollowed)}
        >
         See more
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <p>
        <div className="text-sm">{description?.slice(0, 100)}...</div>
        </p>
        {/* <span className="pt-2">
          #FrontendWithZoey 
          <span className="py-2" aria-label="computer" role="img">
            💻
          </span>
        </span> */}
      </CardBody>
      <CardFooter className="flex justify-between items-center gap-3">
        <div className="flex gap-1 flex-col">
        <p className="font-semibold text-default-400 text-small">Assigned to:</p>
                  <div>
                <AvatarGroup isBordered max={3}>
                  {collaborators.map((item) => {
                    return (
                      <Avatar size="sm" name={item.email.slice(0, 2)} />
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
  );
}
