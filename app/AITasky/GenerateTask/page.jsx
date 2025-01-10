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
      console.log('please wait loading......')
    if (user) {
        console.log('loaded user first!!!...')
    };

    const data = {
        userId : user?.id,
        interests: Array.from(values) // Convert Set to Array before sending
      };
  
      console.log('Sending data:', data);
      try {
        console.log('Selected interests:', data);
        console.log('still loading......')
       
        const resp = await GlobalApi.getAiResponse(data);
        console.log(resp.data.response)
        // setAiResponseText(resp.data.response);
        const parsedTasks = parseAIResponse(resp?.data.response);
              setTasks(parsedTasks);
      } catch (error) {
        console.error(error)
      }
    }
  
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
