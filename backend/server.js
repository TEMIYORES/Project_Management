import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema.js";
import connectDB from "./config/db.js";
import corsOptions from "./config/corsOptions.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// connect to database
connectDB();
// Handle options Credentials check - before CORS!
app.use(cors(corsOptions));
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);
app.get("/", (req, res) => {
  console.log(req.originalUrl);
  res.send("Server running.");
});

app.listen(port, () => {
  console.log("Server running on port", port);
});
