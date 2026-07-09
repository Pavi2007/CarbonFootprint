package com.carbonfootprint.carbonfootprint.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardTrendResponse {

    private String time;
    private Double emission;

}