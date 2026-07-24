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
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.DayOfWeek;
import java.util.*;

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

        double totalEmission = activities.stream()
                .mapToDouble(Activity::getEmission)
                .sum();

        LocalDate today = LocalDate.now();

        double todayEmission = activities.stream()
                .filter(activity ->
                        activity.getActivityDate().equals(today))
                .mapToDouble(Activity::getEmission)
                .sum();

        YearMonth currentMonth = YearMonth.now();

        double monthlyEmission = activities.stream()
                .filter(activity ->
                        YearMonth.from(activity.getActivityDate())
                                .equals(currentMonth))
                .mapToDouble(Activity::getEmission)
                .sum();

        int carbonScore;

        if (monthlyEmission <= 100) {

            carbonScore = 100;

        }
        else if (monthlyEmission <= 250) {

            carbonScore = 90;

        }
        else if (monthlyEmission <= 500) {

            carbonScore = 80;

        }
        else if (monthlyEmission <= 750) {

            carbonScore = 70;

        }
        else if (monthlyEmission <= 1000) {

            carbonScore = 60;

        }
        else if (monthlyEmission <= 1250) {

            carbonScore = 50;

        }
        else if (monthlyEmission <= 1500) {

            carbonScore = 40;

        }
        else {

            carbonScore = 30;

        }

        return new DashboardResponse(

                totalActivities,

                totalEmission,

                todayEmission,

                monthlyEmission,

                carbonScore

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

        List<Activity> activities = activityRepository.findByUser(user);

        Map<String, Double> monthMap = new LinkedHashMap<>();

        String[] months = {
                "Jan","Feb","Mar","Apr","May","Jun",
                "Jul","Aug","Sep","Oct","Nov","Dec"
        };

        for(String month : months){

            monthMap.put(month,0.0);

        }

        for(Activity activity : activities){

            String month = activity.getActivityDate()
                    .getMonth()
                    .getDisplayName(TextStyle.SHORT,Locale.ENGLISH);

            monthMap.put(
                    month,
                    monthMap.get(month)+activity.getEmission()
            );

        }

        List<DashboardTrendResponse> response =
                new ArrayList<>();

        for(Map.Entry<String,Double> entry:monthMap.entrySet()){

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
    public List<DashboardTrendResponse> getYearlyTrend(){

        User user = getLoggedInUser();

        List<Activity> activities =
                activityRepository.findByUser(user);

        Map<Integer,Double> yearMap = new TreeMap<>();

        for(Activity activity : activities){

            int year = activity.getActivityDate().getYear();

            yearMap.put(

                    year,

                    yearMap.getOrDefault(year,0.0)
                            + activity.getEmission()

            );

        }

        List<DashboardTrendResponse> response =
                new ArrayList<>();

        for(Map.Entry<Integer,Double> entry : yearMap.entrySet()){

            response.add(

                    new DashboardTrendResponse(

                            String.valueOf(entry.getKey()),

                            entry.getValue()

                    )

            );

        }

        return response;

    }

    public List<BreakdownResponse> getBreakdown(String period){

        User user = getLoggedInUser();

        List<Activity> activities = activityRepository.findByUser(user);

        LocalDate today = LocalDate.now();

        if(period.equalsIgnoreCase("daily")){

            activities = activities.stream()

                    .filter(a -> a.getActivityDate().equals(today))

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

                            a.getActivityDate().getMonth() == today.getMonth()

                                    &&

                                    a.getActivityDate().getYear() == today.getYear()

                    )

                    .toList();

        }

        Map<String,Double> map = new LinkedHashMap<>();

        map.put("Transport",0.0);
        map.put("Electricity",0.0);
        map.put("Food",0.0);
        map.put("Shopping",0.0);
        map.put("Others",0.0);

        for(Activity activity : activities){

            switch(activity.getActivityType()){

                case TRANSPORT:

                    map.put(
                            "Transport",
                            map.get("Transport") + activity.getEmission()
                    );
                    break;

                case ELECTRICITY:

                    map.put(
                            "Electricity",
                            map.get("Electricity") + activity.getEmission()
                    );
                    break;

                case FOOD:

                    map.put(
                            "Food",
                            map.get("Food") + activity.getEmission()
                    );
                    break;

                case SHOPPING:

                    map.put(
                            "Shopping",
                            map.get("Shopping") + activity.getEmission()
                    );
                    break;

                case OTHERS:

                    map.put(
                            "Others",
                            map.get("Others") + activity.getEmission()
                    );
                    break;

            }

        }

        List<BreakdownResponse> response = new ArrayList<>();

        for(Map.Entry<String,Double> entry : map.entrySet()){

            response.add(

                    new BreakdownResponse(

                            entry.getKey(),

                            entry.getValue()

                    )

            );

        }

        return response;

    }
}