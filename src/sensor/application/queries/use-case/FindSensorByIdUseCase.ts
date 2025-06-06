import {SensorRepository} from "../../../domain/repository/SensorRepository";
import {FindSensorByIdDTO} from "../dto/FindSensorByIdDTO";

export class FindSensorByIdUseCase {
    constructor(private sensorRepo: SensorRepository) {}

    async execute(dto: FindSensorByIdDTO) {
    return this.sensorRepo.findById(dto.id);
    }
}
