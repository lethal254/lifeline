const Knn = require("../../../ML/index")

export default async function handler(req, res) {
  if (req.method === "GET") {
    const predictor = new Knn()
    const symptoms = await predictor.getAllSymptoms()
    res.status(200).send(symptoms)
  } else {
    res.status(500).send("Expected a GET request")
  }
}
