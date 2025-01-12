import React from 'react'
import { useState } from 'react';
import { Select, SelectItem } from "@nextui-org/react";

export const duration = [
    {key: "A day", label: "A day"},
    {key: "A week", label: "A week"},
    {key: "A month", label: "A month"},
    { key: "A year", label: "A year" }
]

const DurationSelect = ({handleDurationSelectionChange, durationInput}) => {
   
  return (
    <div>
        <Select
        className="max-w-xs z-0 mt-5"
        label="Duration"
        placeholder="Select Duration"
        selectedKeys={[durationInput]}
        variant="bordered"
        onChange={handleDurationSelectionChange}
      >
        {duration.map((duration) => (
          <SelectItem key={duration.key}>{duration.label}</SelectItem>
        ))}
      </Select>
    </div>
  )
}

export default DurationSelect
