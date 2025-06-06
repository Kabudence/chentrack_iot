import {Sensor} from "./Sensor";

import {ReadingStatus} from "../value-objects/ReadingStatus";
import {CarSensorValidation} from "../services/validation/CarSensorValidation";
import {DriverSensorValidation} from "../services/validation/DriverSensorValidation";
import {SensorOwnerType} from "../../../shared/domain/value-objects/SensorOwnerType";

export class LevelSensor extends  Sensor{

    validateValue(): ReadingStatus {
        let strategyValidator: ReadingStatus;
        if(this.ownerType.type == SensorOwnerType.CAR){
            strategyValidator = new CarSensorValidation().validateLevelSensor(this)
        }
        else strategyValidator = new DriverSensorValidation().validateLevelSensor(this)
        return strategyValidator;
    }


}