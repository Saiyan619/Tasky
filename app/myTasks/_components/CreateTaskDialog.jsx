import React from 'react'
import { useState } from "react"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import {DatePicker} from "@nextui-org/react";
import {parseDate, getLocalTimeZone} from "@internationalized/date";
import GlobalApi from "@/app/_utils/GlobalApi"
import { useUser } from "@clerk/nextjs"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





const CreateTaskDialog = ({ getTaskById, userList }) => {
  

  const { user } = useUser();

    const [toastVisible, setToastVisible] = useState(false);
  const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('medium')
  const [status, setStatus] = useState('Pending')
  const [desc, setDesc] = useState('')
  const [Date, setDate] = useState(parseDate("2024-04-04"));
  const formattedDate = Date.toDate ? Date.toDate(getLocalTimeZone()) : null;
  const [collaborators, setCollaborators] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUser, setFilteredUsers] = useState(userList);


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
        console.log(resp.data)
        console.log("task added")

        // Add activity log for "Created"
        if (resp.data) {
          const taskId = resp.data?._id; // Get the created task's ID
          GlobalApi.addActivityLogs(taskId, { 
            action: "Created", 
            userId: user?.id,
          }).then(resp => {
            console.log(resp.data)
          })
        }

        
        // Show toast message
        setLoading(true)
        notify()
        getTaskById()

        // Clear input fields
        setTitle("");
        setDesc("");
        setStatus("");
        setPriority("");

      })

    } catch (error) {
      console.log(error)
      notifyError()
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
  



  const handleSelect = (id) => {
    setCollaborators((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };


 
  // console.log(collaborators)
  // console.log(userList)

  const handleSearch = (query) => {
    setSearchQuery(query);
    setFilteredUsers(searchUsers(userList, query));
};

const searchUsers = (users, query) => {
    if (!query) return users;
    return users.filter((user) =>
        user.email.toLowerCase().includes(query.toLowerCase())
    );
};


// const query = "hans"; // Example search query
// const filteredUser = searchUsers(userList, query);
  console.log(filteredUser); // Logs matched users
  

    const notify = () => toast.success('🦄 Task Created', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      // transition: Bounce,
    });
  
  const notifyError = () => toast.error("Error, Something's wrong", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      // transition: Bounce,
      });

  return (
 <div>
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
              <ModalHeader className="flex flex-col gap-1">Create Task
                <ToastContainer />
              </ModalHeader>
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

                
                
                
                


{/* ///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////// */}
    

   
        <div>
            {/* List of available users */}
                 

                  <Input
                  autoFocus
                  label="Search for a user"
                  placeholder="abc@gmail.com"
                  variant="bordered"
                  labelPlacement="outside"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  />

                   {/* <button
                    onClick={handleSearch}
                    className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                >search</button> */}
                  
                    {/* Display Filtered Users */}
            <div className="mt-4 m-h-32 overflow-y-scroll border border-gray-300 rounded-md p-2">
                {filteredUser?.length > 0 ? (
                      filteredUser?.map((user, index) => (
                      <div>
                        {/* <p key={index} className="py-1">
                             {user.email}
                        </p> */}
                         <input
                         type="checkbox"
                         onChange={() => toggleCollaborator(user)}
                         checked={collaborators.some((c) => c.clerkId === user.clerkId)}
                     />
                     <span className='ml-2 text-sm'>{user.email}</span>
                 </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-500">No users found...</p>
                )}
                  </div>
                  
                  <h3>Available Users</h3>
                  <div  className='max-h-[100px] overflow-y-scroll'>
            {userList.length > 0 ? (
                userList.map((user) => (
                    <div key={user.clerkId} className='flex items-center gap-2'>
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

                  </div>
                  
            {/* List of selected collaborators */}
            <h3>Selected Collaborators</h3>
            {collaborators.map((collab) => (
                <div key={collab.clerkId} className='flex items-center gap-1'>
                <span>{collab.name}</span>
                <div className="flex flex-col gap-2 mt-2">
      <Select
        label="Role"
        variant="bordered"
        placeholder="Select Role"
        // selectedKeys={[priority]}
        className="w-40"
                    value={collab.role}
                    onChange={(e) => updateRole(collab.clerkId, e.target.value)}
      >
        <SelectItem key="owner">
        Owner
                      </SelectItem>
                      
                      <SelectItem key="collaborator">
                      Collaborator
                      </SelectItem>

                      <SelectItem key="high">
                      viewer
            
          </SelectItem>
      </Select>
      {/* <p className="text-small text-default-500">Selected: {collab.role}</p> */}
                </div>
                
                    {/* <select
                        style={{ marginLeft: '10px' }}
                        value={collab.role}
                        onChange={(e) => updateRole(collab.clerkId, e.target.value)}
                    >
                        <option value="owner">Owner</option>
                        <option value="collaborator">Collaborator</option>
                        <option value="viewer">Viewer</option>
                    </select> */}
                </div>
            ))}

                  
                  {/* <button onClick={handleSubmit} style={{ marginTop: '20px' }}>
                Submit
            </button> */}
        </div>
  


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
      </div>
  )
}

export default CreateTaskDialog
