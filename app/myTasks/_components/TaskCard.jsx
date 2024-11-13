import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React from "react";

const TaskCard = () => {
  return (
    <div className="text-left max-w-[300px] p-3 bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex gap-3">
        <Badge>Mid</Badge>
        <Badge variant={"outline"}>UI/UX</Badge>
      </div>
      <a href="#">
        <div className="flex flex-col">
          <h5 className=" text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Create shot Dribble
          </h5>
          <Button className="text-xs w-1/3" variant="link">
            See Tasks details
          </Button>
        </div>
      </a>
      <p className="mb-3 font-normal text-xs dark:text-gray-400">
        Make student shots for students portfolio needs and your own portfolio
        Make student shots for students portfolio needs and your own portfolio
      </p>

      <div className="flex items-center justify-between">
        <div className="text-xs">
          <span>Assigned</span>
          <p>Me</p>
        </div>
        <div className="text-xs">
          <span>Deadline</span>
          <p>24 jan 1:30</p>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
