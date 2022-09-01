const mongoose = require("mongoose")

const QuerySchema = new mongoose.Schema(
  {
    sentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    symptoms: [String],
    region: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "Male",
    },
    prediction: {
      type: [],
      default: [],
    },
    accurate: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
)

export default mongoose.models.Query || mongoose.model("Query", QuerySchema)
