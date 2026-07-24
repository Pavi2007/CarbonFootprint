package com.carbonfootprint.carbonfootprint.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EmissionFactorResponse {

    private Long id;

    private String activityType;

    private String category;

    private Double factor;

}