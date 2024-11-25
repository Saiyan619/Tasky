import {Select, SelectItem} from "@nextui-org/react";
import {animals} from "./data";

export default function Collaborators() {

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
    <Select 
      label="Select an animal" 
        className="max-w-xs" 
        selectionMode="multiple"
          defaultSelectedKeys="" // add this line
          selectedKeys={animals}
    >
      {animals.map((animal) => (
        <SelectItem key={animal.key}>
          {animal.label}
        </SelectItem>
      ))}
    </Select>
    <Select
      label="Favorite Animal"
      placeholder="Select an animal"
      className="max-w-xs"
    >
      {animals.map((animal) => (
        <SelectItem key={animal.key}>
          {animal.label}
        </SelectItem>
      ))}
    </Select>
  </div>
  );
}
