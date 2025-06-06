import {Sensor} from "../../entities/Sensor";
import {ReadingStatus} from "../../value-objects/ReadingStatus";
import {GasSensor} from "../../entities/GasSensor";
import {GPSSensor} from "../../entities/GPSSensor";

export interface ValueValidationStrategy {

    validateLevelSensor(sensor: Sensor): ReadingStatus
    validateMotionSensor(sensor: Sensor): ReadingStatus
    validatePressureSensor(sensor: Sensor): ReadingStatus
    validateGasSensor(sensor: GasSensor): ReadingStatus
    validateTemperatureSensor(sensor: Sensor): ReadingStatus
    validateGPSSensor(sensor: GPSSensor): ReadingStatus

}