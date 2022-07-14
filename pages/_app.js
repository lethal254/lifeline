import "../styles/globals.css"
import "antd/dist/antd.css"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Provider } from "../context/index"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider>
        <Component {...pageProps} />
        <ToastContainer position='top-center' theme='dark' />
      </Provider>
    </>
  )
}

export default MyApp
