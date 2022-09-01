import React from "react"
import { Progress } from "antd"
import { RefreshIcon } from "@heroicons/react/solid"

const Results = ({ result, loading }) => {
  return (
    <div className='bg-white h-[50vh] w-[100%] shadow-md rounded-sm'>
      <div className='flex h-[88%] flex-col justify-center '>
        <h3 className='mx-auto w-[70%] text-xl mb-6  text-center'>
          Possible condition
        </h3>
        <div className='w-[70%] mx-auto'>
          <div className='w-44 h-44 bg-primary rounded-full mx-auto flex items-center justify-center text-xl font-bold text-white text-center'>
            {loading ? <RefreshIcon className='animate-spin' /> : result}
          </div>
        </div>
        <p className='mx-auto w-[70%] mt-6 text-center'>
          Your symptoms may require prompt medical evaluation. If your symptoms
          suddenly get worse, go to the nearest emergency department.
        </p>
      </div>
    </div>
  )
}

export default Results
