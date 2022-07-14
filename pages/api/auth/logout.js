import { connectMongoDb } from "../../../Utils/connectMongoDb"
import cookie from "cookie"

export default async function login(req, res) {
  await connectMongoDb()
  if (req.method === "GET") {
    try {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", "", {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          path: "/",
        })
      )
      res.status(200).send("Logout successful")
    } catch (error) {
      console.log(error.message)
      res.status(500).send({ message: error.message })
    }
  } else {
    res.status(500).send("Expected a GET request")
  }
}
