package com.carbonfootprint.carbonfootprint.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LeaderboardResponse {

    private Integer rank;

    private String username;

    private Double totalEmission;

    private Integer loginStreak;

    private Long activityCount;

    private Long completedGoals;

    private Integer score;

    private Boolean currentUser;

}