package com.carbonfootprint.carbonfootprint.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TrendSummaryResponse {

    private String bestDay;
    private String worstDay;
    private Double averagePerDay;
    private Double monthlyTotal;

}
