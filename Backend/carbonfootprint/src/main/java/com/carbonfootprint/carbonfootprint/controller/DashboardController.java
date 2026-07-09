package com.carbonfootprint.carbonfootprint.controller;

import com.carbonfootprint.carbonfootprint.dto.ActivityResponse;
import com.carbonfootprint.carbonfootprint.dto.DashboardResponse;
import com.carbonfootprint.carbonfootprint.dto.DashboardTrendResponse;
import com.carbonfootprint.carbonfootprint.dto.TrendResponse;
import com.carbonfootprint.carbonfootprint.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    public DashboardResponse getDashboard() {

        return dashboardService.getDashboard();

    }
    @GetMapping("/recent")
    public List<ActivityResponse> getRecentActivities() {

        return dashboardService.getRecentActivities();

    }
    @GetMapping("/monthly-trend")
    public List<DashboardTrendResponse> getMonthlyTrend(){

        return dashboardService.getMonthlyTrend();

    }
    @GetMapping("/weekly-trend")
    public List<TrendResponse> weeklyTrend(){

        return dashboardService.getWeeklyTrend();

    }

}