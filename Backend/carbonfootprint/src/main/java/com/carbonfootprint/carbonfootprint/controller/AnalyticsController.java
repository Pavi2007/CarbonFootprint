package com.carbonfootprint.carbonfootprint.controller;

import com.carbonfootprint.carbonfootprint.dto.*;
import com.carbonfootprint.carbonfootprint.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/summary")
    public AnalyticsSummaryResponse getSummary(

            @RequestParam(defaultValue = "monthly")
            String period

    ) {

        return analyticsService.getSummary(period);

    }

    @GetMapping("/monthly-comparison")
    public MonthlyComparisonResponse getMonthlyComparison(

            @RequestParam(defaultValue = "monthly")
            String period

    ) {

        return analyticsService.getMonthlyComparison(period);

    }

    @GetMapping("/top-contributors")
    public List<TopContributorResponse> getTopContributors(

            @RequestParam(defaultValue = "monthly")
            String period

    ) {

        return analyticsService.getTopContributors(period);

    }


    @GetMapping("/insights")
    public List<InsightResponse> getInsights(
            @RequestParam(defaultValue = "monthly") String period
    ){
        return analyticsService.getInsights(period);
    }

    @GetMapping("/trend-summary")
    public TrendSummaryResponse getTrendSummary(
            @RequestParam(defaultValue = "monthly") String period
    ){
        return analyticsService.getTrendSummary(period);
    }

    @GetMapping("/timeline")
    public List<TimelineResponse> getTimeline(
            @RequestParam(defaultValue = "monthly") String period
    ){
        return analyticsService.getTimeline(period);
    }
}