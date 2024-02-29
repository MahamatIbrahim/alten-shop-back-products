import express from "express";
import cors from "cors";
import { config } from "dotenv";
import connectDb from "./configs/db.js";
import authRoute from "./routes/routes.js";
import swaggerJsDoc from 'swagger-jsdoc';
import {serve, setup} from 'swagger-ui-express';
connectDb();
config();
const port = process.env.PORT || 8080;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API",
      description: "A REST API built with Express and MongoDB.",
      version: "0.1",
    },
    servers: [
      {
        url: `http://localhost:${port}/api`,
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const openapiSpecification = swaggerJsDoc(options);


const app = express();
app.use(cors());
app.use(express.json());


app.use("/api", authRoute);
app.use("/docs", serve, setup(openapiSpecification));

app.listen(port, () => {
  console.log("Serveur démarré sur le port", `${"http://localhost:"}${port}`);
});
