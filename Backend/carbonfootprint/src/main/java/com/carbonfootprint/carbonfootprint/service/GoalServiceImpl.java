package com.carbonfootprint.carbonfootprint.service;

import com.carbonfootprint.carbonfootprint.dto.*;
import com.carbonfootprint.carbonfootprint.entity.Activity;
import com.carbonfootprint.carbonfootprint.entity.Goal;
import com.carbonfootprint.carbonfootprint.entity.User;
import com.carbonfootprint.carbonfootprint.enums.GoalStatus;
import com.carbonfootprint.carbonfootprint.enums.NotificationType;
import com.carbonfootprint.carbonfootprint.repository.ActivityRepository;
import com.carbonfootprint.carbonfootprint.repository.GoalRepository;
import com.carbonfootprint.carbonfootprint.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GoalServiceImpl implements GoalService {

    private final GoalRepository goalRepository;
    private final UserRepository userRepository;
    private final ActivityRepository activityRepository;
    private final NotificationService notificationService;
    private final BadgeService badgeService;
    private User getLoggedInUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }

    private GoalResponse mapToResponse(Goal goal) {

        GoalResponse response = new GoalResponse();

        response.setId(goal.getId());
        response.setGoalName(goal.getGoalName());
        response.setTargetEmission(goal.getTargetEmission());
        response.setTargetReductionPercentage(goal.getTargetReductionPercentage());
        response.setStartDate(goal.getStartDate());
        response.setEndDate(goal.getEndDate());
        response.setStatus(goal.getStatus());
        response.setAchievedEmission(goal.getAchievedEmission());
        response.setProgressPercentage(goal.getProgressPercentage());
        response.setCompletedDate(goal.getCompletedDate());

        return response;
    }

    @Override
    public GoalResponse createGoal(GoalRequest request) {

        User user = getLoggedInUser();

        if (request.getStartDate().isBefore(LocalDate.now())) {
            throw new RuntimeException("Start Date cannot be in the past.");
        }

        if (request.getEndDate().isBefore(request.getStartDate())) {
            throw new RuntimeException("End Date must be after Start Date.");
        }

        Goal goal = new Goal();

        goal.setGoalName(request.getGoalName());
        goal.setTargetEmission(request.getTargetEmission());
        goal.setTargetReductionPercentage(
                request.getTargetReductionPercentage());

        goal.setStartDate(request.getStartDate());
        goal.setEndDate(request.getEndDate());

        goal.setStatus(GoalStatus.ACTIVE);

        goal.setCreatedAt(LocalDate.now());

        goal.setAchievedEmission(0.0);

        goal.setProgressPercentage(0.0);

        goal.setNotificationSent(false);

        goal.setUser(user);

        goalRepository.save(goal);

        return mapToResponse(goal);
    }

    @Override
    public GoalResponse getGoalById(Long id) {

        User user = getLoggedInUser();

        Goal goal = goalRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Goal not found"));

        if (!goal.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        return mapToResponse(goal);
    }

    @Override
    public void deleteGoal(Long id) {

        User user = getLoggedInUser();

        Goal goal = goalRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Goal not found"));

        if (!goal.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        goalRepository.delete(goal);
    }

    @Override
    public List<GoalResponse> getAllGoals() {

        User user = getLoggedInUser();

        return goalRepository
                .findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<GoalResponse> getActiveGoals() {

        User user = getLoggedInUser();

        return goalRepository
                .findByUserAndStatusOrderByCreatedAtDesc(
                        user,
                        GoalStatus.ACTIVE)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<GoalResponse> getGoalHistory() {

        User user = getLoggedInUser();

        return goalRepository.findByUser(user)
                .stream()
                .filter(goal ->
                        goal.getStatus() == GoalStatus.COMPLETED ||
                                goal.getStatus() == GoalStatus.FAILED)
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public GoalResponse updateGoal(Long id, GoalRequest request) {

        User user = getLoggedInUser();

        Goal goal = goalRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Goal not found"));

        if (!goal.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        if (goal.getStatus() != GoalStatus.ACTIVE) {
            throw new RuntimeException(
                    "Only active goals can be edited.");
        }

        if (request.getStartDate().isAfter(request.getEndDate())) {
            throw new RuntimeException(
                    "Start Date must be before End Date.");
        }

        goal.setGoalName(request.getGoalName());
        goal.setTargetEmission(request.getTargetEmission());
        goal.setTargetReductionPercentage(
                request.getTargetReductionPercentage());

        goal.setStartDate(request.getStartDate());
        goal.setEndDate(request.getEndDate());

        goalRepository.save(goal);

        return mapToResponse(goal);
    }

    private void updateGoalStatus(Goal goal, double currentEmission) {

        if (goal.getStatus() != GoalStatus.ACTIVE) {
            return;
        }

        goal.setAchievedEmission(currentEmission);

        /*
         * FAILED
         * Emission exceeded target
         */

        if (currentEmission > goal.getTargetEmission()) {

            goal.setStatus(GoalStatus.FAILED);

            goal.setCompletedDate(LocalDate.now());

            goalRepository.save(goal);

            notificationService.createNotification(
                    goal.getUser(),
                    "⚠ Goal Failed",
                    "Your carbon emission exceeded the target.",
                    NotificationType.WARNING
            );

            return;
        }
        if (goal.getStatus() == GoalStatus.ACTIVE &&
                ChronoUnit.DAYS.between(LocalDate.now(), goal.getEndDate()) == 1) {

            notificationService.createNotification(
                    goal.getUser(),
                    "⏰ Goal Ending Tomorrow",
                    "Your goal \"" + goal.getGoalName() +
                            "\" will end tomorrow. Keep tracking your emissions!",
                    NotificationType.INFO
            );
        }

        /*
         * COMPLETED
         * End date reached
         * AND target maintained
         */

        if ((LocalDate.now().isEqual(goal.getEndDate())
                || LocalDate.now().isAfter(goal.getEndDate()))
                && currentEmission <= goal.getTargetEmission()) {

            goal.setStatus(GoalStatus.COMPLETED);

            goal.setCompletedDate(LocalDate.now());

            goalRepository.save(goal);

            badgeService.checkGoalBadges(goal.getUser());

            notificationService.createNotification(
                    goal.getUser(),
                    "🎉 Goal Completed",
                    "Congratulations! You achieved your goal.",
                    NotificationType.SUCCESS
            );

            return;
        }

        /*
         * ACTIVE
         */

        goal.setStatus(GoalStatus.ACTIVE);

        goalRepository.save(goal);

    }

    @Override
    public GoalSummaryResponse getGoalSummary() {

        User user = getLoggedInUser();

        List<Goal> goals =
                goalRepository.findByUser(user);

        GoalSummaryResponse response =
                new GoalSummaryResponse();

        response.setTotalGoals(goals.size());

        response.setActiveGoals(

                goals.stream()
                        .filter(g ->
                                g.getStatus() ==
                                        GoalStatus.ACTIVE)
                        .count()

        );

        response.setCompletedGoals(

                goals.stream()
                        .filter(g ->
                                g.getStatus() ==
                                        GoalStatus.COMPLETED)
                        .count()

        );

        response.setFailedGoals(

                goals.stream()
                        .filter(g ->
                                g.getStatus() ==
                                        GoalStatus.FAILED)
                        .count()

        );

        return response;
    }

    @Override
    public GoalProgressResponse getGoalProgress(Long goalId) {

        User user = getLoggedInUser();

        Goal goal = goalRepository.findById(goalId)
                .orElseThrow(() ->
                        new RuntimeException("Goal not found"));

        if (!goal.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        List<Activity> activities =
                activityRepository.findByUserAndActivityDateBetween(
                        user,
                        goal.getStartDate(),
                        goal.getEndDate()
                );

        double currentEmission = activities.stream()
                .mapToDouble(Activity::getEmission)
                .sum();

        // Update goal status
        updateGoalStatus(goal, currentEmission);

        double targetEmission = goal.getTargetEmission();

        double remainingEmission =
                Math.max(targetEmission - currentEmission, 0);

        // Progress (% of target used)
        double progressPercentage = 0;

        if (targetEmission > 0) {

            progressPercentage =
                    (currentEmission / targetEmission) * 100;

            if (progressPercentage > 100) {
                progressPercentage = 100;
            }

        }

        goal.setAchievedEmission(currentEmission);
        goal.setProgressPercentage(progressPercentage);

        goalRepository.save(goal);

        long daysRemaining =
                ChronoUnit.DAYS.between(
                        LocalDate.now(),
                        goal.getEndDate());

        if (daysRemaining < 0) {
            daysRemaining = 0;
        }

        GoalProgressResponse response =
                new GoalProgressResponse();

        response.setGoalId(goal.getId());

        response.setGoalName(goal.getGoalName());

        response.setTargetEmission(targetEmission);

        response.setCurrentEmission(currentEmission);

        response.setRemainingEmission(remainingEmission);

        response.setProgressPercentage(progressPercentage);

        response.setGoalStatus(goal.getStatus());

        response.setDaysRemaining(daysRemaining);

        response.setGoalAchieved(
                currentEmission <= targetEmission);

        return response;
    }
}