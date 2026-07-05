package com.carbonfootprint.carbonfootprint.dto;

import com.carbonfootprint.carbonfootprint.enums.ActivityType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActivityResponse {

    private Long id;

    private ActivityType activityType;

    private Double value;

    private String unit;

    private Double emission;

    private LocalDate activityDate;

}