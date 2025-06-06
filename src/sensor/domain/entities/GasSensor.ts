import {Sensor} from "./Sensor";
import {ReadingStatus} from "../value-objects/ReadingStatus";
import {CarSensorValidation} from "../services/validation/CarSensorValidation";
import {DriverSensorValidation} from "../services/validation/DriverSensorValidation";
import {SensorId} from "../value-objects/SensorId";
import {SensorType} from "../value-objects/SensorType";
import {GasType} from "../value-objects/GasType";
import {OwnerRef} from "../value-objects/OwnerRef";
import {SensorOwnerType} from "../../../shared/domain/value-objects/SensorOwnerType";

export class GasSensor extends  Sensor{
        public gasType:GasType;

    constructor(id: number | undefined,sensorId: SensorId, name: string, type: SensorType, precisionValue: number, value: number,ownerType: OwnerRef, timestamp:Date,minRangeToRead:number ,maxRangeToRead:number, gasType:GasType
    ) {
        super( id, sensorId,name,type,precisionValue,value,ownerType,timestamp,minRangeToRead,maxRangeToRead);
        this.gasType = gasType;
    }

    validateValue(): ReadingStatus {
        let strategyValidator: ReadingStatus;
        if(this.ownerType.type == SensorOwnerType.CAR){
            strategyValidator = new CarSensorValidation().validateGasSensor(this)
        }
        else strategyValidator = new DriverSensorValidation().validateGasSensor(this)
        return strategyValidator;
    }


}