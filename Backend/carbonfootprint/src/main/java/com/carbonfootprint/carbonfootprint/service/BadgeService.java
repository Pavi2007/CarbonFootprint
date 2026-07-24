package com.carbonfootprint.carbonfootprint.service;

import com.carbonfootprint.carbonfootprint.dto.BadgeCollectionResponse;
import com.carbonfootprint.carbonfootprint.dto.BadgeProgressResponse;
import com.carbonfootprint.carbonfootprint.dto.HeatmapResponse;
import com.carbonfootprint.carbonfootprint.entity.User;

import java.util.List;

public interface BadgeService {

    void updateLoginStreak(User user);
    void checkGoalBadges(User user);

    void checkGlobalRankBadge(User user);

    List<BadgeProgressResponse> getBadgeProgress();

    List<BadgeCollectionResponse> getBadgeCollection();

    List<HeatmapResponse> getHeatmap();
}