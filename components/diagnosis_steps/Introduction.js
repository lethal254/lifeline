import React from "react"
import Image from "next/image"

const Introduction = ({ changeKey }) => {
  return (
    <div className='bg-white h-[50vh] w-[100%] shadow-md rounded-sm'>
      <div className='flex h-[88%]'>
        <div className='flex-1 flex flex-col  justify-center items-center h-full'>
          <div className='w-[90%]'>
            <h3 className='font-semibold text-2xl'>Hello</h3>
            <p>
              You’re about to use a short (3 min), safe and anonymous health
              checkup. Your answers will be carefully analyzed and you’ll learn
              about possible causes of your symptoms
            </p>
          </div>
        </div>
        <div className='flex-1 flex items-center justify-center'>
          <Image
            src='/assets/intro.svg'
            width={300}
            height={300}
            alt='Introduction'
          />
        </div>
      </div>
      <div className='flex justify-end  border-t pt-2 border-gray'>
        <button
          className=' bg-primary mr-4 py-2 px-4 text-white rounded-md shadow-md hover:bg-opacity-80 transition-all duration-150'
          onClick={() => changeKey("2")}>
          Next
        </button>
      </div>
    </div>
  )
}

export default Introduction
