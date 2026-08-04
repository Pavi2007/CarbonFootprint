package com.carbonfootprint.carbonfootprint.controller;

import com.carbonfootprint.carbonfootprint.dto.ChatRequest;
import com.carbonfootprint.carbonfootprint.dto.ChatResponse;
import com.carbonfootprint.carbonfootprint.service.GeminiService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:5173")
public class ChatController {

    private final GeminiService geminiService;

    public ChatController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping
    public ChatResponse chat(@RequestBody ChatRequest request) {

        String reply =
                geminiService.askGemini(request.getMessage());

        return new ChatResponse(reply);
    }

}