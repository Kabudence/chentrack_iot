import {CreateSensorUseCase} from "./commands/use-cases/CreateSensorUseCase";
import {SensorPrismaRepository} from "../infraestructure/prisma/SensorPrismaRepository";
import {FindSensorByIdUseCase} from "./queries/use-case/FindSensorByIdUseCase";
import {FindSensorByOwnerIdUseCase} from "./queries/use-case/FindSensorByOwnerIdUseCase";

const sensorRepo = new SensorPrismaRepository();

export const createSensorUseCase = new CreateSensorUseCase(sensorRepo);
export const findSensorByIdUseCase = new FindSensorByIdUseCase(sensorRepo);
export const findSensorByOwnerIdUseCase = new FindSensorByOwnerIdUseCase(sensorRepo);
