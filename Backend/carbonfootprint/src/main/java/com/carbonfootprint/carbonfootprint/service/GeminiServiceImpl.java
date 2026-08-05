package com.carbonfootprint.carbonfootprint.service;

import com.carbonfootprint.carbonfootprint.dto.GoalProgressResponse;
import com.carbonfootprint.carbonfootprint.dto.GoalResponse;
import com.carbonfootprint.carbonfootprint.dto.NotificationResponse;
import com.carbonfootprint.carbonfootprint.dto.gemini.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GeminiServiceImpl implements GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;
    private final DashboardService dashboardService;
    private final GoalService goalService;
    private final ActivityService activityService;
    private final NotificationService notificationService;
    private final RestTemplate restTemplate;
    private final AIContextService aiContextService;

    @Override
    public String askGemini(String message) {
        String question = message.toLowerCase();
        if (question.contains("carbon score")) {

            return "Your current Carbon Score is "
                    + dashboardService.getDashboard().getCarbonScore()
                    + ". Keep reducing your emissions to improve your score.";

        }
        if (question.contains("today")
                && question.contains("emission")) {

            return "Your carbon emission today is "
                    + dashboardService.getDashboard().getTodayEmission()
                    + " kg CO₂.";

        }
        if (question.contains("total emission")) {

            return "Your total carbon emission is "
                    + dashboardService.getDashboard().getTotalEmission()
                    + " kg CO₂.";

        }if (question.contains("active goal")) {

            List<GoalResponse> goals = goalService.getActiveGoals();

            if (goals.isEmpty()) {
                return "You don't have any active goals.";
            }

            StringBuilder sb = new StringBuilder();

            sb.append("You have ")
                    .append(goals.size())
                    .append(" active goal(s).\n\n");

            for (GoalResponse goal : goals) {

                sb.append("Goal : ")
                        .append(goal.getGoalName())
                        .append("\n");

                sb.append("Target : ")
                        .append(goal.getTargetEmission())
                        .append(" kg CO₂\n\n");
            }

            return sb.toString();

        }
        if (question.contains("goal progress")) {

            List<GoalResponse> goals = goalService.getActiveGoals();

            if (goals.isEmpty()) {
                return "You don't have any active goals.";
            }

            GoalProgressResponse progress =
                    goalService.getGoalProgress(goals.get(0).getId());

            return """
Your current goal progress:

Current Emission : %.2f kg

Remaining Emission : %.2f kg

Progress : %.2f%%

Days Left : %d
"""
                    .formatted(
                            progress.getCurrentEmission(),
                            progress.getRemainingEmission(),
                            progress.getProgressPercentage(),
                            progress.getDaysRemaining()
                    );

        }
        if (question.contains("notification")) {

            List<NotificationResponse> notifications =
                    notificationService.getNotifications();

            if (notifications.isEmpty()) {
                return "You don't have any notifications.";
            }

            StringBuilder sb = new StringBuilder();

            for (NotificationResponse n : notifications) {

                sb.append("• ")
                        .append(n.getTitle())
                        .append(" - ")
                        .append(n.getMessage())
                        .append("\n");

            }

            return sb.toString();

        }
        String context = aiContextService.getContext();

        String prompt = """
You are CarbonTrack AI, an intelligent sustainability assistant.

Your responsibilities are:

• Answer the user's questions using the application's live data whenever possible.
• Use the user's dashboard, goals, activities and notifications.
• Reply in simple English.
• Give detailed paragraph answers.
• If appropriate, provide suggestions to reduce carbon emissions.
• Never answer in one line unless the user specifically asks.
• Be friendly and professional.

=========================================================
USER DATA
=========================================================

%s

=========================================================
USER QUESTION
=========================================================

%s

=========================================================
""".formatted(context, message);

        String url =
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";

        Part part = new Part(prompt);

        Content content =
                new Content(List.of(part));

        GenerationConfig config =
                new GenerationConfig(
                        2048,
                        0.5,
                        new ThinkingConfig(0)
                );

        GeminiRequest request =
                new GeminiRequest(
                        List.of(content),
                        config
                );

        HttpHeaders headers =
                new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_JSON);

        headers.set("x-goog-api-key", apiKey);

        HttpEntity<GeminiRequest> entity =
                new HttpEntity<>(request, headers);

        try {

            ResponseEntity<GeminiResponse> response =
                    restTemplate.exchange(
                            url,
                            HttpMethod.POST,
                            entity,
                            GeminiResponse.class
                    );

            GeminiResponse body = response.getBody();

            if (body == null ||
                    body.getCandidates() == null ||
                    body.getCandidates().isEmpty()) {

                return "I couldn't generate a response. Please try again.";

            }

            return body.getCandidates()
                    .get(0)
                    .getContent()
                    .getParts()
                    .stream()
                    .map(ResponsePart::getText)
                    .reduce("", String::concat);

        }

        catch (HttpServerErrorException.ServiceUnavailable e){

            return """
⚠️ CarbonTrack AI is temporarily busy because the Gemini server is experiencing high demand.

Please wait a few moments and try again.
""";

        }

        catch(Exception e){

            e.printStackTrace();

            return """
⚠️ Unable to contact CarbonTrack AI.

Possible reasons:

• Network issue
• Invalid API Key
• Gemini service unavailable

Please try again later.
""";

        }

    }

}