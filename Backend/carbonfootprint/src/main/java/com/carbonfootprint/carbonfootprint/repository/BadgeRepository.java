package com.carbonfootprint.carbonfootprint.repository;

import com.carbonfootprint.carbonfootprint.entity.Badge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BadgeRepository extends JpaRepository<Badge, Long> {

    List<Badge> findByBadgeNameContainingIgnoreCase(String keyword);

}