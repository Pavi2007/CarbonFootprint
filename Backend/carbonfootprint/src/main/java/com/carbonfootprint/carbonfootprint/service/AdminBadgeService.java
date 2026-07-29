package com.carbonfootprint.carbonfootprint.service;

import com.carbonfootprint.carbonfootprint.dto.admin.BadgeRequest;
import com.carbonfootprint.carbonfootprint.dto.admin.BadgeResponse;

import java.util.List;

public interface AdminBadgeService {

    List<BadgeResponse> getAllBadges();

    BadgeResponse getBadgeById(Long id);

    BadgeResponse createBadge(BadgeRequest request);

    BadgeResponse updateBadge(Long id, BadgeRequest request);

    void deleteBadge(Long id);
}