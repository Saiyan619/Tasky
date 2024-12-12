"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import GlobalApi from '@/app/_utils/GlobalApi';
import { useUser } from '@clerk/nextjs';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';




import {parseDate, getLocalTimeZone} from "@internationalized/date";


import TaskDetails from './TaskDetails';
import UpdateTask from './UpdateTask';
import DeleteTask from './DeleteTask';


 

const page = ({params}) => {
    const notify = () => toast("Wow so easy !");
  const router = useRouter();
  const [taskDetails, setTaskDetails] = useState(null)
  const { user } = useUser();

  
  const [toastVisible, setToastVisible] = useState(false);
  // const [updatedText, setUpdatedText] = useState(taskDetails?.title)

  
  const [loading, setLoading] = useState(false)
  const [priority, setPriority] = useState('medium')
  const [status, setStatus] = useState('Pending')
  const [updatedTitle, setUpdatedTitle] = useState('')
  const [updatedpriority, setUpdatedPriority] = useState('')
  const [updatedstatus, setUpdatedStatus] = useState('')
  const [updateddesc, setUpdatedDesc] = useState('')
  const [collaborators, setCollaborators] = useState([]);
  const [Date, setDate] = useState(parseDate("2024-04-04"));
  const formattedDate = Date.toDate ? Date.toDate(getLocalTimeZone()) : null;


  useEffect(() => {
    getTaskDetailsById()
  }, [])
  
  function handleTitleInput(e) {
    setUpdatedTitle(e.target.value)
    console.log(e.target.value)
  }
  function handlePriority(e) {
    setUpdatedPriority(e.target.value)
    console.log(e.target.value)
    // console.log(updatedpriority)
  } 
  function handleDesc(e) {
    setUpdatedDesc(e.target.value)
    console.log(e.target.value)
    } 
    function handleStatus(e) {
    setUpdatedStatus(e.target.value)
      console.log(e.target.value)
      // console.log(updatedstatus)

  }

  const {id} = params

  const getTaskDetailsById = async () => {
    try {
      GlobalApi.getTaskDetails(id).then(resp => {
        // console.log(resp.data)
        setTaskDetails(resp.data)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const updateATask = async () => {
    try {
        const updatedTask = {
            title: updatedTitle,
            description: updateddesc,
            status: updatedstatus,
            priority: updatedpriority,
            dueDate: formattedDate,
            collaborators: collaborators,
            userId: user?.id, // Ensure this is passed from Clerk
        };

        console.log("Sending task update request:", updatedTask);

        const response = await GlobalApi.updateTask(id, updatedTask);
        console.log("Updated task data from backend:", response.data);

        // Optionally refetch the updated task details
        getTaskDetailsById();
    } catch (error) {
        // Log and inspect the error structure
        console.error("Error during task update:", error);

        // Handle Axios-specific error structure
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data.message || "An unknown error occurred";

        console.error("Error Response Status:", status);
        console.error("Error Response Message:", message);
        notify()
        // just fucking work for fuck sake
      }
    }
};


  const deleteATask = async () => {
    try {
      if (user.id) {
        let taskCreatorId = taskDetails.userId
        if (taskCreatorId && taskCreatorId === user.id) {
          await GlobalApi.deleteTask(id).then(resp => {
            console.log(resp.data)
            console.log("deleted");
          })
        } else {
          console.log("you have to be the creator of the task to delete!!!!!!!")
        }
      }
     
    
    } catch (error) {
      console.error("Error in updateATask:", error);

    // Debugging the error object
    console.log("Full error object:", error);

    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || "An error occurred";

      console.log("Error Response Status:", status);

      switch (status) {
        case 403:
          alert("You do not have permission to update this task.");
          break;
        case 404:
          alert("Task not found.");
          break;
        case 500:
          alert("A server error occurred. Please try again later.");
          break;
        default:
          alert(`Error: ${message}`);
      }
    } else {
      // Unexpected error (network issues, etc.)
      alert("An unexpected error occurred. Please check your network connection.");
    }
    }
  }





  return (
    <div className='bg-white m-auto flex  justify-center flex-col p-2'>

      {taskDetails ?
        (<div>
        <button onClick={notify}>Notify !</button>
<ToastContainer />

      <div className='p-4'>
      <TaskDetails taskDetails={taskDetails} />
      </div>

      <div className='flex items-center justify-between pl-6 pr-6 pt-2'>

      <UpdateTask
        updateATask={updateATask}
        handleTitleInput={handleTitleInput}
        handleDesc={handleDesc}
        updatedTitle={updatedTitle}
updatedpriority={updatedpriority}
updatedstatus={updatedstatus}
updateddesc={updateddesc}
Date={Date}
        setUpdatedTitle={setUpdatedTitle}
setUpdatedPriority={setUpdatedPriority}
setUpdatedStatus={setUpdatedStatus}
setUpdatedDesc={setUpdatedDesc}
        setDate={setDate}
        formattedDate={formattedDate}
        collaborators={collaborators}
setCollaborators={setCollaborators}
        />
        
        <DeleteTask deleteATask={deleteATask} />

          </div>
          </div>
)
        :
        "task does not exist"
      }

     
    </div>
  )
}

export default page
