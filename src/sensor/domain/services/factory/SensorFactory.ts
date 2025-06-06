import { SensorType } from "../../value-objects/SensorType";
import { SensorTypeEnum } from "../../value-objects/SensorTypeEnum";
import { SensorId } from "../../value-objects/SensorId";
import { GPSSensor } from "../../entities/GPSSensor";
import { GasSensor } from "../../entities/GasSensor";
import { PressureSensor } from "../../entities/PressureSensor";
import { TemperatureSensor } from "../../entities/TemperatureSensor";
import { LevelSensor } from "../../entities/LevelSensor";
import { MotionSensor } from "../../entities/MotionSensor";
import { GasType } from "../../value-objects/GasType";
import { Sensor } from "../../entities/Sensor";
import {OwnerRef} from "../../value-objects/OwnerRef";

export class SensorFactory {
    static createFromPrisma(saved: any): Sensor {

        const typeVO = SensorType.create(saved.type as SensorTypeEnum);
        const sensorIdVO = SensorId.create(saved.sensorId);
        const ownerVO = OwnerRef.create(saved.ownerId, saved.ownerType);

        switch (saved.type) {
            case SensorTypeEnum.GPS:
                return new GPSSensor(
                    saved.id,
                    sensorIdVO,
                    saved.name,
                    typeVO,
                    saved.precisionValue,
                    saved.value,
                    ownerVO,
                    saved.timestamp,
                    saved.minRangeToRead,
                    saved.maxRangeValue,
                    saved.latitude,
                    saved.longitude
                );
            case SensorTypeEnum.GAS:
                return new GasSensor(
                    saved.id,
                    sensorIdVO,
                    saved.name,
                    typeVO,
                    saved.precisionValue,
                    saved.value,
                    ownerVO,
                    saved.timestamp,
                    saved.minRangeToRead,
                    saved.maxRangeValue,
                    saved.gasType as GasType // tu tabla debe tener este campo
                );
            case SensorTypeEnum.PRESSURE:
                return new PressureSensor(
                    saved.id,
                    sensorIdVO,
                    saved.name,
                    typeVO,
                    saved.precisionValue,
                    saved.value,
                    ownerVO,
                    saved.timestamp,
                    saved.minRangeToRead,
                    saved.maxRangeValue
                );
            case SensorTypeEnum.TEMPERATURE:
                return new TemperatureSensor(
                    saved.id,
                    sensorIdVO,
                    saved.name,
                    typeVO,
                    saved.precisionValue,
                    saved.value,
                    ownerVO,
                    saved.timestamp,
                    saved.minRangeToRead,
                    saved.maxRangeValue
                );
            case SensorTypeEnum.LEVEL:
                return new LevelSensor(
                    saved.id,
                    sensorIdVO,
                    saved.name,
                    typeVO,
                    saved.precisionValue,
                    saved.value,
                    ownerVO,
                    saved.timestamp,
                    saved.minRangeToRead,
                    saved.maxRangeValue
                );
            case SensorTypeEnum.MOTION:
                return new MotionSensor(
                    saved.id,
                    sensorIdVO,
                    saved.name,
                    typeVO,
                    saved.precisionValue,
                    saved.value,
                    ownerVO,
                    saved.timestamp,
                    saved.minRangeToRead,
                    saved.maxRangeValue
                );
            default:
                throw new Error(`Cannot instantiate unknown Sensor type: ${saved.type}`);
        }
    }
}
