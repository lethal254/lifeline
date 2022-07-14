import React from "react"
import { useState } from "react"
import { LocationMarkerIcon } from "@heroicons/react/solid"

const Region = ({ changeKey, region, setRegion }) => {
  const [regionInput, setRegionInput] = useState("")
  return (
    <div className='bg-white h-[50vh] w-[100%] shadow-md rounded-sm'>
      <div className='flex h-[88%] items-center justify-center '>
        <div className='w-[80%] h-[80%]'>
          <h3 className='text-xl'>What is your location</h3>
          <p>What region are you from?</p>
          <input
            type='text'
            className='border border-gray p-2 rounded-md outline-none focus:border-primary'
            placeholder='Search e.g Nyanza'
            list='regions'
            name='regionsinput'
            value={regionInput}
            onChange={(e) => {
              setRegionInput(e.target.value)
            }}
            onKeyDown={(e) => {
              e.key === "Enter" && setRegion(regionInput)
              setRegionInput("")
            }}
          />
          <p className='mt-4 flex items-center'>
            {region ? <LocationMarkerIcon className='w-8 text-primary' /> : ""}

            {region}
          </p>
          <datalist id='regions' className='bg-background'>
            <option value='Central'>Central</option>
            <option value='Nyanza'>Nyanza</option>
            <option value='Western'>Western</option>
          </datalist>
        </div>
      </div>
      <div className='flex justify-end  border-t pt-2 border-gray'>
        <button
          className=' bg-secondary mr-4 py-2 px-4 text-white rounded-md shadow-md hover:bg-opacity-80 transition-all duration-150'
          onClick={() => changeKey("3")}>
          Previous
        </button>
        {region && (
          <button
            className=' bg-primary mr-4 py-2 px-4 text-white rounded-md shadow-md hover:bg-opacity-80 transition-all duration-150'
            onClick={() => changeKey("5")}>
            Get results
          </button>
        )}
      </div>
    </div>
  )
}

export default Region
