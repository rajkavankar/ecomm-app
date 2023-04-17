import mongoose from "mongoose"

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Neme is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model("Collection", collectionSchema)
