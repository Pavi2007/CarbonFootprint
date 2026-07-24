package com.carbonfootprint.carbonfootprint.dto;


import lombok.Data;

@Data
public class GoalSummaryResponse {

    private long totalGoals;

    private long activeGoals;

    private long completedGoals;

    private long failedGoals;

}