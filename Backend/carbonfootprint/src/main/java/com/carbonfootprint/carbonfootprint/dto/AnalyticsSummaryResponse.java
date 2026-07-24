package com.carbonfootprint.carbonfootprint.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnalyticsSummaryResponse {

    private String highestCategory;

    private Double highestEmission;

    private String lowestCategory;

    private Double lowestEmission;

    private Double averageEmission;

    private Integer carbonScore;
    private Double totalEmission;

}
