package com.carbonfootprint.carbonfootprint.util;

import com.carbonfootprint.carbonfootprint.enums.ActivityType;
import org.springframework.stereotype.Component;

@Component
public class EmissionCalculator {

    public double calculateEmission(
            ActivityType type,
            String category,
            double value
    ) {

        switch (type) {

            case TRANSPORT:

                switch (category.toUpperCase()) {

                    case "CAR":
                        return value * 0.21;

                    case "BIKE":
                        return value * 0.08;

                    case "BUS":
                        return value * 0.10;

                    case "TRAIN":
                        return value * 0.04;

                    case "FLIGHT":
                        return value * 0.28;
                }
                break;

            case ELECTRICITY:
                return value * 0.85;

            case FOOD:

                switch (category.toUpperCase()) {

                    case "VEGETARIAN":
                        return value * 0.8;

                    case "NON_VEGETARIAN":
                        return value * 2.3;

                    case "VEGAN":
                        return value * 0.4;
                }
                break;

            case SHOPPING:

                switch (category.toUpperCase()) {

                    case "GROCERY":
                        return value * 0.10;

                    case "CLOTHING":
                        return value * 0.20;

                    case "ELECTRONICS":
                        return value * 0.50;

                    case "FURNITURE":
                        return value * 0.35;

                    default:
                        return value * 0.15;
                }
            case OTHERS:

                switch (category.toUpperCase()) {

                    case "BURNING":
                        return value * 2.5;

                    case "WASTE":
                        return value * 1.8;

                    case "OTHER":
                        return value * 1.0;

                    default:
                        return value * 1.5;
                }

            default:
                return 0;
        }

        return 0;
    }
}