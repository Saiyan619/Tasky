"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import GlobalApi from '@/app/_utils/GlobalApi';
import moment from 'moment/moment';
import { useUser } from '@clerk/nextjs';


import {parseDate, getLocalTimeZone} from "@internationalized/date";


import TaskDetails from './TaskDetails';
import UpdateTask from './UpdateTask';
import DeleteTask from './DeleteTask';


 

const page = ({params}) => {
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
  
  // const formatDate = (isoString) => moment(isoString).format('MMMM Do YYYY, h:mm:ss a');

  // const [toastVisible, setToastVisible] = useState(false);
  // const [loading, setLoading] = useState(false)
  // const [title, setTitle] = useState('')
  // const [priority, setPriority] = useState('medium')
  // const [status, setStatus] = useState('Pending')


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
        description:updateddesc,
        status: updatedstatus,
        priority: updatedpriority,
        dueDate:formattedDate,
        collaborators:collaborators
      };
      GlobalApi.updateTask(id, updatedTask).then(resp => {
        console.log("Updated task data from backend:", resp.data);
        // Optionally refetch the updated task details
       getTaskDetailsById();
      })
    } catch (error) {
      console.log(error)
    }
  }

  const deleteATask = async () => {
    try {
      await GlobalApi.deleteTask(id).then(resp => {
        console.log(resp.data)
        console.log("deleted");
      })
    } catch (error) {
      console.log(error)
    }
  }

  
  function checkData() {
    console.log(priority)
  }

  return (
    <div className='bg-white m-auto'>
     
      {/* ///////////////////////////////////////////////////////////////// */}
      <TaskDetails taskDetails={taskDetails} />

      <div className='flex items-center justify-between'>

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

     

      {/* ///////////////////////////////////////////////////////////////// */}
     
      {/* userId, title, description, status, dueDate, priority, createdAt, updatedAt */}
     
    </div>
  )
}

export default page
