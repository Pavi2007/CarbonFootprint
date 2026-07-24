package com.carbonfootprint.carbonfootprint.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BadgeResponse {

    private Long id;

    private String badgeName;

    private String description;

    private Integer requiredScore;

}