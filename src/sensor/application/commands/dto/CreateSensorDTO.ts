// CreateSensorDTO.ts
import {SensorOwnerType} from "../../../../shared/domain/value-objects/SensorOwnerType";
import {GasType} from "../../../domain/value-objects/GasType";

export interface CreateSensorDTO {
    sensorId: string;
    name: string;
    type: string;
    precisionValue: number;
    value: number;
    ownerId: number;
    ownerType: SensorOwnerType;
    timestamp: Date;
    minRangeToRead: number;
    maxRangeValue: number;

    latitude? : number;
    longitude? : number;
    gasType?: GasType;
}
