package com.carbonfootprint.carbonfootprint.service;

import com.carbonfootprint.carbonfootprint.dto.admin.BadgeRequest;
import com.carbonfootprint.carbonfootprint.dto.admin.BadgeResponse;
import com.carbonfootprint.carbonfootprint.entity.Badge;
import com.carbonfootprint.carbonfootprint.repository.BadgeRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminBadgeServiceImpl implements AdminBadgeService {

    private final BadgeRepository badgeRepository;

    @Override
    public List<BadgeResponse> getAllBadges() {

        return badgeRepository.findAll()
                .stream()
                .map(badge -> new BadgeResponse(
                        badge.getId(),
                        badge.getBadgeName(),
                        badge.getDescription(),
                        badge.getRequiredScore()
                ))
                .toList();
    }

    @Override
    public BadgeResponse getBadgeById(Long id) {

        Badge badge = badgeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Badge not found"));

        return new BadgeResponse(
                badge.getId(),
                badge.getBadgeName(),
                badge.getDescription(),
                badge.getRequiredScore()
        );
    }

    @Override
    public BadgeResponse createBadge(BadgeRequest request) {

        Badge badge = new Badge();

        badge.setBadgeName(request.getBadgeName());
        badge.setDescription(request.getDescription());
        badge.setRequiredScore(request.getRequiredScore());

        Badge saved = badgeRepository.save(badge);

        return new BadgeResponse(
                saved.getId(),
                saved.getBadgeName(),
                saved.getDescription(),
                saved.getRequiredScore()
        );
    }

    @Override
    public BadgeResponse updateBadge(Long id, BadgeRequest request) {

        Badge badge = badgeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Badge not found"));

        badge.setBadgeName(request.getBadgeName());
        badge.setDescription(request.getDescription());
        badge.setRequiredScore(request.getRequiredScore());

        Badge updated = badgeRepository.save(badge);

        return new BadgeResponse(
                updated.getId(),
                updated.getBadgeName(),
                updated.getDescription(),
                updated.getRequiredScore()
        );
    }

    @Override
    public void deleteBadge(Long id) {

        Badge badge = badgeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Badge not found"));

        badgeRepository.delete(badge);
    }
}