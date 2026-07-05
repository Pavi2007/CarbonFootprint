package com.carbonfootprint.carbonfootprint.dto;

import com.carbonfootprint.carbonfootprint.enums.ActivityType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActivityRequest {

    private ActivityType activityType;

    private Double value;

    private String unit;

}