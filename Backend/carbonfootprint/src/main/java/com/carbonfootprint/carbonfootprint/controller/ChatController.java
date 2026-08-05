package com.carbonfootprint.carbonfootprint.controller;

import com.carbonfootprint.carbonfootprint.service.GeminiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    private final GeminiService geminiService;

    @PostMapping
    public String chat(@RequestBody String message){

        return geminiService.askGemini(message);

    }

}