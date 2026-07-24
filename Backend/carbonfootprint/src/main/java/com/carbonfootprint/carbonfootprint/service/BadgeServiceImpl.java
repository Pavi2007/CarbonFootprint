package com.carbonfootprint.carbonfootprint.service;

import com.carbonfootprint.carbonfootprint.entity.Activity;
import com.carbonfootprint.carbonfootprint.entity.User;
import com.carbonfootprint.carbonfootprint.entity.UserBadge;
import com.carbonfootprint.carbonfootprint.enums.BadgeLevel;
import com.carbonfootprint.carbonfootprint.enums.BadgeType;
import com.carbonfootprint.carbonfootprint.enums.GoalStatus;
import com.carbonfootprint.carbonfootprint.repository.ActivityRepository;
import com.carbonfootprint.carbonfootprint.repository.GoalRepository;
import com.carbonfootprint.carbonfootprint.repository.UserBadgeRepository;
import com.carbonfootprint.carbonfootprint.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.carbonfootprint.carbonfootprint.dto.BadgeCollectionResponse;
import com.carbonfootprint.carbonfootprint.dto.BadgeProgressResponse;
import com.carbonfootprint.carbonfootprint.dto.HeatmapResponse;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;


@Service
@RequiredArgsConstructor
public class BadgeServiceImpl implements BadgeService {
    private final ActivityRepository activityRepository;
    private final UserRepository userRepository;
    private final UserBadgeRepository userBadgeRepository;
    private final GoalRepository goalRepository;
    @Override
    public void updateLoginStreak(User user) {

        LocalDate today = LocalDate.now();

        if(user.getLastLoginDate() == null){

            user.setLoginStreak(1);

        }

        else{

            long days = ChronoUnit.DAYS.between(
                    user.getLastLoginDate(),
                    today
            );

            if(days == 1){

                user.setLoginStreak(
                        user.getLoginStreak() + 1
                );

            }

            else if(days > 1){

                user.setLoginStreak(1);

            }

        }

        user.setLastLoginDate(today);

        userRepository.save(user);

        checkLoginBadges(user);

    }
    private User getLoggedInUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }

    private void checkLoginBadges(User user){

        int streak = user.getLoginStreak();

        if(streak >= 5){

            giveBadge(user,BadgeLevel.BRONZE);

        }

        if(streak >= 30){

            giveBadge(user,BadgeLevel.SILVER);

        }

        if(streak >= 100){

            giveBadge(user,BadgeLevel.GOLD);

        }

    }

    private void giveBadge(User user,BadgeLevel level){

        boolean exists =
                userBadgeRepository
                        .existsByUserAndBadgeTypeAndBadgeLevel(

                                user,

                                BadgeType.LOGIN_STREAK,

                                level

                        );

        if(exists){

            return;

        }

        UserBadge badge = new UserBadge();

        badge.setUser(user);

        badge.setBadgeType(BadgeType.LOGIN_STREAK);

        badge.setBadgeLevel(level);

        badge.setEarnedDate(LocalDate.now());

        userBadgeRepository.save(badge);

    }
    @Override
    public void checkGoalBadges(User user) {

        long completedGoals =
                goalRepository.countByUserAndStatus(
                        user,
                        GoalStatus.COMPLETED
                );

        if(completedGoals >= 5){

            giveGoalBadge(user, BadgeLevel.BRONZE);

        }

        if(completedGoals >= 15){

            giveGoalBadge(user, BadgeLevel.SILVER);

        }

        if(completedGoals >= 30){

            giveGoalBadge(user, BadgeLevel.GOLD);

        }

    }
    private void giveGoalBadge(User user, BadgeLevel level){

        boolean exists =
                userBadgeRepository
                        .existsByUserAndBadgeTypeAndBadgeLevel(
                                user,
                                BadgeType.GOAL_COMPLETION,
                                level
                        );

        if(exists){
            return;
        }

        UserBadge badge = new UserBadge();

        badge.setUser(user);

        badge.setBadgeType(BadgeType.GOAL_COMPLETION);

        badge.setBadgeLevel(level);

        badge.setEarnedDate(LocalDate.now());

        userBadgeRepository.save(badge);

    }
    @Override
    public void checkGlobalRankBadge(User user) {

        LocalDate today = LocalDate.now();

        int year = today.getYear();
        int month = today.getMonthValue();

        Double currentEmission =
                activityRepository.getMonthlyEmission(user, year, month);

        if (currentEmission == null) {
            currentEmission = 0.0;
        }

        List<User> users = userRepository.findAll();

        int rank = 1;

        for (User u : users) {

            Double emission =
                    activityRepository.getMonthlyEmission(u, year, month);

            if (emission == null) {
                emission = 0.0;
            }

            if (emission < currentEmission) {
                rank++;
            }
        }

        if (rank <= 500) {
            giveGlobalRankBadge(user, BadgeLevel.BRONZE);
        }

        if (rank <= 100) {
            giveGlobalRankBadge(user, BadgeLevel.SILVER);
        }

        if (rank <= 25) {
            giveGlobalRankBadge(user, BadgeLevel.GOLD);
        }

    }
    private void giveGlobalRankBadge(User user, BadgeLevel level) {

        boolean exists =
                userBadgeRepository.existsByUserAndBadgeTypeAndBadgeLevel(
                        user,
                        BadgeType.GLOBAL_RANK,
                        level
                );

        if (exists) {
            return;
        }

        UserBadge badge = new UserBadge();

        badge.setUser(user);
        badge.setBadgeType(BadgeType.GLOBAL_RANK);
        badge.setBadgeLevel(level);
        badge.setEarnedDate(LocalDate.now());

        userBadgeRepository.save(badge);

    }
    @Override
    public List<BadgeCollectionResponse> getBadgeCollection() {

        User user = getLoggedInUser();

        return userBadgeRepository.findByUser(user)
                .stream()
                .map(badge -> new BadgeCollectionResponse(
                        badge.getBadgeType(),
                        badge.getBadgeLevel(),
                        badge.getEarnedDate()
                ))
                .toList();
    }
    @Override
    public List<HeatmapResponse> getHeatmap() {

        User user = getLoggedInUser();

        List<Activity> activities =
                activityRepository.findByUser(user);

        Map<LocalDate, Double> map = new TreeMap<>();

        for (Activity activity : activities) {

            map.put(
                    activity.getActivityDate(),
                    map.getOrDefault(
                            activity.getActivityDate(),
                            0.0
                    ) + activity.getEmission()
            );
        }

        return map.entrySet()
                .stream()
                .map(e -> new HeatmapResponse(
                        e.getKey(),
                        e.getValue()
                ))
                .toList();
    }
    @Override
    public List<BadgeProgressResponse> getBadgeProgress() {

        User user = getLoggedInUser();

        List<BadgeProgressResponse> response = new ArrayList<>();

        /* ---------- Login Streak ---------- */

        int streak = user.getLoginStreak();

        if (streak < 5) {

            response.add(new BadgeProgressResponse(
                    BadgeType.LOGIN_STREAK,
                    BadgeLevel.BRONZE,
                    streak,
                    5,
                    BadgeLevel.SILVER,
                    "Daily Login Streak"
            ));

        } else if (streak < 30) {

            response.add(new BadgeProgressResponse(
                    BadgeType.LOGIN_STREAK,
                    BadgeLevel.SILVER,
                    streak,
                    30,
                    BadgeLevel.GOLD,
                    "Daily Login Streak"
            ));

        } else {

            response.add(new BadgeProgressResponse(
                    BadgeType.LOGIN_STREAK,
                    BadgeLevel.GOLD,
                    streak,
                    100,
                    null,
                    "Daily Login Streak"
            ));

        }

        /* ---------- Goal Completion ---------- */

        long completed =
                goalRepository.countByUserAndStatus(
                        user,
                        GoalStatus.COMPLETED
                );

        if (completed < 5) {

            response.add(new BadgeProgressResponse(
                    BadgeType.GOAL_COMPLETION,
                    BadgeLevel.BRONZE,
                    (int) completed,
                    5,
                    BadgeLevel.SILVER,
                    "Goal Completion"
            ));

        } else if (completed < 15) {

            response.add(new BadgeProgressResponse(
                    BadgeType.GOAL_COMPLETION,
                    BadgeLevel.SILVER,
                    (int) completed,
                    15,
                    BadgeLevel.GOLD,
                    "Goal Completion"
            ));

        } else {

            response.add(new BadgeProgressResponse(
                    BadgeType.GOAL_COMPLETION,
                    BadgeLevel.GOLD,
                    (int) completed,
                    30,
                    null,
                    "Goal Completion"
            ));

        }

        return response;
    }


}