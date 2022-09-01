import Query from "../../../models/Query"
import { connectMongoDb } from "../../../Utils/connectMongoDb"

export default async function deleteQuery(req, res) {
  await connectMongoDb()
  try {
    const { id } = req.body
    console.log(id)
    if (req.method === "POST") {
      if (req.body) {
        const query = await Query.findByIdAndDelete(id)

        if (query) {
          res.send({ result: query })
          console.log(query)
        } else {
          throw new Error("Query not found")
          res.status(500).send("Query not found")
        }
      }
    } else {
      res.status(500).send("Expected a POST request")
    }
  } catch (error) {
    console.log(error)
  }
}
