import { Tabs } from "antd"
import React, { useEffect } from "react"
import { useContext } from "react"
import { useState } from "react"
import Introduction from "../components/diagnosis_steps/Introduction"
import Patient from "../components/diagnosis_steps/Patient"
import Region from "../components/diagnosis_steps/Region"
import Results from "../components/diagnosis_steps/Results"
import Symptoms from "../components/diagnosis_steps/Symptoms"
import Layout from "../components/Layout"
import { useRouter } from "next/router"
import { Context } from "../context"
const { TabPane } = Tabs
import axios from "axios"
import { toast } from "react-toastify"

const Checkup = ({ data: symptomsFromServer }) => {
  const [activeKey, setActiveKey] = useState("1")
  const [gender, setGender] = useState("")
  const [age, setAge] = useState(0)
  const [symptoms, setSymptoms] = useState([])
  const [region, setRegion] = useState("")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)
  const {
    state: { user },
    dispatch,
  } = useContext(Context)
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user])

  const handleAgeChange = (value) => {
    setAge(value)
  }
  const handleAddSymptoms = (symptom) => {
    setSymptoms([...symptoms, symptom])
  }
  const handleRemoveSymptom = (symptomInput) => {
    const newSymptoms = symptoms.filter((symptom) => symptom !== symptomInput)
    setSymptoms(newSymptoms)
  }
  const handleSubmitData = async (e) => {
    try {
      setLoading(true)
      const { data } = await axios.post("/api/query/savequery", {
        sentBy: user._id,
        symptoms,
        region,
        age,
        gender,
      })
      if (data) {
        toast.success("Success")
        setResult(data.result)
        setLoading(false)
      }
    } catch (error) {
      toast.error("Error")
      console.log(error)
      setLoading(false)
    }
  }

  const changeKey = (newKey) => {
    setActiveKey(newKey)
  }
  if (user) {
    return (
      <Layout>
        <div className='flex'></div>
        {/* Left */}
        <div className='w-[100%] mt-10 '>
          <Tabs tabPosition='left' activeKey={activeKey}>
            <TabPane tab='Introduction' key='1' disabled={activeKey !== "1"}>
              <Introduction changeKey={changeKey} />
            </TabPane>
            <TabPane tab='Patient' key='2' disabled={activeKey !== "2"}>
              <Patient
                changeKey={changeKey}
                gender={gender}
                setGender={setGender}
                age={age}
                handleAgeChange={handleAgeChange}
              />
            </TabPane>
            <TabPane tab='Symptoms' key='3' disabled={activeKey !== "3"}>
              <Symptoms
                changeKey={changeKey}
                handleAddSymptoms={handleAddSymptoms}
                symptoms={symptoms}
                symptomsFromServer={symptomsFromServer}
                handleRemoveSymptom={handleRemoveSymptom}
              />
            </TabPane>
            <TabPane tab='Region' key='4' disabled={activeKey !== "4"}>
              <Region
                changeKey={changeKey}
                region={region}
                setRegion={setRegion}
                handleSubmitData={handleSubmitData}
              />
            </TabPane>
            <TabPane tab='Results' key='5' disabled={activeKey !== "5"}>
              <Results result={result} loading={loading} />
            </TabPane>
          </Tabs>
        </div>
      </Layout>
    )
  }
}

export default Checkup

export const getServerSideProps = async ({ req, res, query }) => {
  try {
    const { data } = await axios.get("http://localhost:3000/api/symptoms")
    return {
      props: {
        data,
      },
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        error: error.message,
      },
    }
  }
}
