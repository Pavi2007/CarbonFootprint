package com.carbonfootprint.carbonfootprint.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReportResponse {

    private String userName;

    private long totalActivities;

    private double totalEmission;

}