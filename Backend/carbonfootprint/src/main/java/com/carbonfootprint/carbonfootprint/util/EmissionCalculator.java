package com.carbonfootprint.carbonfootprint.util;

import com.carbonfootprint.carbonfootprint.enums.ActivityType;
import org.springframework.stereotype.Component;

@Component
public class EmissionCalculator {

    public double calculateEmission(ActivityType type, Double value) {

        switch (type) {

            case CAR:
                return value * 0.17;

            case BUS:
                return value * 0.10;

            case TRAIN:
                return value * 0.05;

            case FLIGHT:
                return value * 0.25;

            case ELECTRICITY:
                return value * 0.82;

            case FOOD:
                return value * 2.50;

            default:
                return 0.0;
        }
    }
}
