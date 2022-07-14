import Layout from "../components/Layout"
import Image from "next/image"
import { BadgeCheckIcon } from "@heroicons/react/solid"
import Link from "next/link"
import { useContext } from "react"
import { Context } from "../context"
import { useRouter } from "next/router"
import { toast } from "react-toastify"

const Home = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(Context)

  const router = useRouter()
  const handleCheckupButtonClick = () => {
    if (!user) {
      router.push("/login")
      toast.error("You have to login first")
    }
  }
  return (
    <Layout>
      {/* Hero */}
      <section className=' flex  mt-4'>
        <div className='min-h-[50vh] flex-1 flex flex-col justify-center'>
          <h2 className='text-4xl mb-4 font-bold text-secondary'>
            Headache ? Let’s find out what’s troubling you
          </h2>
          <p className='mb-4 text-primary'>
            Check your symptoms and find out what could <br /> be causing them.
          </p>
          <Link href='/checkup'>
            <button
              onClick={() => handleCheckupButtonClick()}
              className='w-fit px-4 py-1 bg-primary text-white rounded-md hover:bg-opacity-80 transition-all duration-150'>
              Start checkup
            </button>
          </Link>
        </div>
        <div className='flex-1 hidden md:flex items-center justify-center'>
          <Image src='/assets/heroimage.svg' width={500} height={500} />
        </div>
      </section>
      {/* About */}
      <section className='bg-white rounded-sm min-h-[40vh] mb-20 flex items-center justify-center flex-col  shadow-md'>
        <div className='w-[80%]'>
          <h3 className='font-bold text-2xl text-secondary'>
            <span className='text-primary '>Lifeline</span> provides you with a
            fast and accurate <br />
            health assessment
          </h3>
          <div className='mt-6'>
            <p className='flex items-center mb-4 text-secondary'>
              <BadgeCheckIcon className='h-8 mr-4 text-primary' /> Enter your
              symptoms
            </p>
            <p className='flex items-center mb-4 text-secondary'>
              <BadgeCheckIcon className='h-8 mr-4 text-primary' /> Answer some
              simple questions
            </p>
            <p className='flex items-center mb-4 text-secondary'>
              <BadgeCheckIcon className='h-8 mr-4 text-primary' /> Done! Your
              assesment will reveal
            </p>
          </div>
        </div>
      </section>
      {/* How we do it */}
      <section className='bg-primary rounded-sm min-h-[40vh] mb-4 flex items-center justify-center shadow-md'>
        <div className='w-[80%] items-center flex'>
          <div className='flex-1 mr-8'>
            <h3 className='font-bold text-2xl mb-10 text-secondary'>
              Intelligent Diagnosis Technology
            </h3>
            <p className='text-white'>
              Lifeline uses an AI model trained from thousands of statistical
              data culled from thousands of patient cases
            </p>
          </div>
          <div className='flex-1'>
            <Image src='/assets/ai.svg' width={500} height={500} />
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Home
