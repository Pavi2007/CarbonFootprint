package com.carbonfootprint.carbonfootprint.service;

import com.carbonfootprint.carbonfootprint.dto.DashboardResponse;
import com.carbonfootprint.carbonfootprint.dto.GoalProgressResponse;
import com.carbonfootprint.carbonfootprint.dto.GoalResponse;
import com.carbonfootprint.carbonfootprint.dto.NotificationResponse;
import com.carbonfootprint.carbonfootprint.dto.ActivityResponse;
import com.carbonfootprint.carbonfootprint.entity.User;
import com.carbonfootprint.carbonfootprint.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AIContextServiceImpl implements AIContextService {

    private final DashboardService dashboardService;

    private final GoalService goalService;

    private final ActivityService activityService;

    private final NotificationService notificationService;

    private final UserRepository userRepository;

    private User getLoggedInUser(){

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        return userRepository.findByEmail(authentication.getName())
                .orElseThrow();

    }
    @Override
    public String getContext() {

        System.out.println("Step 1");

        User user = getLoggedInUser();

        System.out.println("Step 2");

        DashboardResponse dashboard =
                dashboardService.getDashboard();

        System.out.println("Step 3");

        List<GoalResponse> goals =
                goalService.getAllGoals();

        System.out.println("Step 4");

        List<ActivityResponse> activities =
                activityService.getMyActivities();

        System.out.println("Step 5");

        List<NotificationResponse> notifications =
                notificationService.getNotifications();

        System.out.println("Step 6");

        StringBuilder context = new StringBuilder();

        return context.toString();
    }

}