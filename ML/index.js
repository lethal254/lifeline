require("@tensorflow/tfjs-node")
const tf = require("@tensorflow/tfjs")
const _ = require("lodash")
const dfd = require("danfojs-node")

class Knn {
  constructor() {
    this.filename =
      "https://raw.githubusercontent.com/lethal254/files/main/Training.csv"
    this.testtingFileName =
      "https://raw.githubusercontent.com/lethal254/files/main/testing.csv"
  }
  async importCsvData() {
    const df = await dfd.readCSV(this.filename)
    // We drop the last column since it has empty values
    df.drop({ columns: [df.columns[133]], inplace: true })
    let data = _.shuffle(df.values)
    const features = _.map(data, (row) => _.slice(row, 0, -1))
    const labels = _.map(data, (row) => _.last(row))
    return {
      labels,
      features,
    }
  }
  async getSymptomsFromUser(userSymptoms) {
    const df = await dfd.readCSV(this.testtingFileName)
    const symptoms = Array(df.columns)[0].slice(0, -1)

    let updatedSymptoms = []

    symptoms.forEach((symptom) => {
      if (userSymptoms.includes(symptom)) {
        updatedSymptoms.push(1)
      } else {
        updatedSymptoms.push(0)
      }
    })
    return tf.tensor(updatedSymptoms)
  }
  async knn(predictionPoint) {
    const k = 5
    let { features, labels } = await this.importCsvData("./training.csv")
    features = tf.tensor(features)
    labels = tf.tensor(labels)
    const distance = features.sub(predictionPoint).pow(2).sum(1).pow(0.5)
    const distanceArray = distance.arraySync()
    const labelsArray = labels.arraySync()
    let conc = distanceArray
      .map((dist, i) => {
        return [dist, labelsArray[i]]
      })
      .sort((a, b) => (a[0] > b[0] ? 1 : -1))
      .slice(0, k)
    const result = _.chain(conc).first().last().value()
    return result
  }
  async loadTestingData() {
    const df = await dfd.readCSV(this.testtingFileName)
    let data = df.values
    return data
  }
  async getAllSymptoms() {
    const df = await dfd.readCSV(this.testtingFileName)
    const symptoms = Array(df.columns)[0].slice(0, -1)
    return symptoms
  }
  async testAccuracy() {
    let loadedData = await this.loadTestingData()
    const labels = _.map(loadedData, (row) => _.last(row)).slice(0, 41)

    const testingData = _.map(loadedData, (row) => _.slice(row, 0, -1))

    let results = []

    for (let i = 0; i <= 40; i++) {
      const data = await this.knn(tf.tensor(testingData[i]))
      results.push(data)
    }
    let zipped = _.zip(labels, results)
    let accuracyCount = 0
    zipped.forEach((row) => {
      if (row[0] === row[1]) {
        accuracyCount += 1
      }
    })
    console.log(accuracyCount / zipped.length)
  }
}

// const predictor = new Knn()

// const predict = async () => {
//   await predictor.testAccuracy()
// }
// predict()

module.exports = Knn
