package com.carbonfootprint.carbonfootprint.dto.gemini;

public class ThinkingConfig {

    private int thinkingBudget;

    public ThinkingConfig() {
    }

    public ThinkingConfig(int thinkingBudget) {
        this.thinkingBudget = thinkingBudget;
    }

    public int getThinkingBudget() {
        return thinkingBudget;
    }

    public void setThinkingBudget(int thinkingBudget) {
        this.thinkingBudget = thinkingBudget;
    }
}