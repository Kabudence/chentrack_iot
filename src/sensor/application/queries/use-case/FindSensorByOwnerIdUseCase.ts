import {SensorRepository} from "../../../domain/repository/SensorRepository";
import {FindSensorByIdDTO} from "../dto/FindSensorByIdDTO";
import {FindSensorByOwnerIdDTO} from "../dto/FindSensorByOwnerIdDTO";

export class FindSensorByOwnerIdUseCase {
    constructor(private sensorRepo: SensorRepository) {}

    async execute(dto: FindSensorByOwnerIdDTO) {
        return this.sensorRepo.findById(dto.OwnerId);
    }
}
