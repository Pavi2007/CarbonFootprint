package com.carbonfootprint.carbonfootprint.service;

import com.carbonfootprint.carbonfootprint.dto.gemini.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class GeminiServiceImpl implements GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;
    private final AIContextService aiContextService;

    public GeminiServiceImpl(
            RestTemplate restTemplate,
            AIContextService aiContextService
    ) {
        this.restTemplate = restTemplate;
        this.aiContextService = aiContextService;
    }

    @Override
    public String askGemini(String message) {

        String url =
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";

        // Prompt
        String prompt = """
                You are CarbonTrack AI.
                
                Answer the user's question in simple English.
                
                Question:
                """ + message;

        // Request
        Part part = new Part(prompt);

        Content content = new Content(List.of(part));

        GenerationConfig config =
                new GenerationConfig(
                        1204,
                        0.3,
                        new ThinkingConfig(0)
                );

        GeminiRequest request =
                new GeminiRequest(
                        List.of(content),
                        config
                );

        // Headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-goog-api-key", apiKey);

        HttpEntity<GeminiRequest> entity =
                new HttpEntity<>(request, headers);

        // API Call
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

                return "⚠️ No response from CarbonTrack AI.";
            }

            return body.getCandidates()
                    .get(0)
                    .getContent()
                    .getParts()
                    .stream()
                    .map(ResponsePart::getText)
                    .reduce("", String::concat);

        } catch (Exception e) {

            e.printStackTrace();

            return """
                    ⚠️ CarbonTrack AI is temporarily unavailable.
                    
                    Possible reasons:
                    • Gemini API quota exceeded
                    • Network issue
                    • Gemini server busy
                    
                    Please try again later.
                    """;
        }
    }
}