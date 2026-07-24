package com.carbonfootprint.carbonfootprint.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ActivitySearchResponse {

    private long totalActivities;

    private double totalEmission;

    private long activeUsers;

    private List<ActivityAdminResponse> activities;

}