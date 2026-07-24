package com.carbonfootprint.carbonfootprint.service;

import com.carbonfootprint.carbonfootprint.dto.GoalProgressResponse;
import com.carbonfootprint.carbonfootprint.dto.GoalRequest;
import com.carbonfootprint.carbonfootprint.dto.GoalResponse;
import com.carbonfootprint.carbonfootprint.dto.GoalSummaryResponse;

import java.util.List;

public interface GoalService {

    GoalResponse createGoal(GoalRequest request);

    List<GoalResponse> getActiveGoals();

    List<GoalResponse> getGoalHistory();

    GoalResponse getGoalById(Long id);

    GoalResponse updateGoal(Long id, GoalRequest request);

    void deleteGoal(Long id);

    GoalSummaryResponse getGoalSummary();

    GoalProgressResponse getGoalProgress(Long goalId);

    List<GoalResponse> getAllGoals();



}