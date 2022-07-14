import User from "../../../models/User"
import { connectMongoDb } from "../../../Utils/connectMongoDb"
const bcrypt = require("bcrypt")

export default async function signup(req, res) {
  await connectMongoDb()
  if (req.method === "POST") {
    try {
      let { email, username, password } = req.body
      let user = await User.create({ username, email, password })

      if (user) {
        res.status(200).send(user)
      }
    } catch (error) {
      console.log(error.message)

      if (error.code === 11000) {
        error.message = "A user with this email already exists"
      }
      res.status(500).send({ message: error.message })
    }
  } else {
    res.status(500).send("Expected a POST request")
  }
}
