export interface SensorOwner {
    getId(): number;
    getType():'CAR' | 'DRIVER';
}