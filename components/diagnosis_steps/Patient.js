import React from "react"
import Image from "next/image"
import { Slider } from "antd"

const Patient = ({ changeKey, gender, setGender, handleAgeChange, age }) => {
  if (gender) {
    return (
      <div className='bg-white h-[50vh] w-[100%] shadow-md rounded-sm flex items-center  justify-center flex-col'>
        <div className='w-[70%] h-[88%] flex flex-col  justify-center'>
          <h3 className='text-xl mb-4'>How old are you</h3>
          <Slider
            defaultValue={0}
            max={150}
            value={age}
            onChange={handleAgeChange}
          />
        </div>
        <div className='flex justify-end  border-t pt-2 border-gray w-full'>
          <button
            className=' bg-secondary mr-4 py-2 px-4 text-white rounded-md shadow-md hover:bg-opacity-80 transition-all duration-150'
            onClick={() => changeKey("1")}>
            Previous
          </button>
          <button
            className=' bg-primary mr-4 py-2 px-4 text-white rounded-md shadow-md hover:bg-opacity-80 transition-all duration-150'
            onClick={() => {
              if (age !== 0) {
                changeKey("3")
              }
            }}>
            Next
          </button>
        </div>
      </div>
    )
  } else {
    return (
      <div className='bg-white h-[50vh] w-[100%] shadow-md rounded-sm'>
        <div className='flex h-[88%] items-center justify-center'>
          <div className='mr-8 flex items-center flex-col'>
            <div
              className='border rounded-md hover:border-primary transition-all duration-150 cursor-pointer'
              onClick={() => {
                setGender("male")
              }}>
              <Image
                src='/assets/male.svg'
                width={200}
                height={200}
                alt='Male icon'
              />
            </div>
            <p className='mt-2 text-xl'>Male</p>
          </div>
          <div className='flex items-center flex-col'>
            <div
              className='border rounded-md hover:border-primary transition-all duration-150 cursor-pointer'
              onClick={() => {
                setGender("female")
              }}>
              <Image
                src='/assets/female.svg'
                width={200}
                height={200}
                alt='Male icon'
              />
            </div>
            <p className='mt-2 text-xl'>Female</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Patient
