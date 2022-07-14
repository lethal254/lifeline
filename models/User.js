const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username."],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  passwordResetCode: {
    type: String,
    default: "",
  },
})

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } else {
    next(new Error("failed to encrypt password"))
  }
})
UserSchema.methods.comparePassword = async function (password, next) {
  const comparison = bcrypt.compare(password, this.password)
  if (!comparison) {
    return {
      isMatch: false,
      comparison: comparison,
    }
  } else {
    return {
      isMatch: true,
      comparison: comparison,
    }
  }
}

export default mongoose.models.User || mongoose.model("User", UserSchema)
