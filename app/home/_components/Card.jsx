
import React from 'react'

const Card = ({stats}) => {
  return (
    <div className='flex items-center gap-1 mt-5'>
      <div className="card bg-base-100 w-28 shadow-xl lg:w-40 lg:h-40 ">
  <div className="card-body">
          <h2 className="card-title text-2xl">{stats.allTask}</h2>
    <div className="card-actions justify-start">
      <span className='text-sm'>Total</span>
    </div>
  </div>
      </div>

      <div className="card bg-base-100 w-28 shadow-xl lg:w-40 lg:h-40">
  <div className="card-body">
    <h2 className="card-title text-2xl">{stats.ongoing}</h2>
    <div className="card-actions justify-start">
      <span className='text-sm'>Ongoing</span>
    </div>
  </div>
      </div>

      <div className="card bg-base-100 w-28 shadow-xl lg:w-40 lg:h-40">
  <div className="card-body">
    <h2 className="card-title text-2xl">{stats.completed}</h2>
    <div className="card-actions justify-start">
      <span className='text-sm'>Finished</span>
    </div>
  </div>
</div>
    </div>
  )
}

export default Card
