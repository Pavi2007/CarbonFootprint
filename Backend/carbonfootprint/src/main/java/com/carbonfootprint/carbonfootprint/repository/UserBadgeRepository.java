package com.carbonfootprint.carbonfootprint.repository;

import com.carbonfootprint.carbonfootprint.entity.User;
import com.carbonfootprint.carbonfootprint.entity.UserBadge;
import com.carbonfootprint.carbonfootprint.enums.BadgeLevel;
import com.carbonfootprint.carbonfootprint.enums.BadgeType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserBadgeRepository extends JpaRepository<UserBadge, Long> {

    List<UserBadge> findByUser(User user);

    boolean existsByUserAndBadgeTypeAndBadgeLevel(
            User user,
            BadgeType badgeType,
            BadgeLevel badgeLevel
    );

}