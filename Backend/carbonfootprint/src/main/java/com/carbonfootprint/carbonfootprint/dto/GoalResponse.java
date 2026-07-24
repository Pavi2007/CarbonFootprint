package com.carbonfootprint.carbonfootprint.dto;

import com.carbonfootprint.carbonfootprint.enums.GoalStatus;
import lombok.Data;

import java.time.LocalDate;

@Data
public class GoalResponse {

    private Long id;

    private String goalName;

    private Double targetEmission;

    private Double targetReductionPercentage;

    private LocalDate startDate;

    private LocalDate endDate;

    private GoalStatus status;

    private Double achievedEmission;

    private Double progressPercentage;

    private LocalDate completedDate;

}
