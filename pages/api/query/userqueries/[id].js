import Query from "../../../../models/Query"
import { connectMongoDb } from "../../../../Utils/connectMongoDb"
import jwt from "jsonwebtoken"

export default async function fetchQueries(req, res) {
  await connectMongoDb()
  if (req.method === "GET") {
    const createdBy = req.query.id
    // const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // console.log(decoded)

    res.status(200).send("Ok")
  } else {
    res.status(500).send("Expected a GET request")
  }
}
