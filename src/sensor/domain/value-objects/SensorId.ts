export class SensorId {
    private constructor(readonly value: string) {
    }

    static create(raw: string) {
        if (!/^[\w-]{8,}$/.test(raw)) throw new Error('Invalid SensorId');
        return new SensorId(raw);
    }
}