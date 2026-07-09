package com.carbonfootprint.carbonfootprint.controller;

import com.carbonfootprint.carbonfootprint.dto.ActivityRequest;
import com.carbonfootprint.carbonfootprint.dto.ActivityResponse;
import com.carbonfootprint.carbonfootprint.service.ActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;


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
}
