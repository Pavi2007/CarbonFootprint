package com.carbonfootprint.carbonfootprint.controller;

import com.carbonfootprint.carbonfootprint.dto.admin.*;
import com.carbonfootprint.carbonfootprint.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

        private final AdminService adminService;

        @GetMapping("/dashboard")
        public AdminDashboardResponse getDashboard() {

                return adminService.getDashboard();

        }

        @GetMapping("/trend/month")
        public List<TrendResponse> getMonthlyTrend() {

                return adminService.getMonthlyTrend();

        }

        @GetMapping("/trend/week")
        public List<TrendResponse> getWeeklyTrend() {

                return adminService.getWeeklyTrend();

        }

        @GetMapping("/trend/year")
        public List<TrendResponse> getYearlyTrend() {

                return adminService.getYearlyTrend();

        }

        @GetMapping("/breakdown")
        public List<CategoryBreakdownResponse> getBreakdown() {

                return adminService.getBreakdown();

        }

        @GetMapping("/users")
        public List<UserResponse> getAllUsers() {

                return adminService.getAllUsers();

        }

        @DeleteMapping("/users/{id}")
        public ResponseEntity<String> deleteUser(@PathVariable Long id) {

                adminService.deleteUser(id);

                return ResponseEntity.ok("User deleted successfully");

        }

        @GetMapping("/activities")
        public ActivitySearchResponse getAllActivities() {

                return adminService.searchActivities(null, null, null,null);

        }
        @GetMapping("/activities/search")
        public ActivitySearchResponse searchActivities(

                @RequestParam(required = false)
                String category,

                @RequestParam(required = false)
                String activityType,

                @RequestParam(required = false)
                @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                LocalDate startDate,

                @RequestParam(required = false)
                @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                LocalDate endDate

        ){

                return adminService.searchActivities(

                        category,

                        activityType,

                        startDate,

                        endDate

                );

        }

}