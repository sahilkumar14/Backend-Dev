import express from "express";
import validateYearQuery from "./middleware/validateYearQuery.js";

const app = express();

app.get("/year", validateYearQuery, (req, res) => {
  res.json({ message: "Valid request" });
});