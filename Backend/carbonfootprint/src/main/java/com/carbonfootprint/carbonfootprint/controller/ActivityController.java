package com.carbonfootprint.carbonfootprint.controller;

import com.carbonfootprint.carbonfootprint.dto.ActivityRequest;
import com.carbonfootprint.carbonfootprint.dto.ActivityResponse;
import com.carbonfootprint.carbonfootprint.enums.ActivityType;
import com.carbonfootprint.carbonfootprint.service.ActivityService;
import com.carbonfootprint.carbonfootprint.enums.Category;import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.time.LocalDate;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/activity")
@RequiredArgsConstructor
public class ActivityController {

    private final ActivityService activityService;

    @PostMapping("/add")
    public ActivityResponse addActivity(@RequestBody ActivityRequest request) {

        return activityService.addActivity(request);

    }
    @GetMapping("/my-activities")
    public List<ActivityResponse> getMyActivities() {

        return activityService.getMyActivities();

    }
    @GetMapping("/{id}")
    public ActivityResponse getActivityById(
            @PathVariable Long id) {

        return activityService.getActivityById(id);

    }
    @PutMapping("/update/{id}")
    public ActivityResponse updateActivity(
            @PathVariable Long id,
            @RequestBody ActivityRequest request) {

        return activityService.updateActivity(id, request);

    }
    @DeleteMapping("/delete/{id}")
    public String deleteActivity(@PathVariable Long id) {

        return activityService.deleteActivity(id);

    }
    @GetMapping("/history")
    public List<ActivityResponse> getHistory(

            @RequestParam(required = false) String search,

            @RequestParam(required = false) ActivityType activityType,

            @RequestParam(required = false) Category category,

            @RequestParam(required = false) LocalDate startDate,

            @RequestParam(required = false) LocalDate endDate
    ){

        System.out.println("Search = " + search);
        System.out.println("Activity = " + activityType);
        System.out.println("Category = " + category);
        System.out.println("Start = " + startDate);
        System.out.println("End = " + endDate);
        return activityService.getHistory(
                search,
                activityType,
                category,
                startDate,
                endDate
        );

    }
}
