import React from 'react'
import { useState } from "react"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Avatar, Chip } from "@nextui-org/react";
import { users } from './data';
import { Textarea } from "@nextui-org/react";
import {DatePicker} from "@nextui-org/react";
import {parseDate, getLocalTimeZone} from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import GlobalApi from "@/app/_utils/GlobalApi"
import { useUser } from "@clerk/nextjs"
import Collaborators from './Collaborators';




const CreateTaskDialog = ({getTaskById, userList}) => {

  const { user } = useUser();

    const [toastVisible, setToastVisible] = useState(false);
  const [loading, setLoading] = useState(false)
  const [value, setValue] = React.useState("");
    const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('medium')
  const [status, setStatus] = useState('Pending')
  const [desc, setDesc] = useState('')
  const [dueDate, setDueDate] = useState(null)
  const [Date, setDate] = useState(parseDate("2024-04-04"));
  const formattedDate = Date.toDate ? Date.toDate(getLocalTimeZone()) : null;
  const [collaborators, setCollaborators] = useState([]);
  const [users, setUsers] = useState([]); // Holds the fetched users


   // Handle adding/removing collaborators
   const toggleCollaborator = (user) => {
    setCollaborators((prev) => {
        const isSelected = prev.find((c) => c.clerkId === user.clerkId);
        console.log('Before update:', prev); // Check current state
        
        if (isSelected) {
            console.log('Removing:', user);
            return prev.filter((c) => c.clerkId !== user.clerkId);
        } else {
            console.log('Adding:', user);
            const updated = [...prev, { clerkId: user.clerkId, name: user.name, role: 'viewer' }];
            console.log('After update:', updated); // Check updated state
            return updated;
        }
    });
};

// Handle role change
const updateRole = (clerkId, role) => {
    setCollaborators((prev) =>
        prev.map((c) => (c.clerkId === clerkId ? { ...c, role } : c))
    );
};

const handleSubmit = () => {
    onSubmit(collaborators);
};



  // let formatter = useDateFormatter({ dateStyle: "full" });
  // console.log(formattedDate)

    const createATask = async() => {
    const data = {
      userId: user?.id,
      title: title,
      description:desc,
      status: status,
      dueDate:formattedDate,
      priority:priority,
      createdAt: user?.createdAt,
      collaborators: collaborators
    }

    try {
      GlobalApi.createTask(data).then(resp => {
        console.log(resp)
        console.log(resp.data)
        console.log("task added")
        // Show toast message
        setLoading(true)
        setToastVisible(true);
        getTaskById()

        // Clear input fields
        setTitle("");
        setDesc("");
        setStatus("");
        setPriority("");

        // Hide toast after 3 seconds
        setTimeout(() => {
          setLoading(false);
        }, 2000);
        // // Hide toast after 3 seconds
        setTimeout(() => {
          setToastVisible(false);
        }, 5000);
      
      })

    } catch (error) {
console.log(error)
    }

  }

  const handleSelectionChange = (e) => {
    setStatus(e.target.value);
  };
  
  const handleSelectionChangePriority = (e) => {
    setPriority(e.target.value);
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();


  function handleTitle(e) {
    setTitle(e.target.value)
    console.log(title)
  }
  

  const [selected, setSelected] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelect = (id) => {
    setCollaborators((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };


  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  console.log(collaborators)
  // console.log(userList)


  return (
    <>
      <Button onPress={onOpen} color="primary">Create New Task</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
        scrollBehavior="inside"
        backdrop='blur'
        size='2xl'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create Task</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Title"
                  placeholder="Enter your Title"
                  variant="bordered"
                  labelPlacement="outside"
                  onChange={handleTitle}
                />
                title:{title}
  
                
                <div className='flex gap-2'>
                  <div className="flex w-full max-w-xs flex-col gap-2">
                  {/* ['pending', 'ongoing', 'completed', 'failed'] */}
      <Select
        label="Status"
        variant="bordered"
        placeholder="Select Status"
        selectedKeys={[status]}
        className="max-w-xs"
        onChange={handleSelectionChange}
      >
         <SelectItem key="pending">
           Pending
                      </SelectItem>
                      
                      <SelectItem key="ongoing">
           Ongoing
                      </SelectItem>
                      
                      <SelectItem key="completed">
           Completed
                      </SelectItem>
                      
                      <SelectItem key="failed">
           Failed
          </SelectItem>
      </Select>
      <p className="text-small text-default-500">Selected: {status}</p>
    </div>

                
                <div className="flex w-full max-w-xs flex-col gap-2">
      <Select
        label="Priorty"
        variant="bordered"
        placeholder="Select Priority"
        selectedKeys={[priority]}
        className="max-w-xs"
        onChange={handleSelectionChangePriority}
      >
        <SelectItem key="low">
            Low
                      </SelectItem>
                      
                      <SelectItem key="medium">
            Medium
                      </SelectItem>

                      <SelectItem key="high">
            High
            
          </SelectItem>
      </Select>
      <p className="text-small text-default-500">Selected: {priority}</p>
                  </div>
                  
                  </div>

                
                
                
                
                 <div className="w-64">
      {/* Trigger Button */}
      <button
        onClick={toggleDropdown}
        className="w-full border rounded-md px-4 py-2 bg-white text-left cursor-pointer"
      >
        <div
          className="flex flex-wrap gap-1 max-h-20 overflow-y-auto"
          style={{ maxHeight: "80px" }}
        >
          {collaborators.length > 0 ? (
            collaborators.map((id) => (
              <span
                key={id}
                className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm"
              >
                {userList.find((opt) => opt.clerkId === id)?.name}
              </span>
            ))
          ) : (
            <span className="text-gray-500">Select options...</span>
          )}
        </div>
      </button>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div
          className="mt-2 w-full bg-white border rounded-md shadow-md z-10 overflow-y-auto"
          style={{ maxHeight: "150px" }}
        >
          {userList.map((option) => (
            <div
              key={option.clerkId}
              onClick={() => handleSelect(option.clerkId)}
              className={`px-4 py-2 cursor-pointer ${
                collaborators.includes(option.clerkId) ? "bg-blue-100" : "hover:bg-gray-100"
              }`}
            >
              {option.email}
            </div>
          ))}
        </div>
                  )}       


      {/* Display selected items */}
            <div className="mt-4">
        <strong>Selected:</strong>{" "}
        {collaborators.length > 0
          ? selected
              .map((id) => userList.find((opt) => opt.clerkId === id)?.email)
              .join(", ")
          : "None"}
      </div>
    </div>

{/* ///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////// */}
    

   
        <div>
            {/* List of available users */}
            <h3>Available Users</h3>
            {userList.length > 0 ? (
                userList.map((user) => (
                    <div key={user.clerkId} style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            type="checkbox"
                            onChange={() => toggleCollaborator(user)}
                            checked={collaborators.some((c) => c.clerkId === user.clerkId)}
                        />
                        <span style={{ marginLeft: '10px' }}>{user.email}</span>
                    </div>
                ))
            ) : (
                <p>Loading users...</p>
            )}

            {/* List of selected collaborators */}
            <h3>Selected Collaborators</h3>
            {collaborators.map((collab) => (
                <div key={collab.clerkId} style={{ display: 'flex', alignItems: 'center' }}>
                    <span>{collab.name}</span>
                    <select
                        style={{ marginLeft: '10px' }}
                        value={collab.role}
                        onChange={(e) => updateRole(collab.clerkId, e.target.value)}
                    >
                        <option value="owner">Owner</option>
                        <option value="collaborator">Collaborator</option>
                        <option value="viewer">Viewer</option>
                    </select>
                </div>
            ))}

                  
                  <button onClick={handleSubmit} style={{ marginTop: '20px' }}>
                Submit
            </button>
        </div>
  

export default Collaborators;

{/* ///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////// */}
                {/* <Collaborators /> */}
                
                <div className="flex flex-row gap-2">
      <div className="w-full flex flex-col gap-y-2">
        <DatePicker className="max-w-[284px]" label="Add deadline" value={Date} onChange={setDate} />
        <p className="text-default-500 text-sm">
          {/* Selected date: {Date ? formatter.format(Date.toDate(getLocalTimeZone())) : "--"} */}
        </p>
      </div>
      {/* <DatePicker className="max-w-[284px]" defaultValue={parseDate("2024-04-04")} label="Date (uncontrolled)" /> */}
    </div>


    <div className="w-full flex flex-col gap-2 ">
      <Textarea
        variant="bordered"
        label="Description"
        labelPlacement="outside"
        placeholder="Enter your Task description"
        value={desc}
        onValueChange={setDesc}
      />
      <p className="text-default-500 text-small">Textarea value: {desc}</p>
    </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                {loading ? ( <Button isLoading isDisabled onClick={createATask} color="primary">
                  Create
                </Button>) :
                    <Button onClick={createATask} color="primary">
                  Create
                </Button>
                }
              
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateTaskDialog
