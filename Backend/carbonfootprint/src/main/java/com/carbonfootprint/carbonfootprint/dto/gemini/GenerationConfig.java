package com.carbonfootprint.carbonfootprint.dto.gemini;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GenerationConfig {

    private Integer maxOutputTokens;

    private Double temperature;

    private ThinkingConfig thinkingConfig;

}