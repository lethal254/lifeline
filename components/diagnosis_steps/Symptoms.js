import React from "react"
import { useState } from "react"

const Symptoms = ({
  handleAddSymptoms,
  symptoms,
  handleRemoveSymptom,
  changeKey,
}) => {
  const [symptominput, setSymptomInput] = useState("")
  return (
    <div className='bg-white h-[50vh] w-[100%] shadow-md rounded-sm'>
      <div className='flex h-[88%] items-center justify-center '>
        <div className='w-[80%] h-[80%]'>
          <h3 className='text-xl'>Add your symptoms</h3>
          <p>Add as many symptoms as you can for the most accurate results.</p>
          <input
            type='text'
            className='border border-gray p-2 rounded-md outline-none focus:border-primary'
            placeholder='Search e.g Headache'
            list='symptoms'
            name='symptomsinput'
            onKeyDown={(e) => {
              e.key === "Enter" && handleAddSymptoms(symptominput)
              setSymptomInput("")
            }}
            onChange={(e) => setSymptomInput(e.target.value)}
          />
          <datalist id='symptoms' className='bg-background'>
            <option value='Headache'>Headache</option>
            <option value='Chest Pain'>Chest Pain</option>
            <option value='Stomachache'>Stomachache</option>
          </datalist>

          <div className='mt-8 flex max-w-[100%] flex-wrap'>
            {symptoms.map((symptom) => (
              <p className='bg-primary text-white p-2 w-fit rounded-md flex items-center whitespace-nowrap  mr-4'>
                {symptom}
                <span
                  className='ml-1 hover:text-secondary cursor-pointer transition-all duration-150 flex h-6 w-6 bg-white items-center justify-center rounded-full text-primary font-bold '
                  onClick={(e) => handleRemoveSymptom(symptom)}>
                  X
                </span>
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className='flex justify-end  border-t pt-2 border-gray'>
        <button
          className=' bg-secondary mr-4 py-2 px-4 text-white rounded-md shadow-md hover:bg-opacity-80 transition-all duration-150'
          onClick={() => changeKey("2")}>
          Previous
        </button>
        {symptoms.length > 0 && (
          <button
            className=' bg-primary mr-4 py-2 px-4 text-white rounded-md shadow-md hover:bg-opacity-80 transition-all duration-150'
            onClick={() => changeKey("4")}>
            Next
          </button>
        )}
      </div>
    </div>
  )
}

export default Symptoms
