"use client"
import React from 'react'
import { useState } from 'react';
import { parseAIResponse } from './_components/parseAIResponse';
import SelectInterestInput from './_components/SelectInterestInput';
import GlobalApi from '@/app/_utils/GlobalApi';
import AITaskCard from './_components/AITaskCard';
import { useUser } from '@clerk/nextjs';

const Page = () => {
  const {user} = useUser()
  const [values, setValues] = useState(new Set([]));
  const [tasks, setTasks] = useState([]);

  console.log(Array.from(values))
  
  const getAiRes = async () => {
    console.log('Please wait loading...');
    
    if (!user) {
        console.log('No user found');
        return;
    }

    const data = {
        userId: user.id,
        interests: Array.from(values)
    };

    console.log('Sending data:', data);
    
    try {
        // Option 1: Using async/await
        const response = await GlobalApi.getAiResponse(data);
        console.log('Response:', response);
        console.log('Response data:', response.data.task.task);
        //  setAiResponseText(response.data.task.task);
        const parsedTasks = parseAIResponse(response.data.task.task);
              setTasks(parsedTasks);
        return response.data;

    } catch (error) {
        console.error('Error in getAiRes:', error);
        if (error.response) {
            console.error('Error response:', error.response.data);
            console.error('Error status:', error.response.status);
        }
        throw error;
    }
};
  
  const handleSelectionChange = (e) => {
    setValues(new Set(e.target.value.split(",")));
};
  return (
    <div>
      <h1>Generate Your Task Here</h1>

      <button onClick={getAiRes} className="btn btn-primary">Generate tasks</button>
      
      <SelectInterestInput
        handleSelectionChange={handleSelectionChange}
        values={values} />
     
      <AITaskCard tasks={tasks} />


    </div>
  )
}

export default Page
