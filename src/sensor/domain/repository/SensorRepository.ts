import {Sensor} from "../entities/Sensor";
import {SensorTypeEnum} from "../value-objects/SensorTypeEnum";

export interface SensorRepository {

    save(sensor: Sensor): Promise<Sensor>;
    findById(id: number): Promise<Sensor | null>;
    findBySensorId(sensorId: string): Promise<Sensor | null>;
    findAll(): Promise<Sensor[]>;
    findBySensorType(sensorType: SensorTypeEnum): Promise<Sensor | null>;
}