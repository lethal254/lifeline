import User from "../../../models/User"
import { connectMongoDb } from "../../../Utils/connectMongoDb"
const shortid = require("shortid")
const nodemailer = require("nodemailer")

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
})

export default async function login(req, res) {
  await connectMongoDb()

  if (req.method === "PUT") {
    try {
      const { email } = req.body
      const shortCode = shortid.generate()
      const user = await User.findOneAndUpdate(
        { email },
        { passwordResetCode: shortCode }
      )
      if (user) {
        const msg = {
          to: email,
          from: "benardogutu65@gmail.com",
          subject: "Password Reset",
          html: `
                <h1>Use this code to reset your password</h1>
                <p style="color:green;">${shortCode}</p>
            `,
        }
        const response = await transporter.sendMail(msg)
        console.log(response)
        res.status(200).send("Code send to " + email)
      } else {
        res.status(500).send("User not found")
        console.log(error)
      }
    } catch (error) {
      res.status(500).send(error)
      console.log(error)
    }
  } else {
    res.status(500).send("Expected a PUT request")
  }
}
