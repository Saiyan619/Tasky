import React from 'react'
import {Select, SelectItem} from "@nextui-org/react";


const Interests = [
    { key: "reading", label: "reading" },
    { key: "gaming", label: "gaming" },
    { key: "cooking", label: "cooking" },
    { key: "traveling", label: "traveling" },
    { key: "photography", label: "photography" },
    { key: "fitness", label: "fitness" },
    { key: "music", label: "music" },
    { key: "writing", label: "writing" },
    { key: "art", label: "art" },
    { key: "hiking", label: "hiking" },
    { key: "volunteering", label: "volunteering" },
    { key: "sports", label: "sports" },
    { key: "dancing", label: "dancing" },
    { key: "meditation", label: "meditation" },
    { key: "crafting", label: "crafting" },
    { key: "baking", label: "baking" },
    { key: "learning_languages", label: "learning languages" },
    { key: "technology", label: "technology" },
    { key: "board_games", label: "board games" },
  ];
  

const SelectInterestInput = ({handleSelectionChange, values}) => {
     
  return (
    <div>
        <div className="flex w-full max-w-xs flex-col gap-2">
      <Select
        className="max-w-xs"
        label="Choose what you like doing"
        placeholder="Select Interests"
        selectedKeys={values}
        selectionMode="multiple"
        onChange={handleSelectionChange}
      >
        {Interests.map((Interest) => (
          <SelectItem key={Interest.key}>{Interest.label}</SelectItem>
        ))}
      </Select>
      <p className="text-small text-default-500">Selected: {Array.from(values).join(", ")}</p>
    </div>
    </div>
  )
}

export default SelectInterestInput
