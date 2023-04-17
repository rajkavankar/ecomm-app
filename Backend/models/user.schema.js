import mongoose from "mongoose"
import config from "../config/config.js"
import AuthRoles from "../utils/AuthRoles.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { nanoid } from "nanoid"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Neme is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [8, "Password should be atleast 8 charecter long"],
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(AuthRoles),
      default: AuthRoles.USER,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
  },
  {
    timestamps: true,
  }
)

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next()
  } else {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  }
})

userSchema.methods = {
  comparePassword: async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
  },
  getJwtToken: function () {
    return jwt.sign({ _id: this._id }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRY,
    })
  },
  getForgotPasswordToken: function () {
    const forgotToken = nanoid()

    this.forgotPasswordToken = forgotToken

    this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000

    return forgotToken
  },
}

export default mongoose.model("User", userSchema)
