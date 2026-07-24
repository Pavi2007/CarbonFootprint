package com.carbonfootprint.carbonfootprint.dto.admin;

import lombok.Data;

@Data
public class BadgeRequest {

    private String badgeName;

    private String description;

    private Integer requiredScore;

}