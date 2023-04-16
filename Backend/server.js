import mongoose from "mongoose"
import config from "./config/config.js"
import app from "./app.js"
;(async () => {
  try {
    await mongoose.connect(config.MONGO_URL)
    console.log("Database connected")

    app.on("error", (error) => {
      console.log(error)
      throw error
    })

    const onListen = () => {
      console.log(
        `Server is running on port ${config.PORT} in ${config.NODE_ENV} mode`
      )
    }

    app.listen(config.PORT, onListen)
  } catch (error) {
    console.log(error)
  }
})()
