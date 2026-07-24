package com.carbonfootprint.carbonfootprint.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActivityAdminResponse {

    private Long id;

    private String userName;

    private String email;

    private String category;

    private String activityType;

    private Double value;

    private String unit;

    private Double emission;

    private LocalDate activityDate;

}