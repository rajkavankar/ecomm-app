import express from "express"
import swaggerUi from "swagger-ui-express"
import YAML from "yaml"
import fs from "fs"
const app = express()

const file = fs.readFileSync("./Backend/swagger.yaml", "utf8")
const swaggerDocument = YAML.parse(file)

// Swagger document
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

export default app
