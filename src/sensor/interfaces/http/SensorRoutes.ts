import { Router } from "express";
import {SensorController} from "./SensorController";
// import { validateSensor } from "./sensorSchema" // si usas un middleware de validación

const router = Router();
const controller = new SensorController();

router.post("/", /* validateSensor, */ (req, res) => controller.create(req, res));
router.get("/:id", (req, res) => controller.findById(req, res));


export default router;
