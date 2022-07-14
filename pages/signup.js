import React, { useState } from "react"
import Layout from "../components/Layout"
import { LockClosedIcon, MailIcon, UserIcon } from "@heroicons/react/solid"
import Link from "next/link"
import { toast } from "react-toastify"
import axios from "axios"

const Signup = () => {
  const [username, setUsername] = useState("ben")
  const [password, setPassword] = useState("lethalone")
  const [email, setEmail] = useState("benardogutu65@gmail.com")

  const onSignup = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("/api/auth/signup", {
        username,
        email,
        password,
      })
      if (data) {
        toast.success("Sign up succesful")
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
    }
  }

  return (
    <Layout>
      <div className='w-[100%] h-[80vh]  flex items-center justify-center flex-col'>
        {/* Login box */}
        <div className='w-[60%] min-h-[70%] bg-white rounded-sm shadow-md flex flex-col items-center justify-center'>
          <h3 className='font-bold text-3xl mb-6 text-secondary mx-auto'>
            <span className='text-primary'>Create</span> an account
          </h3>
          <form className='w-[70%] flex flex-col ' onSubmit={onSignup}>
            <div className='border w-[100%] mb-4 flex items-center py-3 px-2 border-gray rounded-md'>
              <UserIcon className='h-8 mr-4 text-primary' />
              <input
                type='text'
                className='w-full h-[100%] border-0 outline-none'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='border w-[100%] mb-4 flex items-center py-3 px-2 border-gray rounded-md'>
              <MailIcon className='h-8 mr-4 text-primary' />
              <input
                type='email'
                className='w-full h-[100%] border-0 outline-none'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='border w-[100%] mb-4 flex items-center py-3 px-2 border-gray rounded-md'>
              <LockClosedIcon className='h-8 mr-4 text-primary' />
              <input
                type='password'
                className='w-full h-[100%] border-0 outline-none'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className=' px-4 py-3 bg-primary text-white rounded-md hover:bg-opacity-80 transition-all duration-150'>
              Submit
            </button>
          </form>
        </div>

        {/* Signup Link */}
        <Link href='/login'>
          <a className='mt-6 text-secondary font-medium'>
            Have an account? <span className='text-primary'>Login</span>{" "}
          </a>
        </Link>
      </div>
    </Layout>
  )
}

export default Signup
