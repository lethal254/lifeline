import User from "../../../models/User"
import { connectMongoDb } from "../../../Utils/connectMongoDb"
const bcrypt = require("bcrypt")

export default async function login(req, res) {
  await connectMongoDb()

  if (req.method === "PUT") {
    let { code, email, newPassword } = req.body
    try {
      const salt = await bcrypt.genSalt(10)
      newPassword = await bcrypt.hash(newPassword, salt)
      const user = await User.findOneAndUpdate(
        { email, passwordResetCode: code },
        { password: newPassword, passwordResetCode: "" }
      )
      if (user) {
        res.status(200).send("Password changed")
      }
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  } else {
    res.status(500).send("Expected a PUT request")
  }
}
