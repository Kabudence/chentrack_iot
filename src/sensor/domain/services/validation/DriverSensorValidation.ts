import {ValueValidationStrategy} from "./ValueValidationStrategy";
import {Sensor} from "../../entities/Sensor";
import {ReadingStatus} from "../../value-objects/ReadingStatus";
import {GasSensor} from "../../entities/GasSensor";
import {GPSSensor} from "../../entities/GPSSensor";

export class DriverSensorValidation implements ValueValidationStrategy{
    validateLevelSensor(sensor: Sensor): ReadingStatus{
    return ReadingStatus.NORMAL
    }
    validateMotionSensor(sensor: Sensor): ReadingStatus{
        return ReadingStatus.NORMAL

    }
    validatePressureSensor(sensor: Sensor): ReadingStatus{
        return ReadingStatus.NORMAL

    }
    validateGasSensor(sensor: GasSensor): ReadingStatus{
        return ReadingStatus.NORMAL

    }
    validateTemperatureSensor(sensor: Sensor): ReadingStatus{
        return ReadingStatus.NORMAL

    }
    validateGPSSensor(sensor: GPSSensor): ReadingStatus{
        return ReadingStatus.NORMAL

    }
}