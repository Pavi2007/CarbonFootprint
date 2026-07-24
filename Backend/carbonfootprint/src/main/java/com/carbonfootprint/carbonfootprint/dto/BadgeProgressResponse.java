package com.carbonfootprint.carbonfootprint.dto;

import com.carbonfootprint.carbonfootprint.enums.BadgeLevel;
import com.carbonfootprint.carbonfootprint.enums.BadgeType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BadgeProgressResponse {

    private BadgeType badgeType;

    private BadgeLevel currentLevel;

    private int currentProgress;

    private int targetProgress;

    private BadgeLevel nextLevel;

    private String description;
}