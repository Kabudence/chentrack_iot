import {SensorTypeEnum} from "./SensorTypeEnum";

export class SensorType {
    private constructor(readonly sensorType: SensorTypeEnum ) {
    }
    static create(raw: string): SensorType {
        if (!Object.values(SensorTypeEnum).includes(raw as SensorTypeEnum)) {
            throw new Error('Invalid SensorType');
        }
        return new SensorType(raw as SensorTypeEnum);
    }
}