import {Sensor} from "./Sensor";

import {ReadingStatus} from "../value-objects/ReadingStatus";
import {CarSensorValidation} from "../services/validation/CarSensorValidation";
import {DriverSensorValidation} from "../services/validation/DriverSensorValidation";
import {SensorOwnerType} from "../../../shared/domain/value-objects/SensorOwnerType";

export class MotionSensor extends  Sensor{

    validateValue(): ReadingStatus {
        let strategyValidator: ReadingStatus;
        if(this.ownerType.type == SensorOwnerType.CAR){
            strategyValidator = new CarSensorValidation().validateMotionSensor(this)
        }
        else strategyValidator = new DriverSensorValidation().validateMotionSensor(this)
        return strategyValidator;
    }
    readValue(): number {
        return this.value;
    }

}