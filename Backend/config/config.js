import dotenv from "dotenv"
dotenv.config()

const config = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
}

export default config
