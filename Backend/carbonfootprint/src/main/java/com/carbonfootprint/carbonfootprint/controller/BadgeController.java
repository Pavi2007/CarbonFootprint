package com.carbonfootprint.carbonfootprint.controller;

import com.carbonfootprint.carbonfootprint.dto.BadgeCollectionResponse;
import com.carbonfootprint.carbonfootprint.dto.BadgeProgressResponse;
import com.carbonfootprint.carbonfootprint.dto.HeatmapResponse;
import com.carbonfootprint.carbonfootprint.service.BadgeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/badges")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BadgeController {

    private final BadgeService badgeService;

    @GetMapping("/progress")
    public List<BadgeProgressResponse> getBadgeProgress() {

        return badgeService.getBadgeProgress();

    }

    @GetMapping("/collection")
    public List<BadgeCollectionResponse> getBadgeCollection() {

        return badgeService.getBadgeCollection();

    }

    @GetMapping("/heatmap")
    public List<HeatmapResponse> getHeatmap() {

        return badgeService.getHeatmap();

    }

}