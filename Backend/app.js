import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import swaggerUi from "swagger-ui-express"
import YAML from "yaml"
import fs from "fs"
const app = express()

const file = fs.readFileSync("./Backend/swagger.yaml", "utf8")
const swaggerDocument = YAML.parse(file)

// Swagger document
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.all("*", (_req, res) => {
  res.status(404).json({
    succes: false,
    message: "Page not found",
  })
})

export default app
