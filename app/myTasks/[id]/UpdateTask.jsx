import { useState, useEffect } from "react"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import {parseDate, getLocalTimeZone} from "@internationalized/date";
import { Select, SelectItem } from "@nextui-org/react";
import { Avatar, Chip } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import {DatePicker} from "@nextui-org/react";
import { useUser } from "@clerk/nextjs";
import GlobalApi from "@/app/_utils/GlobalApi";

export default function UpdateTask({
  updateATask,
  handleTitleInput,
    handleDesc,
    updatedTitle,
    updatedpriority,
    updatedstatus,
    updateddesc,
    Date,
    setUpdatedTitle,
    setUpdatedPriority,
    setUpdatedStatus,
    setUpdatedDesc,
  setDate,
  formattedDate,
    collaborators,
    setCollaborators}) {
    
    const {user} = useUser()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [userList, setUserList] = useState([])
  const [selected, setSelected] = useState([]);




    useEffect(() => {
        if (user) {
          getAllUsers()
        }
     }, [user])
    

  // console.log(formattedDate)

  const getAllUsers = async () => {
        try {
          GlobalApi.getUsers().then(resp => {
            setUserList(resp.data)
            console.log(resp.data)
          })
        } catch (error) {
          console.log(error)
        }
  }
  

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



    const handleSelect = (id) => {
        setCollaborators((prev) =>
          prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
      };
        const toggleDropdown = () => {
            setIsDropdownOpen((prev) => !prev);
          };

        const handleSelectionChange = (e) => {
            setUpdatedStatus(e.target.value);
          };
          
          const handleSelectionChangePriority = (e) => {
            setUpdatedPriority(e.target.value);
    };


  return (
    <div>
      {/* <Button  onPress={onOpen}>Open Modal</Button> */}
      <Button onClick={getAllUsers} onPress={onOpen}>Update Task</Button>
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
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                          <ModalBody>
                              
                          <Input
                  autoFocus
                  label="Title"
                  placeholder="Enter your Title"
                  variant="bordered"
                  labelPlacement="outside"
                  onChange={handleTitleInput}
                />
                              title:{updatedTitle}
                              
              <div className='flex gap-2'>
                  <div className="flex w-full max-w-xs flex-col gap-2">
                  {/* ['pending', 'ongoing', 'completed', 'failed'] */}
      <Select
        label="Status"
        variant="bordered"
        placeholder="Select Status"
        selectedKeys={[updatedstatus]}
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
      <p className="text-small text-default-500">Selected: {updatedstatus}</p>
    </div>

                
                <div className="flex w-full max-w-xs flex-col gap-2">
      <Select
        label="Priorty"
        variant="bordered"
        placeholder="Select Priority"
        selectedKeys={[updatedpriority]}
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
      <p className="text-small text-default-500">Selected: {updatedpriority}</p>
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

                  
                  {/* <button onClick={handleSubmit} style={{ marginTop: '20px' }}> */}
                Submit
            {/* </button> */}
        </div>
  

export default Collaborators;

{/* ///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////// */}
                

                                  
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
                {userList.find((opt) => opt._id === id)?.name}
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
              onClick={() => handleSelect(option._id)}
              className={`px-4 py-2 cursor-pointer ${
                collaborators.includes(option._id) ? "bg-blue-100" : "hover:bg-gray-100"
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
              .map((clerkId) => userList.find((opt) => opt.clerkId === clerkId)?.email)
              .join(", ")
          : "None"}
      </div>
    </div>

                              
                                
                <div className="flex flex-row gap-2">
      <div className="w-full flex flex-col gap-y-2">
        <DatePicker className="max-w-[284px]" label="Add deadline" value={Date} onChange={setDate} />
        <p className="text-default-500 text-sm">
          Selected date: 
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
        value={updateddesc}
        onValueChange={setUpdatedDesc}
      />
      <p className="text-default-500 text-small">Textarea value: {updateddesc}</p>
    </div>

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  cancel
                </Button>
                <Button onClick={updateATask} color="primary">
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}