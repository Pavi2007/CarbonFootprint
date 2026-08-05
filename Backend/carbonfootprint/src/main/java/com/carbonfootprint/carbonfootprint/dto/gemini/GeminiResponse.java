package com.carbonfootprint.carbonfootprint.dto.gemini;

import lombok.Data;

import java.util.List;

@Data
public class GeminiResponse {

    private List<Candidate> candidates;

}