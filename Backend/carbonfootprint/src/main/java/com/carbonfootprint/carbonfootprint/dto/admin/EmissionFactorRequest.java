package com.carbonfootprint.carbonfootprint.dto.admin;

import lombok.Data;

@Data
public class EmissionFactorRequest {

    private String activityType;

    private String category;

    private Double factor;

}