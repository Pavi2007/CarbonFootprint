package com.carbonfootprint.carbonfootprint.dto.gemini;

public class Part {

    private String text;

    public Part() {
    }
    @Override
    public String toString() {
        return text;
    }
    public Part(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

}