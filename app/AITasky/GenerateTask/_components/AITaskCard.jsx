import React from 'react'

const AITaskCard = ({tasks}) => {
  return (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {tasks?.map((task, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-xl font-bold mb-3">{task?.title}</h3>
                    <div className="mb-4">
                        <h4 className="font-semibold mb-1">Description:</h4>
                        <p className="text-gray-600">{task?.description}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-1">Timetable:</h4>
                        <p className="text-gray-600">{task?.timetable}</p>
                    </div>
                </div>
            ))}
        </div>
  )
}

export default AITaskCard
