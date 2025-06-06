import {PrismaClient} from "@prisma/client/extension";
import {Sensor} from "../../domain/entities/Sensor";
import {GPSSensor} from "../../domain/entities/GPSSensor";
import {GasSensor} from "../../domain/entities/GasSensor";
import {SensorFactory} from "../../domain/services/factory/SensorFactory";

export class SensorPrismaRepository implements  SensorPrismaRepository {
    private prisma = new PrismaClient();


    async save(sensor: Sensor): Promise<Sensor> {
        const data: any = {
            sensorId: sensor.sensorId.value,
            name: sensor.name,
            type: sensor.type.sensorType,
            precisionValue: sensor.precisionValue,
            value: sensor.value,
            ownerId: sensor.ownerType.id,
            ownerType: sensor.ownerType.type,
            timestamp: sensor.timestamp,
            minRangeToRead: sensor.minRangeToRead,
            maxRangeValue: sensor.maxRangeValue,
        };

        if (sensor instanceof GPSSensor) {
            data.latitude = sensor.latitude;
            data.longitude = sensor.longitude;
        }
        if (sensor instanceof GasSensor) {
            data.gasType = sensor.gasType;
        }

        const saved = await this.prisma.sensor.create({ data });


        return SensorFactory.createFromPrisma(saved);
    }

    async findById(id: number): Promise<Sensor | null> {
        const found = await this.prisma.sensor.findUnique({ where: { id } });
        if (!found) return null;


        return SensorFactory.createFromPrisma(found);
    }
    async findAllByOwnerId(ownerId: number): Promise<Sensor[]> {
        const foundList = await this.prisma.sensor.findMany({
            where: { ownerId }
        });
        return foundList.map(saved => SensorFactory.createFromPrisma(saved));
    }



}