package com.carbonfootprint.carbonfootprint.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrganizationResponse {

    private String organizationName;
    private String location;
    private long totalUsers;
    private long totalActivities;
    private double totalEmission;
    private double averageCarbonScore;
    private String topPerformer;
    private String highestEmissionCategory;

}