package com.carbonfootprint.carbonfootprint.service;

import com.carbonfootprint.carbonfootprint.entity.Activity;
import com.carbonfootprint.carbonfootprint.entity.User;
import com.carbonfootprint.carbonfootprint.repository.ActivityRepository;
import com.carbonfootprint.carbonfootprint.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AIContextService {
    private final ActivityRepository activityRepository;
    private final UserRepository userRepository;

    private User getLoggedInUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        System.out.println("Authentication = " + authentication);
        System.out.println("Name = " + authentication.getName());
        System.out.println("Authenticated = " + authentication.isAuthenticated());

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }
    public String getUserCarbonContext() {

        User user = getLoggedInUser();

        List<Activity> activities = activityRepository.findByUser(user);

        double totalEmission = 0;

        double todayEmission = 0;

        double yesterdayEmission = 0;

        double transport = 0;

        double electricity = 0;

        double food = 0;

        double shopping = 0;

        double others = 0;

        LocalDate today = LocalDate.now();

        LocalDate yesterday = today.minusDays(1);

        for (Activity activity : activities) {

            totalEmission += activity.getEmission();

            if (activity.getActivityDate().equals(today)) {

                todayEmission += activity.getEmission();

            }

            if (activity.getActivityDate().equals(yesterday)) {

                yesterdayEmission += activity.getEmission();

            }

            switch (activity.getActivityType()) {

                case TRANSPORT ->
                        transport += activity.getEmission();

                case ELECTRICITY ->
                        electricity += activity.getEmission();

                case FOOD ->
                        food += activity.getEmission();

                case SHOPPING ->
                        shopping += activity.getEmission();

                case OTHERS ->
                        others += activity.getEmission();
            }

        }

        StringBuilder context = new StringBuilder();

        context.append("User Name: ")
                .append(user.getName())
                .append("\n");

        context.append("Today's Emission: ")
                .append(todayEmission)
                .append(" kg CO2\n");

        context.append("Yesterday's Emission: ")
                .append(yesterdayEmission)
                .append(" kg CO2\n");

        context.append("Total Emission: ")
                .append(totalEmission)
                .append(" kg CO2\n\n");

        context.append("Category Breakdown:\n");

        context.append("Transport: ")
                .append(transport)
                .append(" kg\n");

        context.append("Electricity: ")
                .append(electricity)
                .append(" kg\n");

        context.append("Food: ")
                .append(food)
                .append(" kg\n");

        context.append("Shopping: ")
                .append(shopping)
                .append(" kg\n");

        context.append("Others: ")
                .append(others)
                .append(" kg\n");

        return context.toString();

    }
}