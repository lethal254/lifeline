import Query from "../../../models/Query"
import { connectMongoDb } from "../../../Utils/connectMongoDb"
const Knn = require("../../../ML/index")
require("@tensorflow/tfjs-node")
const tf = require("@tensorflow/tfjs")

export default async function saveQuery(req, res) {
  await connectMongoDb()
  try {
    if (req.method === "POST") {
      if (req.body) {
        const predictor = new Knn()
        const symptoms = await predictor.getSymptomsFromUser(req.body.symptoms)
        const data = await predictor.knn(symptoms)
        const query = await Query.create({ ...req.body, prediction: [data] })

        res.send({ result: data })
      }
    } else {
      res.status(500).send("Expected a POST request")
    }
  } catch (error) {
    console.log(error)
  }
}
