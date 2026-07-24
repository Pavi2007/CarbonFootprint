package com.carbonfootprint.carbonfootprint.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class GoalRequest {

    private String goalName;

    private Double targetEmission;

    private Double targetReductionPercentage;

    private LocalDate startDate;

    private LocalDate endDate;

}
