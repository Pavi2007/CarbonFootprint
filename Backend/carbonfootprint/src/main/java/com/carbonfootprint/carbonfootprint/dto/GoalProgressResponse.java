package com.carbonfootprint.carbonfootprint.dto;

import com.carbonfootprint.carbonfootprint.enums.GoalStatus;
import lombok.Data;

@Data
public class GoalProgressResponse {

    private Long goalId;

    private String goalName;

    private Double targetEmission;

    private Double currentEmission;

    private Double remainingEmission;

    private Double progressPercentage;

    private GoalStatus goalStatus;

    private long daysRemaining;

    private boolean goalAchieved;

}