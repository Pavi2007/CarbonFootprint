package com.carbonfootprint.carbonfootprint.service;

import com.carbonfootprint.carbonfootprint.dto.admin.*;
import com.carbonfootprint.carbonfootprint.entity.Activity;
import com.carbonfootprint.carbonfootprint.entity.User;
import com.carbonfootprint.carbonfootprint.enums.ActivityType;
import com.carbonfootprint.carbonfootprint.enums.Role;
import com.carbonfootprint.carbonfootprint.repository.ActivityRepository;
import com.carbonfootprint.carbonfootprint.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Month;
import java.time.temporal.WeekFields;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final ActivityRepository activityRepository;

    // ================= DASHBOARD =================

    public AdminDashboardResponse getDashboard() {

        long totalUsers = userRepository.count();

        long totalActivities = activityRepository.count();

        double totalEmission = activityRepository.findAll()
                .stream()
                .mapToDouble(Activity::getEmission)
                .sum();

        long activeUsers = activityRepository.findAll()
                .stream()
                .filter(a -> a.getActivityDate().equals(LocalDate.now()))
                .map(a -> a.getUser().getId())
                .distinct()
                .count();

        return new AdminDashboardResponse(
                totalUsers,
                totalActivities,
                totalEmission,
                activeUsers
        );
    }

    // ================= WEEK TREND =================

    public List<TrendResponse> getWeeklyTrend() {

        WeekFields weekFields = WeekFields.ISO;

        Map<String, Double> map = activityRepository.findAll()

                .stream()

                .collect(Collectors.groupingBy(

                        a -> "Week " + a.getActivityDate().get(weekFields.weekOfWeekBasedYear()),

                        Collectors.summingDouble(Activity::getEmission)

                ));

        return map.entrySet()

                .stream()

                .map(e -> new TrendResponse(e.getKey(), e.getValue()))

                .toList();

    }

    // ================= MONTH TREND =================

    public List<TrendResponse> getMonthlyTrend() {

        Map<String, Double> map = activityRepository.findAll()

                .stream()

                .collect(Collectors.groupingBy(

                        a -> a.getActivityDate().getMonth().name(),

                        Collectors.summingDouble(Activity::getEmission)

                ));

        return Arrays.stream(Month.values())

                .map(month -> new TrendResponse(

                        month.name(),

                        map.getOrDefault(month.name(), 0.0)

                ))

                .toList();

    }

    // ================= YEAR TREND =================

    public List<TrendResponse> getYearlyTrend() {

        Map<String, Double> map = activityRepository.findAll()

                .stream()

                .collect(Collectors.groupingBy(

                        a -> String.valueOf(a.getActivityDate().getYear()),

                        Collectors.summingDouble(Activity::getEmission)

                ));

        return map.entrySet()

                .stream()

                .sorted(Map.Entry.comparingByKey())

                .map(e -> new TrendResponse(e.getKey(), e.getValue()))

                .toList();

    }

    // ================= PIE CHART =================

    public List<CategoryBreakdownResponse> getBreakdown() {

        Map<String, Double> categoryMap = new HashMap<>();

        List<Activity> activities = activityRepository.findAll();

        for (Activity activity : activities) {

            String activityCategory = activity.getCategory().toUpperCase();
            String mainCategory;

            switch (activityCategory) {

                // ---------- TRANSPORT ----------
                case "BIKE":
                case "BUS":
                case "TRAIN":
                case "CAR":
                case "FLIGHT":
                    mainCategory = "Transport";
                    break;

                // ---------- ELECTRICITY ----------
                case "HOME":
                case "HOSTEL":
                case "ELECTRICITY":
                case "BURNING":
                    mainCategory = "Electricity";
                    break;

                // ---------- FOOD ----------
                case "VEGETARIAN":
                case "NON_VEGETARIAN":
                case "FOOD":
                    mainCategory = "Food";
                    break;

                // ---------- SHOPPING ----------
                case "CLOTHING":
                case "SHOPPING":
                    mainCategory = "Shopping";
                    break;

                default:
                    mainCategory = "Others";
            }

            categoryMap.merge(
                    mainCategory,
                    activity.getEmission(),
                    Double::sum
            );
        }

        return categoryMap.entrySet()
                .stream()
                .map(entry -> new CategoryBreakdownResponse(
                        entry.getKey(),
                        entry.getValue()
                ))
                .toList();
    }
    public List<UserResponse> getAllUsers() {

        return userRepository.findAll()

                .stream()

                .map(user -> new UserResponse(

                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getPhoneNumber(),
                        user.getAge(),
                        user.getGender(),
                        user.getRole()

                ))

                .toList();

    }

    public void deleteUser(Long id) {

        User user = userRepository.findById(id)

                .orElseThrow(() -> new RuntimeException("User not found"));

        if(user.getRole() == Role.ADMIN){

            throw new RuntimeException("Admin cannot be deleted");

        }

        userRepository.delete(user);

    }
    public List<ActivityAdminResponse> getAllActivities() {

        return activityRepository.findAll()

                .stream()

                .map(activity -> new ActivityAdminResponse(

                        activity.getId(),

                        activity.getUser().getName(),

                        activity.getUser().getEmail(),

                        activity.getCategory(),

                        activity.getActivityType().toString(),

                        activity.getValue(),

                        activity.getUnit(),

                        activity.getEmission(),

                        activity.getActivityDate()

                ))

                .toList();
    }
    public ActivitySearchResponse searchActivities(

            String category,

            String activityType,

            LocalDate startDate,

            LocalDate endDate

    ){
        if (category != null && category.isBlank()) {
            category = null;
        }

        if (activityType != null && activityType.isBlank()) {
            activityType = null;
        }
        ActivityType type = null;

        if(activityType != null && !activityType.isBlank()){

            type = ActivityType.valueOf(activityType.toUpperCase());

        }

        List<Activity> activities;

        if (category != null && type != null && startDate != null && endDate != null) {

            activities = activityRepository
                    .findByCategoryAndActivityTypeAndActivityDateBetween(
                            category,
                            type,
                            startDate,
                            endDate
                    );

        }

        else if (category != null && type != null) {

            activities = activityRepository
                    .findByCategoryAndActivityType(
                            category,
                            type
                    );

        }

        else if (category != null && startDate != null && endDate != null) {

            activities = activityRepository
                    .findByCategoryAndActivityDateBetween(
                            category,
                            startDate,
                            endDate
                    );

        }

        else if (type != null && startDate != null && endDate != null) {

            activities = activityRepository
                    .findByActivityTypeAndActivityDateBetween(
                            type,
                            startDate,
                            endDate
                    );

        }

        else if (startDate != null && endDate != null) {

            activities = activityRepository
                    .findByActivityDateBetween(
                            startDate,
                            endDate
                    );

        }

        else if (startDate != null) {

            activities = activityRepository
                    .findByActivityDate(startDate);

        }

        else if (endDate != null) {

            activities = activityRepository
                    .findByActivityDate(endDate);

        }

        else if (category != null) {

            activities = activityRepository
                    .findByCategory(category);

        }

        else if (type != null) {

            activities = activityRepository
                    .findByActivityType(type);

        }

        else {

            activities = activityRepository.findAll();

        }

        double totalEmission=activities.stream()

                .mapToDouble(Activity::getEmission)

                .sum();

        long totalActivities=activities.size();

        long activeUsers=activities.stream()

                .map(a->a.getUser().getId())

                .distinct()

                .count();

        List<ActivityAdminResponse> list=

                activities.stream()

                        .map(a->new ActivityAdminResponse(

                                a.getId(),

                                a.getUser().getName(),

                                a.getUser().getEmail(),

                                a.getCategory(),

                                a.getActivityType().toString(),

                                a.getValue(),

                                a.getUnit(),

                                a.getEmission(),

                                a.getActivityDate()

                        ))

                        .toList();

        return new ActivitySearchResponse(

                totalActivities,

                totalEmission,

                activeUsers,

                list

        );

    }

}