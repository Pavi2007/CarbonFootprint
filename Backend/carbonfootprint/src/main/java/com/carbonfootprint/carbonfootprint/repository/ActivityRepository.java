package com.carbonfootprint.carbonfootprint.repository;

import com.carbonfootprint.carbonfootprint.entity.Activity;
import com.carbonfootprint.carbonfootprint.entity.User;
import com.carbonfootprint.carbonfootprint.enums.ActivityType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

    // Existing methods (DO NOT DELETE)

    List<Activity> findByUser(User user);

    List<Activity> findByUserOrderByActivityDateDesc(User user);

    // Search methods

    List<Activity> findByActivityDate(LocalDate activityDate);

    List<Activity> findByActivityDateBetween(
            LocalDate startDate,
            LocalDate endDate
    );

    List<Activity> findByCategory(String category);

    List<Activity> findByActivityType(ActivityType activityType);

    List<Activity> findByCategoryAndActivityType(
            String category,
            ActivityType activityType
    );

    List<Activity> findByCategoryAndActivityDateBetween(
            String category,
            LocalDate startDate,
            LocalDate endDate
    );

    List<Activity> findByActivityTypeAndActivityDateBetween(
            ActivityType activityType,
            LocalDate startDate,
            LocalDate endDate
    );

    List<Activity> findByCategoryAndActivityTypeAndActivityDateBetween(
            String category,
            ActivityType activityType,
            LocalDate startDate,
            LocalDate endDate
    );
    List<Activity> findByUserAndActivityDateBetween(
            User user,
            LocalDate startDate,
            LocalDate endDate
    );
    @Query("""
    SELECT COALESCE(SUM(a.emission), 0)
    FROM Activity a
    WHERE a.user = :user
    AND YEAR(a.activityDate) = :year
    AND MONTH(a.activityDate) = :month
    """)
    Double getMonthlyEmission(
            @Param("user") User user,
            @Param("year") int year,
            @Param("month") int month
    );

}