package com.carbonfootprint.carbonfootprint.dto.gemini;

public class GenerationConfig {

    private int maxOutputTokens;

    private double temperature;

    private ThinkingConfig thinkingConfig;

    public GenerationConfig() {
    }

    public GenerationConfig(int maxOutputTokens,
                            double temperature,
                            ThinkingConfig thinkingConfig) {

        this.maxOutputTokens = maxOutputTokens;
        this.temperature = temperature;
        this.thinkingConfig = thinkingConfig;
    }

    // getters & setters


    public int getMaxOutputTokens() {
        return maxOutputTokens;
    }

    public void setMaxOutputTokens(int maxOutputTokens) {
        this.maxOutputTokens = maxOutputTokens;
    }

    public double getTemperature() {
        return temperature;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }
}