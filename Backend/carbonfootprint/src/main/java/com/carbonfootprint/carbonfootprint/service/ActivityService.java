package com.carbonfootprint.carbonfootprint.service;

import com.carbonfootprint.carbonfootprint.dto.ActivityRequest;
import com.carbonfootprint.carbonfootprint.dto.ActivityResponse;
import com.carbonfootprint.carbonfootprint.entity.Activity;
import com.carbonfootprint.carbonfootprint.entity.User;
import com.carbonfootprint.carbonfootprint.enums.ActivityType;
import com.carbonfootprint.carbonfootprint.repository.ActivityRepository;
import com.carbonfootprint.carbonfootprint.repository.UserRepository;
import com.carbonfootprint.carbonfootprint.util.EmissionCalculator;
import com.carbonfootprint.carbonfootprint.enums.Category;import lombok.RequiredArgsConstructor;
import org.springframework.jmx.export.metadata.ManagedMetric;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import java.time.LocalDate;
import java.util.List;
import org.springframework.security.access.AccessDeniedException;

@Service
@RequiredArgsConstructor
public class ActivityService {
    private final BadgeService badgeService;
    private final GoalService goalService;
    private final ActivityRepository activityRepository;
    private final UserRepository userRepository;
    private final EmissionCalculator emissionCalculator;
    private User getLoggedInUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }
    // 👇 Add the method here
    public ActivityResponse addActivity(ActivityRequest request) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Activity activity = new Activity();
        activity.setActivityType(request.getActivityType());
        activity.setValue(request.getValue());
        activity.setUnit(request.getUnit());
        activity.setActivityDate(request.getActivityDate());
        activity.setCategory(request.getCategory());

        double emission;

        if (request.getActivityType() == ActivityType.OTHERS) {

            // For custom activities, no predefined emission factor
            emission = 0.0;

        } else {

            emission = emissionCalculator.calculateEmission(
                    request.getActivityType(),
                    request.getCategory(),
                    request.getValue()
            );

        }

        activity.setEmission(emission);

        activity.setEmission(emission);
        activity.setUser(user);
        // User will be added after JWT integration

        Activity savedActivity = activityRepository.save(activity);
        badgeService.checkGlobalRankBadge(user);

        goalService.getActiveGoals().forEach(goal -> {
            goalService.getGoalProgress(goal.getId());
        });
        return new ActivityResponse(
                savedActivity.getId(),
                savedActivity.getActivityType(),
                savedActivity.getCategory(),
                savedActivity.getValue(),
                savedActivity.getUnit(),
                savedActivity.getEmission(),
                savedActivity.getActivityDate()
        );
    }
    public List<ActivityResponse> getMyActivities() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Activity> activities = activityRepository.findByUser(user);
        return activities.stream()
                .map(activity -> new ActivityResponse(
                        activity.getId(),
                        activity.getActivityType(),
                        activity.getCategory(),
                        activity.getValue(),
                        activity.getUnit(),
                        activity.getEmission(),
                        activity.getActivityDate()
                ))
                .toList();
    }
    public ActivityResponse getActivityById(Long id) {

        User loggedInUser = getLoggedInUser();

        Activity activity = activityRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Activity not found"));

        if (!activity.getUser().getId().equals(loggedInUser.getId())) {

            System.out.println("Access Denied!");

            throw new AccessDeniedException("Access Denied");
        }
        return new ActivityResponse(
                activity.getId(),
                activity.getActivityType(),
                activity.getCategory(),
                activity.getValue(),
                activity.getUnit(),
                activity.getEmission(),
                activity.getActivityDate()
        );
    }

    public ActivityResponse updateActivity(Long id, ActivityRequest request) {

        Activity activity = activityRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Activity not found"));
        User loggedInUser = getLoggedInUser();

        if (!activity.getUser().getId().equals(loggedInUser.getId())) {
            throw new RuntimeException("Access Denied");
        }
        activity.setActivityType(request.getActivityType());
        activity.setValue(request.getValue());
        activity.setUnit(request.getUnit());
        activity.setCategory(request.getCategory());

        double emission = emissionCalculator.calculateEmission(
                request.getActivityType(),
                request.getCategory(),
                request.getValue()
        );

        activity.setEmission(emission);

        Activity updatedActivity = activityRepository.save(activity);
        badgeService.checkGlobalRankBadge(loggedInUser);
        goalService.getActiveGoals().forEach(goal -> {
            goalService.getGoalProgress(goal.getId());
        });

        return new ActivityResponse(
                updatedActivity.getId(),
                updatedActivity.getActivityType(),
                updatedActivity.getCategory(),
                updatedActivity.getValue(),
                updatedActivity.getUnit(),
                updatedActivity.getEmission(),
                updatedActivity.getActivityDate()
        );
    }
    public String deleteActivity(Long id) {

        Activity activity = activityRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Activity not found"));
        User loggedInUser = getLoggedInUser();

        if (!activity.getUser().getId().equals(loggedInUser.getId())) {
            throw new RuntimeException("Access Denied");
        }
        activityRepository.delete(activity);
        badgeService.checkGlobalRankBadge(loggedInUser);
        goalService.getActiveGoals().forEach(goal -> {
            goalService.getGoalProgress(goal.getId());
        });

        return "Activity Deleted Successfully";
    }
    public List<ActivityResponse> getHistory(

            String search,

            ActivityType activityType,

            Category category,

            LocalDate startDate,

            LocalDate endDate
    ) {

        User user = getLoggedInUser();

        List<Activity> activities = activityRepository.findByUser(user);

        return activities.stream()

                // Search
                .filter(a ->
                        search == null ||
                                search.isBlank() ||

                                a.getActivityType()
                                        .toString()
                                        .toLowerCase()
                                        .contains(search.toLowerCase())

                                ||

                                a.getCategory()
                                        .toString()
                                        .toLowerCase()
                                        .contains(search.toLowerCase())
                )

                // Activity Type
                .filter(a ->

                        activityType == null ||

                                a.getActivityType() == activityType

                )

                // Category
                .filter(a ->
                        category == null ||
                                a.getCategory().equalsIgnoreCase(category.name())
                )

                // Start Date
                .filter(a ->

                        startDate == null ||

                                !a.getActivityDate().isBefore(startDate)

                )

                // End Date
                .filter(a ->

                        endDate == null ||

                                !a.getActivityDate().isAfter(endDate)

                )

                .map(a ->

                        new ActivityResponse(

                                a.getId(),

                                a.getActivityType(),

                                a.getCategory(),

                                a.getValue(),

                                a.getUnit(),

                                a.getEmission(),

                                a.getActivityDate()

                        )

                )

                .toList();

    }


}