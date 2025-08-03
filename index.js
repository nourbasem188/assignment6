import express from "express";
import { bootstrap } from "./src/app.controller.js";
const app = express();
const port =3000;
app.use(express.json());

bootstrap(app,express);

app.listen(port,()=>console.log(`Server running on port ${port}`));