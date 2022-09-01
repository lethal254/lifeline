import Link from "next/link"
import React from "react"
import { Context } from "../context"
import { useContext } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import { toast } from "react-toastify"

const Layout = ({ children }) => {
  const {
    state: { user },
    dispatch,
  } = useContext(Context)

  const router = useRouter()

  const handleLogout = async () => {
    try {
      dispatch({ type: "LOGOUT" })
      window.localStorage.removeItem("user")
      const { data } = await axios.get(`/api/auth/logout`)
      if (data) {
        toast.success(data)
        router.push("/login")
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='w-full bg-background min-h-[100vh]'>
      <header className='w-[95%] md:w-[60%] mx-auto flex justify-between h-12 items-center sticky top-0 z-50 bg-background'>
        <h1 className='flex-1 text-2xl font-bold tracking-normal text-primary'>
          Lifeline
        </h1>
        <div className='text-secondary font-medium md:flex hidden items-center'>
          <Link href='/'>
            <a className='mr-4 hover:text-primary transition-all duration-150'>
              Home
            </a>
          </Link>
          <Link href={`/dashboard/${user?._id}`}>
            <a className='mr-4 hover:text-primary transition-all duration-150'>
              Dashboard
            </a>
          </Link>
          {user ? (
            <Link href='/login'>
              <button
                onClick={(e) => handleLogout()}
                className='mr-4 border-2 px-4 py-1 border-slate-600 rounded-md hover:bg-primary hover:border-transparent hover:text-white transition-all duration-150'>
                Logout
              </button>
            </Link>
          ) : (
            <Link href='/login'>
              <button className='mr-4 border-2 px-4 py-1 border-slate-600 rounded-md hover:bg-primary hover:border-transparent hover:text-white transition-all duration-150'>
                Login
              </button>
            </Link>
          )}
        </div>
      </header>
      <div className='w-[95%] md:w-[60%]  mx-auto flex-1 min-h-[90vh] '>
        {children}
      </div>
      <footer className='sticky bottom-0 bg-secondary h-12 text-white flex items-center'>
        <div className='w-[95%] md:w-[60%]  mx-auto'>
          <p className='font-bold'>© 2022</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
