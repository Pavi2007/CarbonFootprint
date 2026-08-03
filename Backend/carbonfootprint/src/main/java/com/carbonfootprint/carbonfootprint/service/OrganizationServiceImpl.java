package com.carbonfootprint.carbonfootprint.service;

import com.carbonfootprint.carbonfootprint.dto.admin.OrganizationResponse;
import com.carbonfootprint.carbonfootprint.entity.Activity;
import com.carbonfootprint.carbonfootprint.entity.User;
import com.carbonfootprint.carbonfootprint.repository.ActivityRepository;
import com.carbonfootprint.carbonfootprint.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OrganizationServiceImpl implements OrganizationService {

    private final UserRepository userRepository;
    private final ActivityRepository activityRepository;

    @Override
    public OrganizationResponse getOrganizationDetails() {

        List<User> users = userRepository.findAll();
        List<Activity> activities = activityRepository.findAll();

        long totalUsers = users.size();

        long totalActivities = activities.size();

        double totalEmission = activities.stream()
                .mapToDouble(Activity::getEmission)
                .sum();

        // Top Performer (Lowest Total Emission)

        Map<Long, Double> userEmission = new HashMap<>();

        for (Activity activity : activities) {

            Long userId = activity.getUser().getId();

            userEmission.put(
                    userId,
                    userEmission.getOrDefault(userId, 0.0)
                            + activity.getEmission()
            );
        }

        String topPerformer = "N/A";
        double lowestEmission = Double.MAX_VALUE;

        for (User user : users) {

            if (user.getRole().name().equals("ADMIN")) {
                continue;
            }

            double emission =
                    userEmission.getOrDefault(user.getId(), 0.0);

            if (emission < lowestEmission) {

                lowestEmission = emission;

                topPerformer = user.getName();

            }

        }

        // Highest Emission Category

        Map<String, Double> categoryMap = new HashMap<>();

        for (Activity activity : activities) {

            categoryMap.put(
                    activity.getCategory(),
                    categoryMap.getOrDefault(
                            activity.getCategory(),
                            0.0
                    ) + activity.getEmission()
            );

        }

        String highestCategory = "N/A";
        double highestEmission = 0;

        for (Map.Entry<String, Double> entry : categoryMap.entrySet()) {

            if (entry.getValue() > highestEmission) {

                highestEmission = entry.getValue();

                highestCategory = entry.getKey();

            }

        }

        return new OrganizationResponse(

                "CarbonTrack Sustainability Platform",

                "Erode, Tamil Nadu",

                totalUsers,

                totalActivities,

                Math.round(totalEmission * 100.0) / 100.0,

                0.0,

                topPerformer,

                highestCategory

        );

    }

}