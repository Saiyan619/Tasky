import React from 'react'

const data = [
    'Reading',
    'Gaming',
    'Cooking',
    'Traveling',
    'Music',
    'Dancing',
    'Drawing',
    'Meditation',
    'Journaling',
    'Workouts',
    'Gratitude',
    'Scheduling',
    'Documentaries',
    'Budgeting',
    'Podcasts',
    'Brainstorming',
    'Goal Setting',
    'Vision Boards',
    'Progress Review',
    'Researching',
    'Nature Walks',
    'Power Naps',
    'Self-Care',
    'Language Practice',
    'Writing',
    'Gardening',
    'Photography',
    'Skill Practice',
    'Mind Mapping',
    'Habit Tracking'
];

const TestSelect = ({toggleSelect, selected}) => {
  
    
  return (
    <div className='p-5'>
          <div>
                {data.map((item, index) => (
                <button
                    key={index}
                    onClick={() => toggleSelect(item)}
                    className={`border px-1 py-1 rounded-full text-sm ${
                        selected.includes(item)
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'bg-gray-100 border-gray-300'
                    } hover:cursor-pointer transition-all`}
                >
                    {item}
                    </button>
                ))}
      </div>
    </div>
  )
}

export default TestSelect
