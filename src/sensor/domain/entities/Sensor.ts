import {SensorType} from "../value-objects/SensorType";
import {SensorId} from "../value-objects/SensorId";
import {ReadingStatus} from "../value-objects/ReadingStatus";
import {OwnerRef} from "../value-objects/OwnerRef";

export  abstract class Sensor {

    public readonly id: number | undefined; // <--- aquí el id de BD, puede ser opcional
    public  sensorId: SensorId;
    public name: string;
    public type: SensorType;
    public precisionValue: number;
    public value: number;
    public ownerType: OwnerRef;
    public timestamp : Date;
    public minRangeToRead: number;
    public maxRangeValue: number;


constructor( id: number | undefined,sensorId: SensorId, name: string, type: SensorType, precisionValue: number, value: number,ownerType: OwnerRef, timestamp:Date,minRangeToRead:number ,maxRangeToRead:number ) {
    this.id = id;
    this.sensorId = sensorId;
    this.name = name;
    this.type = type;
    this.precisionValue = precisionValue;
    this.value = value;
    this.ownerType =ownerType;
    this.timestamp = timestamp;
    this.minRangeToRead = minRangeToRead;
    this.maxRangeValue = maxRangeToRead;

}
public abstract validateValue():ReadingStatus;

}