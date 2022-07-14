import React from "react"
import { Progress } from "antd"

const Results = () => {
  return (
    <div className='bg-white h-[50vh] w-[100%] shadow-md rounded-sm'>
      <div className='flex h-[88%] flex-col justify-center '>
        <h3 className='mx-auto w-[70%] text-xl mb-6'>Possible conditions</h3>
        <div className='w-[70%] mx-auto'>
          <div>
            <p>Malaria</p>
            <div className='flex '>
              <div className='flex-1 mr-4'>
                <Progress percent={70} />
              </div>
              <p className='flex-1 text-gray'>Medium chances</p>
            </div>
          </div>
          <div>
            <p>Pneumonia</p>
            <div className='flex '>
              <div className='flex-1 mr-4'>
                <Progress percent={50} />
              </div>
              <p className='flex-1 text-gray'>Medium chances</p>
            </div>
          </div>
          <div>
            <p>Jaundice</p>
            <div className='flex '>
              <div className='flex-1 mr-4'>
                <Progress percent={10} />
              </div>
              <p className='flex-1 text-gray'>Low chances</p>
            </div>
          </div>
        </div>
        <p className='mx-auto w-[70%] mt-6'>
          Your symptoms may require prompt medical evaluation. If your symptoms
          suddenly get worse, go to the nearest emergency department.
        </p>
      </div>
    </div>
  )
}

export default Results
