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


 

const Page = ({ params }) => {
  
     const notify = () => toast.success('📝Task Created', {
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
  const notifyDelete = () => toast.error('📝Task Deleted', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
      });  const notifyUpdate = () => toast.success('📝Task Updated', {
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
  
  const router = useRouter();
  const [taskDetails, setTaskDetails] = useState(null)
  const { user } = useUser();

  
  const [toastVisible, setToastVisible] = useState(false);

  
  const [priority, setPriority] = useState('medium')
  const [status, setStatus] = useState('Pending')
  const [updatedTitle, setUpdatedTitle] = useState('')
  const [updatedpriority, setUpdatedPriority] = useState('')
  const [updatedstatus, setUpdatedStatus] = useState('')
  const [updateddesc, setUpdatedDesc] = useState('')
  const [collaborators, setCollaborators] = useState([]);
  const [Date, setDate] = useState(parseDate("2024-04-04"));
  const formattedDate = Date.toDate ? Date.toDate(getLocalTimeZone()) : null;
    const [useSkeleten, setUseSkeleten] = useState(false)
  


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
    setUseSkeleten(true)
    try {
      GlobalApi.getTaskDetails(id).then(resp => {
        // console.log(resp.data)
        setTaskDetails(resp?.data)
        setUseSkeleten(false)
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
    
      // Update the task
      GlobalApi.updateTask(id, updatedTask).then(resp => {
        console.log("Updated task data from backend:", resp.data);
        notify()
    
        // Add activity log for "Updated" inside the .then block
        if (resp.data) {
          const taskId = resp.data?._id; // Get the updated task's ID
          GlobalApi.addActivityLogs(taskId, { 
            action: "Updated", 
            userId: user?.id,
          }).then(activityResp => {
            console.log("Activity log added:", activityResp.data);
          }).catch(err => {
            console.error("Error adding activity log:", err);
          });
        }
    
        // Optionally refetch the updated task details
        getTaskDetailsById();
      }).catch(err => {
        console.error("Error updating task:", err);
      });
    
    } catch (error) {
        // Log and inspect the error structure
      console.error("Error during task update:", error);
      notifyError()

        // Handle Axios-specific error structure
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data.message || "An unknown error occurred";

        console.error("Error Response Status:", status);
        console.error("Error Response Message:", message);
        // just fucking work for fuck sake
      }
    }
};


  const deleteATask = async () => {
    try {
      if (user?.id) {
        let taskCreatorId = taskDetails?.userId
        if (taskCreatorId && taskCreatorId === user?.id) {
          await GlobalApi.deleteTask(id, user?.id).then(resp => {
            if (resp.data) {
              let taskId = resp.data?._id
           GlobalApi.addActivityLogs(taskId, 
             {action: 'deleted',
              userId:user?.id}
           ).then(resp => {
              console.log(resp.data)
            })
           }
            console.log(resp.data)
            console.log("deleted");
            notifyDelete()

          
            
          })
           // Optionally refetch the updated task details
        getTaskDetailsById();
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
          alert("You do not have permission to delete this task.");
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

      {!useSkeleten ?
        (<div>
        {/* <button onClick={notify}>Notify !</button> */}
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
              notifyUpdate={notifyUpdate}
        />
        
            <DeleteTask deleteATask={deleteATask} notifyDelete={notifyDelete} />

          </div>
          </div>
)
        :
       ( <div className="flex w-full flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-28"></div>
          </div>
        </div>
        <div className="skeleton h-32 w-full"></div>
           </div>)
      }

     
    </div>
  )
}

export default Page
