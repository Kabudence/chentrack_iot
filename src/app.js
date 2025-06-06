import express from "express";
import sensorRoutes from "./sensor/interfaces/http/sensorRoutes";

const app = express();
app.use(express.json());

app.use("/api/sensors", sensorRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
