package com.carbonfootprint.carbonfootprint.service;

import com.carbonfootprint.carbonfootprint.dto.*;
import com.carbonfootprint.carbonfootprint.entity.Activity;
import com.carbonfootprint.carbonfootprint.entity.User;
import com.carbonfootprint.carbonfootprint.repository.ActivityRepository;
import com.carbonfootprint.carbonfootprint.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final ActivityRepository activityRepository;
    private final DashboardService dashboardService;
    private final UserRepository userRepository;

    private User getLoggedInUser(){

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        return userRepository.findByEmail(authentication.getName())
                .orElseThrow();
    }

    public AnalyticsSummaryResponse getSummary(String period){

        User user = getLoggedInUser();

        List<Activity> activities =
                activityRepository.findByUser(user);

        LocalDate today = LocalDate.now();

        if(period.equalsIgnoreCase("daily")){

            activities = activities.stream()

                    .filter(a ->

                            a.getActivityDate().equals(today)

                    )

                    .toList();

        }

        else if(period.equalsIgnoreCase("weekly")){

            LocalDate start = today.minusDays(6);

            activities = activities.stream()

                    .filter(a ->

                            !a.getActivityDate().isBefore(start)

                                    &&

                                    !a.getActivityDate().isAfter(today)

                    )

                    .toList();

        }

        else{

            activities = activities.stream()

                    .filter(a ->

                            a.getActivityDate().getMonth()==today.getMonth()

                                    &&

                                    a.getActivityDate().getYear()==today.getYear()

                    )

                    .toList();

        }

        Map<String,Double> map = new LinkedHashMap<>();

        map.put("Transport",0.0);

        map.put("Electricity",0.0);

        map.put("Food",0.0);

        map.put("Shopping",0.0);

        for(Activity activity : activities){

            switch(activity.getActivityType()){

                case TRANSPORT:

                    map.put(
                            "Transport",
                            map.get("Transport")
                                    + activity.getEmission()
                    );

                    break;

                case ELECTRICITY:

                    map.put(
                            "Electricity",
                            map.get("Electricity")
                                    + activity.getEmission()
                    );

                    break;

                case FOOD:

                    map.put(
                            "Food",
                            map.get("Food")
                                    + activity.getEmission()
                    );

                    break;

                case SHOPPING:

                    map.put(
                            "Shopping",
                            map.get("Shopping")
                                    + activity.getEmission()
                    );

            }

        }

        String highestCategory = "";

        double highest = Double.MIN_VALUE;

        String lowestCategory = "";

        double lowest = Double.MAX_VALUE;

        for(Map.Entry<String,Double> entry : map.entrySet()){

            if(entry.getValue() > highest){

                highest = entry.getValue();

                highestCategory = entry.getKey();

            }

            if(entry.getValue() < lowest){

                lowest = entry.getValue();

                lowestCategory = entry.getKey();

            }

        }

        double totalEmission =
                activities.stream()
                        .mapToDouble(Activity::getEmission)
                        .sum();

        double average =
                activities.isEmpty()
                        ? 0
                        : totalEmission / activities.size();

        int carbonScore = Math.max(
                0,
                100 - (int)(totalEmission / 75)
        );

        return new AnalyticsSummaryResponse(

                highestCategory,

                highest == Double.MIN_VALUE ? 0.0 : highest,

                lowestCategory,

                lowest == Double.MAX_VALUE ? 0.0 : lowest,

                average,

                carbonScore,
                totalEmission

        );
    }
    public MonthlyComparisonResponse getMonthlyComparison(String period) {

        User user = getLoggedInUser();

        List<Activity> activities =
                activityRepository.findByUser(user);
        LocalDate today = LocalDate.now();

        if (period.equalsIgnoreCase("daily")) {

            activities = activities.stream()
                    .filter(a -> a.getActivityDate().equals(today))
                    .toList();

        } else if (period.equalsIgnoreCase("weekly")) {

            LocalDate start = today.minusDays(6);

            activities = activities.stream()
                    .filter(a ->
                            !a.getActivityDate().isBefore(start)
                                    && !a.getActivityDate().isAfter(today))
                    .toList();

        } else {

            activities = activities.stream()
                    .filter(a ->
                            a.getActivityDate().getMonth() == today.getMonth()
                                    && a.getActivityDate().getYear() == today.getYear())
                    .toList();

        }

        YearMonth current = YearMonth.now();

        YearMonth previous = current.minusMonths(1);

        double currentEmission = activities.stream()

                .filter(a ->
                        YearMonth.from(a.getActivityDate())
                                .equals(current))

                .mapToDouble(Activity::getEmission)

                .sum();

        double previousEmission = activities.stream()

                .filter(a ->
                        YearMonth.from(a.getActivityDate())
                                .equals(previous))

                .mapToDouble(Activity::getEmission)

                .sum();

        double difference = currentEmission - previousEmission;

        double percentage;

        if(previousEmission == 0){

            percentage = 100;

        }

        else{

            percentage =
                    (difference / previousEmission) * 100;

        }

        return new MonthlyComparisonResponse(

                currentEmission,

                previousEmission,

                difference,

                percentage

        );

    }
    public List<TopContributorResponse> getTopContributors(String period){

        List<BreakdownResponse> breakdown = dashboardService.getBreakdown(period);

        return breakdown.stream()

                .sorted((a,b) ->
                        Double.compare(
                                b.getEmission(),
                                a.getEmission()))

                .map(item ->

                        new TopContributorResponse(

                                item.getCategory(),

                                item.getEmission()

                        ))

                .toList();

    }
    public List<InsightResponse> getInsights(String period) {

        User user = getLoggedInUser();

        List<Activity> activities = activityRepository.findByUser(user);
        LocalDate today = LocalDate.now();

        if (period.equalsIgnoreCase("daily")) {

            activities = activities.stream()
                    .filter(a -> a.getActivityDate().equals(today))
                    .toList();

        } else if (period.equalsIgnoreCase("weekly")) {

            LocalDate start = today.minusDays(6);

            activities = activities.stream()
                    .filter(a ->
                            !a.getActivityDate().isBefore(start)
                                    && !a.getActivityDate().isAfter(today))
                    .toList();

        } else {

            activities = activities.stream()
                    .filter(a ->
                            a.getActivityDate().getMonth() == today.getMonth()
                                    && a.getActivityDate().getYear() == today.getYear())
                    .toList();

        }

        List<InsightResponse> insights = new ArrayList<>();

        if (activities.isEmpty()) {

            insights.add(new InsightResponse(
                    "No Data",
                    "Start logging activities to receive personalized insights."
            ));

            return insights;
        }

        double total = activities.stream()
                .mapToDouble(Activity::getEmission)
                .sum();

        Map<String, Double> categoryMap = new LinkedHashMap<>();

        categoryMap.put("Transport", 0.0);
        categoryMap.put("Electricity", 0.0);
        categoryMap.put("Food", 0.0);
        categoryMap.put("Shopping", 0.0);

        for (Activity activity : activities) {

            switch (activity.getActivityType()) {

                case TRANSPORT:
                    categoryMap.put("Transport",
                            categoryMap.get("Transport") + activity.getEmission());
                    break;

                case ELECTRICITY:
                    categoryMap.put("Electricity",
                            categoryMap.get("Electricity") + activity.getEmission());
                    break;

                case FOOD:
                    categoryMap.put("Food",
                            categoryMap.get("Food") + activity.getEmission());
                    break;

                case SHOPPING:
                    categoryMap.put("Shopping",
                            categoryMap.get("Shopping") + activity.getEmission());
                    break;
            }
        }

        String highest = "";
        double highestValue = 0;

        for (Map.Entry<String, Double> entry : categoryMap.entrySet()) {

            if (entry.getValue() > highestValue) {

                highestValue = entry.getValue();
                highest = entry.getKey();

            }

        }

        double percentage = (highestValue / total) * 100;

        insights.add(new InsightResponse(
                "Highest Contributor",
                highest + " contributes " +
                        String.format("%.1f", percentage) +
                        "% of your emissions."
        ));

        insights.add(new InsightResponse(
                "Recommendation",
                "Try reducing " + highest.toLowerCase()
                        + " activities this week."
        ));

        insights.add(new InsightResponse(
                "Great Job",
                "Keep logging activities regularly for better tracking."
        ));

        return insights;
    }
    public TrendSummaryResponse getTrendSummary(String period){

        User user = getLoggedInUser();

        List<Activity> activities = activityRepository.findByUser(user);
        LocalDate today = LocalDate.now();

        if (period.equalsIgnoreCase("daily")) {

            activities = activities.stream()
                    .filter(a -> a.getActivityDate().equals(today))
                    .toList();

        } else if (period.equalsIgnoreCase("weekly")) {

            LocalDate start = today.minusDays(6);

            activities = activities.stream()
                    .filter(a ->
                            !a.getActivityDate().isBefore(start)
                                    && !a.getActivityDate().isAfter(today))
                    .toList();

        } else {

            activities = activities.stream()
                    .filter(a ->
                            a.getActivityDate().getMonth() == today.getMonth()
                                    && a.getActivityDate().getYear() == today.getYear())
                    .toList();

        }

        Map<DayOfWeek, Double> week = new LinkedHashMap<>();

        for(DayOfWeek d : DayOfWeek.values()){

            week.put(d,0.0);

        }

        double monthTotal = 0;

        LocalDate now = LocalDate.now();

        for(Activity activity : activities){

            DayOfWeek day = activity.getActivityDate().getDayOfWeek();

            week.put(day,
                    week.get(day)+activity.getEmission());

            if(activity.getActivityDate().getMonth()==now.getMonth()
                    && activity.getActivityDate().getYear()==now.getYear()){

                monthTotal += activity.getEmission();

            }

        }

        String best = week.entrySet().stream()
                .min(Map.Entry.comparingByValue())
                .get().getKey().toString();

        String worst = week.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .get().getKey().toString();

        double avg = activities.isEmpty()
                ? 0
                : activities.stream()
                .mapToDouble(Activity::getEmission)
                .average()
                .orElse(0);

        return new TrendSummaryResponse(
                best,
                worst,
                avg,
                monthTotal
        );

    }

    public List<TimelineResponse> getTimeline(String period){

        User user = getLoggedInUser();
        List<Activity> activities = activityRepository.findByUser(user);
        LocalDate today = LocalDate.now();

        if (period.equalsIgnoreCase("daily")) {

            activities = activities.stream()
                    .filter(a -> a.getActivityDate().equals(today))
                    .toList();

        } else if (period.equalsIgnoreCase("weekly")) {

            LocalDate start = today.minusDays(6);

            activities = activities.stream()
                    .filter(a ->
                            !a.getActivityDate().isBefore(start)
                                    && !a.getActivityDate().isAfter(today))
                    .toList();

        } else {

            activities = activities.stream()
                    .filter(a ->
                            a.getActivityDate().getMonth() == today.getMonth()
                                    && a.getActivityDate().getYear() == today.getYear())
                    .toList();

        }


        return activities.stream()

                .limit(6)

                .map(a -> new TimelineResponse(

                        a.getActivityDate().toString(),

                        a.getActivityType().toString(),

                        a.getEmission()

                ))

                .toList();

    }
}