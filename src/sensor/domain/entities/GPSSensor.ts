import {Sensor} from "./Sensor";
import {SensorId} from "../value-objects/SensorId";
import {SensorType} from "../value-objects/SensorType";
import {ReadingStatus} from "../value-objects/ReadingStatus";
import {CarSensorValidation} from "../services/validation/CarSensorValidation";
import {DriverSensorValidation} from "../services/validation/DriverSensorValidation";
import {OwnerRef} from "../value-objects/OwnerRef";
import {SensorOwnerType} from "../../../shared/domain/value-objects/SensorOwnerType";

export class GPSSensor extends Sensor{
        public latitude :number;
        public longitude:number;

    constructor(id: number | undefined,sensorId: SensorId, name: string, type: SensorType, precisionValue: number, value: number,ownerType: OwnerRef, timestamp:Date,minRangeToRead:number ,maxRangeToRead:number, latitude:number,longitude:number
    ) {
        super( id, sensorId,name,type,precisionValue,value,ownerType,timestamp,minRangeToRead,maxRangeToRead);
        this.latitude = latitude;
        this.longitude = longitude;
    }
    validateValue(): ReadingStatus {
        let strategyValidator: ReadingStatus;
        if(this.ownerType.type == SensorOwnerType.CAR){
            strategyValidator = new CarSensorValidation().validateGPSSensor(this)
        }
        else strategyValidator = new DriverSensorValidation().validateGPSSensor(this)
        return strategyValidator;
    }


}