
export const parseAIResponse = (responseText) => {
    // Split the text into separate tasks
    const tasks = responseText?.split(/(?=\*\*\d+\.)/).filter(task => task.trim());
    
    return tasks?.map(task => {
        // Extract and clean task number and title
        const titleMatch = task.match(/\*\*\d+\.\s*(.*?)\*\*/);
        const title = titleMatch 
            ? titleMatch[1].replace(/\*\*/g, '').trim() 
            : '';
  
        // Extract and clean description
        const descriptionMatch = task.match(/\*\*Description:\*\*\s*(.*?)(?=\*\*Timetable:|$)/s);
        const description = descriptionMatch 
            ? descriptionMatch[1]
                .replace(/\*/g, '')
                .replace(/•/g, '')  // Remove bullet points
                .trim() 
            : '';
  
        // Extract and clean timetable
        const timetableMatch = task.match(/\*\*Timetable:\*\*\s*(.*?)(?=(?:\*\*\d+\.)|$)/s);
        const timetable = timetableMatch 
            ? timetableMatch[1]
                .replace(/\*/g, '')
                .replace(/•/g, '')  // Remove bullet points
                .trim() 
            : '';
  
        return {
            title,
            description,
            timetable
        };
    });
  };
  

