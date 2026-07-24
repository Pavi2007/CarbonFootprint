package com.carbonfootprint.carbonfootprint.controller;

import com.carbonfootprint.carbonfootprint.dto.GoalProgressResponse;
import com.carbonfootprint.carbonfootprint.dto.GoalRequest;
import com.carbonfootprint.carbonfootprint.dto.GoalResponse;
import com.carbonfootprint.carbonfootprint.dto.GoalSummaryResponse;
import com.carbonfootprint.carbonfootprint.service.GoalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
@RequiredArgsConstructor
public class GoalController {

    private final GoalService goalService;

    @PostMapping
    public ResponseEntity<GoalResponse> createGoal(
            @RequestBody GoalRequest request) {

        return ResponseEntity.ok(goalService.createGoal(request));
    }
    @GetMapping("/active")
    public ResponseEntity<List<GoalResponse>> getActiveGoals(){

        return ResponseEntity.ok(
                goalService.getActiveGoals());

    }
    @GetMapping("/history")
    public ResponseEntity<List<GoalResponse>> getGoalHistory(){

        return ResponseEntity.ok(
                goalService.getGoalHistory());

    }
    @GetMapping("/{id}")
    public ResponseEntity<GoalResponse> getGoalById(
            @PathVariable Long id){

        return ResponseEntity.ok(
                goalService.getGoalById(id));

    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteGoal(
            @PathVariable Long id){

        goalService.deleteGoal(id);

        return ResponseEntity.ok("Goal Deleted");

    }
    @GetMapping("/summary")
    public ResponseEntity<GoalSummaryResponse> getSummary(){

        return ResponseEntity.ok(
                goalService.getGoalSummary());

    }

    @PutMapping("/{id}")
    public ResponseEntity<GoalResponse> updateGoal(
            @PathVariable Long id,
            @RequestBody GoalRequest request) {

        return ResponseEntity.ok(goalService.updateGoal(id, request));
    }

    @GetMapping("/{id}/progress")
    public ResponseEntity<GoalProgressResponse> getGoalProgress(
            @PathVariable Long id) {

        return ResponseEntity.ok(goalService.getGoalProgress(id));
    }
    @GetMapping
    public ResponseEntity<List<GoalResponse>> getAllGoals() {

        return ResponseEntity.ok(goalService.getAllGoals());

    }
}