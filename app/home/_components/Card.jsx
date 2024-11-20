// import React from 'react'

// const Card = () => {
//   return (
//       <div className='bg-white p-4 rounded-lg m-auto w-full'>
//           <span>Total Task</span>
      
// <div className='flex items-center justify-between gap-2'>
//           <div className="w-full max-w-sm max-h-md p-2 bg-red-500 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
//           <div className="flex md:mr-4 lg:mr-4 mr-10  items-baseline text-gray-900 dark:text-white">
// <span className="text-3xl tracking-tight text-white">49</span>
// </div>
// <h5 className="mb-2 mt-5 text-lg font-medium text-white dark:text-gray-400">To do</h5>


//               </div>
              
//               <div className="w-full max-w-sm max-h-md p-2 bg-yellow-300 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
//           <div className="flex  md:mr-4 lg:mr-4 mr-10  items-baseline text-gray-900 dark:text-white">
// <span className="text-3xl tracking-tight text-white">49</span>
// </div>
// <h5 className="mb-2 mt-5 text-lg font-medium text-white dark:text-gray-400">To do</h5>


//           </div>

//           <div className="w-full max-w-sm max-h-md p-2 bg-blue-400 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
//           <div className="flex  md:mr-4 lg:mr-4 mr-10  items-baseline text-gray-900 dark:text-white">
// <span className="text-3xl tracking-tight text-white">49</span>
// </div>
// <h5 className="mb-2 mt-5 text-lg font-medium text-white dark:text-gray-400">Ongoing</h5>


//           </div>

//           <div className="w-full max-w-sm max-h-md p-2 bg-cyan-300 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
//           <div className="flex  md:mr-4 lg:mr-4 mr-10   items-baseline text-gray-900 dark:text-white">
// <span className="text-3xl tracking-tight text-white">49</span>
// </div>
// <h5 className="mb-2 mt-5 text-lg font-medium text-white dark:text-gray-400">Finished</h5>


//               </div>
//               </div>

//     </div>
//   )
// }

// export default Card




import React from 'react'

const Card = () => {
  return (
    <div className='flex items-center gap-1 mt-5'>
      <div className="card bg-base-100 w-28 shadow-xl lg:w-40 lg:h-40 ">
  <div className="card-body">
    <h2 className="card-title text-2xl">50</h2>
    <div className="card-actions justify-start">
      <span className='text-sm'>Total</span>
    </div>
  </div>
      </div>

      <div className="card bg-base-100 w-28 shadow-xl lg:w-40 lg:h-40">
  <div className="card-body">
    <h2 className="card-title text-2xl">20</h2>
    <div className="card-actions justify-start">
      <span className='text-sm'>Ongoing</span>
    </div>
  </div>
      </div>

      <div className="card bg-base-100 w-28 shadow-xl lg:w-40 lg:h-40">
  <div className="card-body">
    <h2 className="card-title text-2xl">30</h2>
    <div className="card-actions justify-start">
      <span className='text-sm'>Finished</span>
    </div>
  </div>
</div>
    </div>
  )
}

export default Card
