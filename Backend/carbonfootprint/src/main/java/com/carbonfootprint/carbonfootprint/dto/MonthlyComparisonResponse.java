package com.carbonfootprint.carbonfootprint.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MonthlyComparisonResponse {

    private Double currentMonth;

    private Double previousMonth;

    private Double difference;

    private Double percentage;

}