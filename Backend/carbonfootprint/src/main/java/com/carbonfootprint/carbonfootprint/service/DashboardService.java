package com.carbonfootprint.carbonfootprint.service;

import com.carbonfootprint.carbonfootprint.dto.ActivityResponse;
import com.carbonfootprint.carbonfootprint.dto.DashboardResponse;
import com.carbonfootprint.carbonfootprint.dto.TrendResponse;
import com.carbonfootprint.carbonfootprint.entity.Activity;
import com.carbonfootprint.carbonfootprint.entity.User;
import com.carbonfootprint.carbonfootprint.repository.ActivityRepository;
import com.carbonfootprint.carbonfootprint.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.util.*;

import com.carbonfootprint.carbonfootprint.dto.DashboardTrendResponse;

import java.time.format.TextStyle;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ActivityRepository activityRepository;
    private final UserRepository userRepository;
    private User getLoggedInUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }


    public DashboardResponse getDashboard() {

        User user = getLoggedInUser();

        List<Activity> activities = activityRepository.findByUser(user);

        Long totalActivities = (long) activities.size();

        Double totalEmission = activities.stream()
                .mapToDouble(Activity::getEmission)
                .sum();

        double carEmission = 0;
        double busEmission = 0;
        double trainEmission = 0;
        double flightEmission = 0;
        double electricityEmission = 0;
        double foodEmission = 0;

        for (Activity activity : activities) {

            switch (activity.getActivityType()) {

                case CAR:
                    carEmission += activity.getEmission();
                    break;

                case BUS:
                    busEmission += activity.getEmission();
                    break;

                case TRAIN:
                    trainEmission += activity.getEmission();
                    break;

                case FLIGHT:
                    flightEmission += activity.getEmission();
                    break;

                case ELECTRICITY:
                    electricityEmission += activity.getEmission();
                    break;

                case FOOD:
                    foodEmission += activity.getEmission();
                    break;
            }
        }

        return new DashboardResponse(
                totalActivities,
                totalEmission,
                carEmission,
                busEmission,
                trainEmission,
                flightEmission,
                electricityEmission,
                foodEmission
        );
    }
    public List<ActivityResponse> getRecentActivities() {

        User user = getLoggedInUser();

        List<Activity> activities =
                activityRepository.findByUserOrderByActivityDateDesc(user);

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
    public List<DashboardTrendResponse> getMonthlyTrend() {

        User user = getLoggedInUser();

        List<Activity> activities =
                activityRepository.findByUser(user);

        Map<String, Double> monthMap = new TreeMap<>();

        for(Activity activity : activities){

            String month = activity.getActivityDate()
                    .getMonth()
                    .getDisplayName(TextStyle.SHORT, Locale.ENGLISH);

            monthMap.put(
                    month,
                    monthMap.getOrDefault(month,0.0)
                            + activity.getEmission()
            );

        }

        List<DashboardTrendResponse> response =
                new ArrayList<>();

        for(Map.Entry<String,Double> entry : monthMap.entrySet()){

            response.add(

                    new DashboardTrendResponse(

                            entry.getKey(),

                            entry.getValue()

                    )

            );

        }

        return response;

    }
    public List<TrendResponse> getWeeklyTrend() {

        User user = getLoggedInUser();

        List<Activity> activities = activityRepository.findByUser(user);

        Map<DayOfWeek, Double> map = new LinkedHashMap<>();

        map.put(DayOfWeek.MONDAY, 0.0);
        map.put(DayOfWeek.TUESDAY, 0.0);
        map.put(DayOfWeek.WEDNESDAY, 0.0);
        map.put(DayOfWeek.THURSDAY, 0.0);
        map.put(DayOfWeek.FRIDAY, 0.0);
        map.put(DayOfWeek.SATURDAY, 0.0);
        map.put(DayOfWeek.SUNDAY, 0.0);

        for(Activity activity : activities){

            DayOfWeek day = activity.getActivityDate().getDayOfWeek();

            map.put(day,
                    map.get(day) + activity.getEmission());

        }

        return map.entrySet()
                .stream()
                .map(e -> new TrendResponse(
                        e.getKey().toString().substring(0,3),
                        e.getValue()))
                .toList();

    }
}