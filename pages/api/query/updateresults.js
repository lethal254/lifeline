import Query from "../../../models/Query"
import { connectMongoDb } from "../../../Utils/connectMongoDb"

export default async function updateResults(req, res) {
  await connectMongoDb()
  try {
    const { sentBy, queryId, update } = req.body
    console.log(queryId)
    if (req.method === "POST") {
      if (req.body) {
        const query = await Query.findByIdAndUpdate(queryId, {
          accurate: update,
        })

        if (query) {
          res.send({ result: query })
          console.log(query)
        }
      }
    } else {
      res.status(500).send("Expected a POST request")
    }
  } catch (error) {
    console.log(error)
  }
}
