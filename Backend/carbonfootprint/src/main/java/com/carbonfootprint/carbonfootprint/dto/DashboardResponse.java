package com.carbonfootprint.carbonfootprint.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {

    private Long totalActivities;

    private Double totalEmission;

    private Double carEmission;

    private Double busEmission;

    private Double trainEmission;

    private Double flightEmission;

    private Double electricityEmission;

    private Double foodEmission;

}