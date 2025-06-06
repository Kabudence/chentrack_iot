import { ValueValidationStrategy } from "./ValueValidationStrategy";
import { Sensor } from "../../entities/Sensor";
import { ReadingStatus } from "../../value-objects/ReadingStatus";
import {GasSensor} from "../../entities/GasSensor";
import {GasType} from "../../value-objects/GasType";
import {GPSSensor} from "../../entities/GPSSensor";

export class CarSensorValidation implements ValueValidationStrategy {
    validateLevelSensor(sensor: Sensor): ReadingStatus {
        // Liquid/fuel level (%)
        if (sensor.value < 5) return ReadingStatus.VERY_LOW;      // Tank almost empty, operational risk
        if (sensor.value < 20) return ReadingStatus.LOW;          // Low level, warn to refuel
        if (sensor.value > 98) return ReadingStatus.VERY_HIGH;    // Overfilled, possible spill
        if (sensor.value > 90) return ReadingStatus.HIGH;         // High level, near maximum
        return ReadingStatus.NORMAL;                              // 20 %–90 %: adequate level
    }

    validateMotionSensor(sensor: Sensor): ReadingStatus {
        // Longitudinal or transverse acceleration (m/s²)
        if (sensor.value < -6) return ReadingStatus.VERY_LOW;     // Emergency braking or severe crash (negative)
        if (sensor.value < -3) return ReadingStatus.LOW;          // Hard braking (negative)
        if (sensor.value > 6) return ReadingStatus.VERY_HIGH;     // Extreme acceleration/crash (positive)
        if (sensor.value > 3) return ReadingStatus.HIGH;          // Hard acceleration (positive)
        return ReadingStatus.NORMAL;                              // –3 to +3 m/s²: safe driving
    }

    validatePressureSensor(sensor: Sensor): ReadingStatus {
        // Fuel tank pressure (psi)
        if (sensor.value < 15) return ReadingStatus.VERY_LOW;     // Danger: nearly empty or severe leak
        if (sensor.value < 30) return ReadingStatus.LOW;          // Low: possible minor leak or issue
        if (sensor.value > 100) return ReadingStatus.VERY_HIGH;   // Imminent explosion, critical risk
        if (sensor.value > 80) return ReadingStatus.HIGH;         // Alert: high pressure, possible over-pressure
        return ReadingStatus.NORMAL;                              // 30–80 psi: safe
    }

    validateGasSensor(sensor: GasSensor): ReadingStatus {
        const value = sensor.value;
        const type = sensor.gasType;

        // Example: Thresholds based on common safety standards for each gas type
        switch (type) {
            case GasType.LPG:
            case GasType.CNG:
            case GasType.LNG:
                // For LPG/CNG/LNG: values are in ppm (parts per million)
                if (value > 2000) return ReadingStatus.VERY_HIGH; // Extremely dangerous, explosion risk
                if (value > 1000) return ReadingStatus.HIGH;      // Danger, evacuate area
                if (value > 500)  return ReadingStatus.LOW;       // Early leak warning
                return ReadingStatus.NORMAL;                      // Safe range
            case GasType.CO:
                // For CO: values are in ppm, much lower thresholds (toxic for humans)
                if (value > 400) return ReadingStatus.VERY_HIGH;  // Immediate health hazard
                if (value > 100) return ReadingStatus.HIGH;       // Dangerous: CO poisoning risk
                if (value > 35)  return ReadingStatus.LOW;        // Above recommended exposure
                return ReadingStatus.NORMAL;                      // Safe for humans
            default:
                // If gas type is unknown, treat as normal, but ideally should be handled as an error.
                return ReadingStatus.NORMAL;
        }
    }

    validateTemperatureSensor(sensor: Sensor): ReadingStatus {
        // Cabin/load temperature (°C)
        if (sensor.value < 0) return ReadingStatus.VERY_LOW;      // Extreme risk: freezing, severe damage
        if (sensor.value < 10) return ReadingStatus.LOW;          // Risk: too cold for normal ope
        if (sensor.value > 60) return ReadingStatus.VERY_HIGH;    // Extreme risk: fire, component damage
        if (sensor.value > 40) return ReadingStatus.HIGH;         // Alert: excessive heat for cargo/electronics
        return ReadingStatus.NORMAL;                              // 10 °C–40 °C: safe operation
    }

    validateGPSSensor(sensor: GPSSensor): ReadingStatus {
        // TODO: implement GPS sensor validation rules
        return ReadingStatus.NORMAL;
    }
}
