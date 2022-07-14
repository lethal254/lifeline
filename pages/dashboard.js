import React from "react"
import Layout from "../components/Layout"
import { UserIcon, MailIcon } from "@heroicons/react/solid"
import { Table } from "antd"
import { Context } from "../context"
import { useContext } from "react"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { toast } from "react-toastify"

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Our prediction",
    dataIndex: "prediction",
    key: "prediction",
  },
  {
    title: "Correct results",
    dataIndex: "results",
    key: "results",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: (_, record) => (
      <div>
        <button className='bg-primary text-white rounded-md p-2 mr-1'>
          Update
        </button>
        <button className='bg-secondary text-white rounded-md p-2'>
          Delete
        </button>
      </div>
    ),
  },
]

const data = [
  {
    key: "0",
    id: "12345",
    date: "1st June, 2020",
    prediction: "Malaria",
    results: "Pneumonia",
    grade: 4,
  },
  {
    key: "0",
    id: "12345",
    date: "1st June, 2020",
    prediction: "Hepatitis",
    results: "Jaundis",
    grade: 4,
  },
  {
    key: "0",
    id: "12345",
    date: "1st June, 2020",
    prediction: "Anaemia",
    results: "Uknown",
    grade: 4,
  },
]

const Dashboard = () => {
  const {
    state: { user },
  } = useContext(Context)
  const router = useRouter()
  useEffect(() => {
    if (!user) {
      router.push("/login")
      toast.error("You need to login first")
    }
  }, [user])
  if (user) {
    return (
      <Layout>
        <div className='mt-8'>
          <div className='w-[100%] min-h-[40vh] bg-primary rounded-md shadow-md flex items-center justify-center flex-col text-white'>
            <div
              className='w-40 h-40 bg-white rounded-full mb-2'
              style={{
                backgroundImage: `url("/assets/avatar.svg")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}></div>
            <h3 className='text-2xl font-semibold text-white'>
              Welcome, {user?.username}
            </h3>
            <p className='flex items-center justify-center '>
              <UserIcon className='h-6 mr-2' />
              {user?.username}
            </p>
            <p className='flex items-center justify-center'>
              <MailIcon className='h-6 mr-2' />
              {user?.email}
            </p>
          </div>
          <div className='mt-4'>
            <h3 className='text-2xl font-semibold'>Previous Diagnosis</h3>
            <p className='text-base'>
              To improve our platform let us know what your diagnosis from a
              certified medical officer was
            </p>
          </div>
          <div className='mt-2'>
            <Table columns={columns} dataSource={data} />
          </div>
        </div>
      </Layout>
    )
  }
}

export default Dashboard
