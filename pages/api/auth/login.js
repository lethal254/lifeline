import User from "../../../models/User"
import { connectMongoDb } from "../../../Utils/connectMongoDb"
import cookie from "cookie"
import jwt from "jsonwebtoken"
const bcrypt = require("bcrypt")

export default async function login(req, res) {
  await connectMongoDb()
  if (req.method === "POST") {
    try {
      let { email, password } = req.body
      let user = await User.findOne({ email })

      if (user) {
        if (await bcrypt.compare(password, user.password)) {
          user.password = undefined
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
          res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== "development",
              maxAge: 60 * 60 * 24 * 7, // 1 week
              sameSite: "strict",
              path: "/",
            })
          )
          res.status(200).send(user)
        } else {
          throw new Error("Wrong username/password")
        }
      }
    } catch (error) {
      console.log(error.message)
      res.status(500).send({ message: error.message })
    }
  } else {
    res.status(500).send("Expected a POST request")
  }
}
