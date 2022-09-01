import React from "react"
import Layout from "../../components/Layout"
import { UserIcon, MailIcon } from "@heroicons/react/solid"
import { Table } from "antd"
import { Context } from "../../context"
import { useContext } from "react"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import Query from "../../models/Query"
import jwt from "jsonwebtoken"
import { useState } from "react"
import { Modal } from "antd"
import { RefreshIcon } from "@heroicons/react/solid"
import axios from "axios"

const Dashboard = ({ data }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeDiagnosis, setActiveDiagnosis] = useState("")
  const [update, setUpdate] = useState("")
  // User
  const {
    state: { user },
  } = useContext(Context)
  useEffect(() => {
    if (!user) {
      router.push("/login")
      toast.error("You need to login first")
    }
  }, [user])

  const showModal = () => {
    setIsModalVisible(true)
  }
  const hideModal = () => {
    setIsModalVisible(false)
  }

  const { userid } = data

  const router = useRouter()

  const refreshData = () => {
    router.replace(router.asPath)
  }
  const updateAccurateResults = async () => {
    try {
      setLoading(true)
      if (userid === user._id) {
        const { data } = await axios.post("/api/query/updateresults", {
          sentBy: userid,
          queryId: activeDiagnosis.id,
          update,
        })
        console.log({ sentBy: userid, queryId: activeDiagnosis.id })
        if (data) {
          toast.success("Success")
          setLoading(false)
          hideModal()
          setUpdate("")
          refreshData()
        }
      } else {
        toast.error("Error")
      }
    } catch (error) {
      toast.error("Error")
      console.log(error)
      setLoading(false)
    }
  }

  const deleteQuery = async (id) => {
    try {
      setLoading(true)
      if (userid === user._id) {
        const { data } = await axios.post("/api/query/deletequery", {
          id,
        })
        if (data) {
          toast.success("Success")
          setLoading(false)
          refreshData()
        }
      } else {
        toast.error("Error")
      }
    } catch (error) {
      toast.error("Error")
      console.log(error)
      setLoading(false)
    }
  }

  const showModalPopup = (record) => {
    setActiveDiagnosis(record)
    showModal()
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  // Data processing
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
          <button
            className='bg-primary text-white rounded-md p-2 mr-1'
            onClick={() => {
              showModalPopup(record)
            }}>
            Update
          </button>
          <button
            className='bg-secondary text-white rounded-md p-2'
            onClick={(e) => deleteQuery(record.id)}>
            Delete
          </button>
        </div>
      ),
    },
  ]
  data = data.queries

  data = data.map((item) => {
    const d = new Date(Date.now(item.createdAt))
    return {
      id: item._id,
      date: d.toString().slice(0, 15),
      prediction: item.prediction,
      results: item.accurate,
      symptoms: item.symptoms,
      accurate: item.accurate,
    }
  })

  if (user) {
    return (
      <Layout>
        <Modal
          title='Basic Modal'
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}>
          <h3 className='text-lg'>Query made on {activeDiagnosis?.date}</h3>
          <h2 className='text-primary mt-4 font-medium'>Symptoms</h2>
          <div className='flex space-x-3 mt-4'>
            {activeDiagnosis &&
              activeDiagnosis?.symptoms.map((symptom) => (
                <p className='text-sm '>{symptom}</p>
              ))}
          </div>
          <h2 className='text-primary mt-4 font-medium'>Our prediction</h2>
          <div className='flex space-x-3 mt-4'>
            {activeDiagnosis &&
              activeDiagnosis?.prediction.map((prediction) => (
                <p className='text-sm '>{prediction}</p>
              ))}
          </div>
          <h2 className='text-primary mt-4 font-medium'>Accurate</h2>
          <div className='flex mb-2'>
            {activeDiagnosis.accurate ? (
              activeDiagnosis.accurate
            ) : (
              <>
                <RefreshIcon className='h-6 animate-spin mr-2' />
                <p>Not updated</p>
              </>
            )}
          </div>
          <div className='space-x-3'>
            <input
              type='text'
              className='border-2 h-full p-2 border-gray rounded-md'
              onChange={(e) => setUpdate(e.target.value)}
            />
            <button
              className='bg-primary text-white rounded-md p-2 mr-1 '
              onClick={(e) => {
                updateAccurateResults()
              }}>
              Update
            </button>
          </div>
        </Modal>
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

export const getServerSideProps = async ({ req, res, query }) => {
  let data = {
    queries: [],
    userid: "",
    error: "",
  }
  try {
    const token = req.cookies.token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (decoded.id) {
      const queries = await Query.find({ sentBy: query.userid })
      data.queries = queries
      data.userid = decoded.id
    } else {
      throw new Error("Not authorized to perform this action")
    }
  } catch (error) {
    console.log(error)
    data.error = error
  }

  return {
    props: { data: JSON.parse(JSON.stringify(data)) },
  }
}
