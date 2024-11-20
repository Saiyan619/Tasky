import React from 'react'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  

const Activity = () => {
  return (
    <div className='mt-5'>
      <Table>
  <TableCaption>A list of your recent Tasks.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Tasks</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Priority</TableHead>
      <TableHead className="text-right">Created</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">Task 1</TableCell>
      <TableCell>Ongoing</TableCell>
      <TableCell>Meduim</TableCell>
      <TableCell className="text-right">29/11/24</TableCell>
          </TableRow>
          
          <TableRow>
      <TableCell className="font-medium">Project 2</TableCell>
      <TableCell>Finished</TableCell>
      <TableCell>Extreme</TableCell>
      <TableCell className="text-right">29/11/24</TableCell>
          </TableRow>
          
          <TableRow>
      <TableCell className="font-medium">Project 3</TableCell>
      <TableCell>Pending</TableCell>
      <TableCell>Extreme</TableCell>
      <TableCell className="text-right">29/11/24</TableCell>
    </TableRow>
  </TableBody>
</Table>

    </div>
  )
}

export default Activity
