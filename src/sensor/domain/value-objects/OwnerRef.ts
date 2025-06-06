import {SensorOwnerType} from "../../../shared/domain/value-objects/SensorOwnerType";

export class OwnerRef {
    private constructor(
        public readonly id: number,
        public readonly type: SensorOwnerType
    ) {}

    static create(id: number, type: SensorOwnerType): OwnerRef {
        if (id <= 0) throw new Error('Invalid Owner ID');
        return new OwnerRef(id, type);
    }
}
