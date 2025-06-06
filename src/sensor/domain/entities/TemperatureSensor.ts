import {Sensor} from "./Sensor";

import {ReadingStatus} from "../value-objects/ReadingStatus";
import {CarSensorValidation} from "../services/validation/CarSensorValidation";
import {DriverSensorValidation} from "../services/validation/DriverSensorValidation";
import {SensorOwnerType} from "../../../shared/domain/value-objects/SensorOwnerType";

export class TemperatureSensor extends  Sensor{

    validateValue(): ReadingStatus {
        let strategyValidator: ReadingStatus;
        if(this.ownerType.type == SensorOwnerType.CAR){
            strategyValidator = new CarSensorValidation().validateTemperatureSensor(this)
        }
        else strategyValidator = new DriverSensorValidation().validateTemperatureSensor(this)
        return strategyValidator;
    }


}