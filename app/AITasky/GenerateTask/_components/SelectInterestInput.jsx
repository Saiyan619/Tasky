import React from 'react'
import {Select, SelectItem} from "@nextui-org/react";


 const animals = [
    {key: "reading", label: "reading"},
    {key: "gaming", label: "gaming"},
    {key: "cooking", label: "cooking"},
    {key: "health", label: "health"}
];


const SelectInterestInput = ({handleSelectionChange, values}) => {
     
    
  return (
    <div>
        <div className="flex w-full max-w-xs flex-col gap-2">
      <Select
        className="max-w-xs"
        label="Favorite Animal"
        placeholder="Select an animal"
        selectedKeys={values}
        selectionMode="multiple"
        onChange={handleSelectionChange}
      >
        {animals.map((animal) => (
          <SelectItem key={animal.key}>{animal.label}</SelectItem>
        ))}
      </Select>
      <p className="text-small text-default-500">Selected: {Array.from(values).join(", ")}</p>
    </div>
    </div>
  )
}

export default SelectInterestInput
