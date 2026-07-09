package com.carbonfootprint.carbonfootprint.dto;

import com.carbonfootprint.carbonfootprint.enums.ActivityType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActivityRequest {

    private ActivityType activityType;

    private Double value;

    private String unit;

    private String category;
    private LocalDate activityDate;
}