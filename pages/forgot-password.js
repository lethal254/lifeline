import {
  CalculatorIcon,
  LockClosedIcon,
  MailIcon,
} from "@heroicons/react/solid"
import axios from "axios"
import React from "react"
import { useState } from "react"
import Layout from "../components/Layout"
import { toast } from "react-toastify"
import { useRouter } from "next/router"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [code, setCode] = useState("")
  const [showOtherInputs, setShowOtherInputs] = useState(false)

  const router = useRouter()

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (email) {
      try {
        const { data } = await axios.put("/api/auth/reset-password", { email })
        toast.success(data)
        setShowOtherInputs(true)
      } catch (error) {
        toast.error(error.message)
      }
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    if (email && showOtherInputs && code && newPassword) {
      try {
        const { data } = await axios.put("/api/auth/create-new-password", {
          email,
          code,
          newPassword,
        })
        toast.success(data)
        router.push("/login")
      } catch (error) {
        toast.error(error.message)
      }
    }
  }
  return (
    <Layout>
      <div className='w-[100%] h-[80vh]  flex items-center justify-center flex-col'>
        <div className='w-[60%] min-h-[70%] bg-white rounded-sm shadow-md flex flex-col items-center justify-center'>
          <h3 className='font-bold text-3xl  text-secondary mx-auto'>
            <span className='text-primary'>Forgot</span> Password ?
          </h3>
          <p className='mt-4 mb-4 text-secondary'>
            Enter your credentials to access your account
          </p>
          <form
            className='w-[70%] flex flex-col '
            onSubmit={(e) => {
              !showOtherInputs ? handleFormSubmit(e) : handleResetPassword(e)
            }}>
            <div className='border w-[100%] mb-4 flex items-center py-3 px-2 border-gray rounded-md'>
              <MailIcon className='h-8 mr-4 text-primary' />
              <input
                type='email'
                className='w-full h-[100%] border-0 outline-none'
                placeholder='Enter your Email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>
            {showOtherInputs ? (
              <>
                <div className='border w-[100%] mb-4 flex items-center py-3 px-2 border-gray rounded-md'>
                  <CalculatorIcon className='h-8 mr-4 text-primary' />
                  <input
                    type='text'
                    className='w-full h-[100%] border-0 outline-none'
                    placeholder='Enter the short code sent to your email'
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value)
                    }}
                  />
                </div>
                <div className='border w-[100%] mb-4 flex items-center py-3 px-2 border-gray rounded-md'>
                  <LockClosedIcon className='h-8 mr-4 text-primary' />
                  <input
                    type='password'
                    className='w-full h-[100%] border-0 outline-none'
                    placeholder='New Password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </>
            ) : (
              <></>
            )}
            <button className=' px-4 py-3 bg-primary text-white rounded-md hover:bg-opacity-80 transition-all duration-150'>
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default ForgotPassword
