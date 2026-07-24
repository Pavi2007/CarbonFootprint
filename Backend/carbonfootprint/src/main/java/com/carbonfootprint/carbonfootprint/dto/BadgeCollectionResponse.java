package com.carbonfootprint.carbonfootprint.dto;

import com.carbonfootprint.carbonfootprint.enums.BadgeLevel;
import com.carbonfootprint.carbonfootprint.enums.BadgeType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BadgeCollectionResponse {

    private BadgeType badgeType;

    private BadgeLevel badgeLevel;

    private LocalDate earnedDate;

}