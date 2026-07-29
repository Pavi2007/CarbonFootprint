package com.carbonfootprint.carbonfootprint.service;

import com.carbonfootprint.carbonfootprint.dto.LeaderboardResponse;
import com.carbonfootprint.carbonfootprint.entity.User;
import com.carbonfootprint.carbonfootprint.enums.GoalStatus;
import com.carbonfootprint.carbonfootprint.enums.Role;
import com.carbonfootprint.carbonfootprint.repository.ActivityRepository;
import com.carbonfootprint.carbonfootprint.repository.GoalRepository;
import com.carbonfootprint.carbonfootprint.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LeaderboardServiceImpl implements LeaderboardService {

    private final UserRepository userRepository;
    private final ActivityRepository activityRepository;
    private final GoalRepository goalRepository;

    @Override
    public List<LeaderboardResponse> getLeaderboard() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String loggedInEmail = authentication.getName();

        List<User> users = userRepository.findByRoleNot(Role.ADMIN);

        List<LeaderboardResponse> leaderboard = new ArrayList<>();

        for (User user : users) {

            Double totalEmission =
                    activityRepository.getTotalEmission(user);

            if (totalEmission == null) {
                totalEmission = 0.0;
            }

            Long activityCount =
                    activityRepository.countByUser(user);

            Long completedGoals =
                    goalRepository.countByUserAndStatus(
                            user,
                            GoalStatus.COMPLETED
                    );

            Integer loginStreak =
                    user.getLoginStreak() == null ? 0 : user.getLoginStreak();

            if (totalEmission > 1000) {
                completedGoals = Math.max(0, completedGoals - 2);
            }

            LeaderboardResponse response =
                    new LeaderboardResponse();

            response.setUsername(user.getName());
            response.setTotalEmission(totalEmission);
            response.setActivityCount(activityCount);
            response.setCompletedGoals(completedGoals);
            response.setLoginStreak(loginStreak);
            response.setScore(0);
            response.setCurrentUser(
                    user.getEmail().equals(loggedInEmail)
            );

            leaderboard.add(response);
        }
        leaderboard.sort(

                Comparator

                        // 1. More completed goals first
                        .comparing(
                                LeaderboardResponse::getCompletedGoals,
                                Comparator.reverseOrder()
                        )

                        // 2. Higher login streak
                        .thenComparing(
                                LeaderboardResponse::getLoginStreak,
                                Comparator.reverseOrder()
                        )

                        // 3. More activities
                        .thenComparing(
                                LeaderboardResponse::getActivityCount,
                                Comparator.reverseOrder()
                        )

                        // 4. Lower emissions
                        .thenComparing(
                                LeaderboardResponse::getTotalEmission
                        )

                        // 5. Username (stable ordering)
                        .thenComparing(
                                LeaderboardResponse::getUsername
                        )

        );
        for (int i = 0; i < leaderboard.size(); i++) {
            leaderboard.get(i).setRank(i + 1);
        }

        return leaderboard;
    }
}