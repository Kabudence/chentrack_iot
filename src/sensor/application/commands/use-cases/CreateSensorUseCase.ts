import { CreateSensorDTO } from "../dto/CreateSensorDTO";
import {SensorRepository} from "../../../domain/repository/SensorRepository";
import {SensorFactory} from "../../../domain/services/factory/SensorFactory";

export class CreateSensorUseCase {
    constructor(private sensorRepo: SensorRepository) {}

    async execute(dto: CreateSensorDTO) {
        // Aquí traduces el DTO a tu entidad/VO
        const sensor = SensorFactory.createFromDto(dto); // implementa este método si quieres
        return this.sensorRepo.save(sensor);
    }
}
