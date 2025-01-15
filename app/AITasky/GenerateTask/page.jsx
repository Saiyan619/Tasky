"use client"
import React from 'react'
import { useState } from 'react';
import { parseAIResponse } from './_components/parseAIResponse';
import GlobalApi from '@/app/_utils/GlobalApi';
import AITaskCard from './_components/AITaskCard';
import { useUser } from '@clerk/nextjs';
import DurationSelect from './_components/DurationSelect';
import TestSelect from './_components/TestSelect';
import { Sparkles } from 'lucide-react';
import ModalError from './_components/ModalError';

const Page = () => {
  const {user} = useUser()
  const [tasks, setTasks] = useState([]);
  const [durationInput, setDurationInput] = useState("");
  const [selected, setSelected] = useState([])
  const [textChange, setTextChange] = useState('Generate')
  const [showSkeleton, setShowSkeleton] = useState(false)

  const openModal = () => {
    document.getElementById('my_modal_1').showModal();
  };

  // Handle option selection
const toggleSelect = (option) => {
   if (selected.includes(option)) {
       setSelected(selected.filter((item) => item !== option));
   } else {
       setSelected([...selected, option]);
   }
};

console.log(selected)

  const handleDurationSelectionChange = (e) => {
      setDurationInput(e.target.value);
  };
  

  
  //function for generating AI tasks
  const getAiRes = async () => {
    console.log('Please wait loading...');
    setTextChange('Generating...')
    setShowSkeleton(true)
    if (!user) {
        console.log('No user found');
        return;
    }

    const data = {
        userId: user.id,
      interests: selected,
      duration:durationInput
        
    };

    console.log('Sending data:', data);
    
    try {
      const response = await GlobalApi.getAiResponse(data);
      setTextChange('Generate')
      setShowSkeleton(false)
        console.log('Response:', response);
        console.log('Response data:', response.data.task.task);
        const parsedTasks = parseAIResponse(response.data.task.task);
              setTasks(parsedTasks);
        return response.data;

    } catch (error) {
      console.error('Error in getAiRes:', error);
      setTextChange('Generate')
      setShowSkeleton(false)
      openModal()
        if (error.response) {
            console.error('Error response:', error.response.data.message);
            console.error('Error status:', error.response.status);
        }
        throw error;
    }
};
  

  return (
    <div className=''>
    
      <div className='flex items-center justify-center text-center flex-col'>
      <h1 className='text-2xl font-semibold'>AI Tasky</h1>
      <h2 className='text-sm'>Generate A Task Here</h2>
      <ModalError openModal={openModal} />

        
        <div className='mt-5'>
        <p>Choose your Interests</p>
      <div className='flex items-center justify-center text-center'>
        <TestSelect
          toggleSelect={toggleSelect}
          selected={selected}  />
      </div>
        </div>

      <DurationSelect handleDurationSelectionChange={handleDurationSelectionChange} durationInput={durationInput} />

      <button onClick={getAiRes} className="btn btn-primary mt-5"><Sparkles /> {textChange}</button>
      </div>
     
      
     
      {showSkeleton ? 
        (<div className='flex items-center gap-3 p-3 flex-wrap justify-center'>
         <div className="skeleton h-60 w-1/2"></div>
      <div className="skeleton h-60 w-1/2"></div>
      <div className="skeleton h-60 w-1/2"></div>
        </div>)
        : 
        (<AITaskCard tasks={tasks} />)
        }
      

    </div>
  )
}

export default Page
